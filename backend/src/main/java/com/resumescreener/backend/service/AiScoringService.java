package com.resumescreener.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AiScoringService {

    public static class AiScoringResult {
        public List<String> matchedSkills;
        public List<String> unmatchedSkills;

        public int skillScore;
        public int experienceScore;
        public int projectScore;
        public int communicationScore;

        public int totalScore;
    }

    public AiScoringResult scoreResume(String resumeText, String jobDescription) {

        resumeText = resumeText.toLowerCase();
        jobDescription = jobDescription.toLowerCase();

        // remove empty words
        List<String> jdSkills = Arrays.stream(jobDescription.split("[,\\s]+"))
                .filter(s -> !s.isBlank())
                .distinct()
                .collect(Collectors.toList());

        List<String> matched = new ArrayList<>();
        List<String> unmatched = new ArrayList<>();

        for (String skill : jdSkills) {
            if (resumeText.contains(skill)) {
                matched.add(skill);
            } else {
                unmatched.add(skill);
            }
        }

        int skillScore = jdSkills.isEmpty() ? 0 :
                (int)(((double) matched.size() / jdSkills.size()) * 50);

        int experienceScore = resumeText.contains("experience") ? 20 : 5;
        int projectScore = resumeText.contains("project") ? 15 : 5;
        int communicationScore = resumeText.length() > 800 ? 15 : 8;

        int total = skillScore + experienceScore + projectScore + communicationScore;
        total = Math.min(total, 100);

        AiScoringResult result = new AiScoringResult();
        result.matchedSkills = matched;
        result.unmatchedSkills = unmatched;
        result.skillScore = skillScore;
        result.experienceScore = experienceScore;
        result.projectScore = projectScore;
        result.communicationScore = communicationScore;
        result.totalScore = total;

        return result;
    }
}