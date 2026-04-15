package com.resumescreener.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @PostMapping
    public String chat(@RequestBody String message) {

        if (message.toLowerCase().contains("skills"))
            return "Add Java, React, SQL for better score";

        if (message.toLowerCase().contains("improve"))
            return "Use strong action verbs and quantified results";

        return "Try asking about resume improvement";
    }
}