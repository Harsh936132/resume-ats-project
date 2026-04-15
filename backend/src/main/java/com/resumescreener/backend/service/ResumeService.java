package com.resumescreener.backend.service;

import com.resumescreener.backend.model.Candidate;
import com.resumescreener.backend.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final CandidateRepository repository;

    public Candidate processResume(String name, String email, String phone,
                                   String jobDescription, MultipartFile file) throws Exception {

        PDDocument doc = PDDocument.load(file.getInputStream());
        String text = new PDFTextStripper().getText(doc);
        doc.close();

        List<String> skills = extractSkills(text);

        int skillScore = Math.min(skills.size() * 5, 30);

        int experienceScore = text.toLowerCase().contains("intern") ? 20 : 10;
        int projectScore = text.toLowerCase().contains("project") ? 20 : 10;
        int communicationScore = text.length() > 500 ? 20 : 10;

        int total = skillScore + experienceScore + projectScore + communicationScore;

        if (total > 100) total = 100;

        Candidate c = new Candidate();
        c.setName(name);
        c.setEmail(email);
        c.setPhone(phone);
        c.setJobDescription(jobDescription);
        c.setSkills(skills);
        c.setResumeText(text);

        c.setSkillScore(skillScore);
        c.setExperienceScore(experienceScore);
        c.setProjectScore(projectScore);
        c.setCommunicationScore(communicationScore);
        c.setScore(total);
        if (total >= 75) c.setStatus("Shortlisted");
        else if (total >= 50) c.setStatus("Review");
        else c.setStatus("Rejected");

        c.setQualification(extractQualification(text));
        c.setMarks(extractMarks(text));
        c.setExperience(extractExperience(text));

        return repository.save(c);
    }

    public List<Candidate> getAll() {
        return repository.findAll();
    }

    // ================== SKILLS EXTRACTION ==================
    private List<String> extractSkills(String text) {
        text = text.toLowerCase();

        List<String> skills = new ArrayList<>();

        String[] skillKeywords = {
                "java","javascript","python","react","spring","spring boot",
                "hibernate","mysql","sql","html","css","rest api",
                "git","github","maven","eclipse","vs code"
        };

        for (String skill : skillKeywords) {
            if (text.contains(skill)) {
                skills.add(skill);
            }
        }

        return skills;
    }

    // ================== QUALIFICATION ==================
    private String extractQualification(String text) {
        text = text.toLowerCase();

        if (text.contains("bachelor") || text.contains("b.e") || text.contains("b.tech"))
            return "Bachelor Degree";
        if (text.contains("diploma"))
            return "Diploma";
        if (text.contains("master"))
            return "Master Degree";

        return "Not Found";
    }

    // ================== MARKS ==================
    private String extractMarks(String text) {

        String[] words = text.split(" ");

        // % format (82.57%)
        for (String w : words) {
            if (w.matches("\\d{2}\\.\\d{2}%")) {
                return w;
            }
        }

        // CGPA format (8.2)
        for (String w : words) {
            if (w.matches("\\d\\.\\d")) {
                return "CGPA: " + w;
            }
        }

        return "Not Found";
    }

    // ================== EXPERIENCE ==================
    private String extractExperience(String text) {
        text = text.toLowerCase();

        if (text.contains("intern"))
            return "Internship";
        if (text.contains("year"))
            return "Experienced";

        return "Fresher";
    }
}