package com.resumescreener.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "candidates")
public class Candidate {

    @Id
    private String id;

    private String name;
    private String email;
    private String phone;
    private String jobDescription;

    private List<String> skills;
    private String resumeText;

    private int score;
    private int skillScore;
    private int experienceScore;
    private int projectScore;
    private int communicationScore;

    private String status;

    // 🔥 NEW FIELDS
    private String qualification;
    private String marks;
    private String experience;
}