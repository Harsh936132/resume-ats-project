package com.resumescreener.backend.controller;

import com.resumescreener.backend.model.Candidate;
import com.resumescreener.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ResumeController {

    private final ResumeService service;

    @PostMapping("/upload")
    public ResponseEntity<Candidate> upload(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String jobDescription,
            @RequestParam MultipartFile file) throws Exception {

        return ResponseEntity.ok(
                service.processResume(name, email, phone, jobDescription, file)
        );
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}