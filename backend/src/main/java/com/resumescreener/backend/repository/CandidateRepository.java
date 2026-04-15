package com.resumescreener.backend.repository;

import com.resumescreener.backend.model.Candidate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CandidateRepository extends MongoRepository<Candidate, String> {
}