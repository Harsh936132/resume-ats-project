package com.resumescreener.backend.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.resumescreener.backend.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        if (mongoUri != null && mongoUri.contains("/")) {
            String db = mongoUri.substring(mongoUri.lastIndexOf('/') + 1);
            if (db.contains("?")) {
                db = db.substring(0, db.indexOf('?'));
            }
            return db;
        }
        return "resumedb";
    }

    @Override
    public MongoClient mongoClient() {
        System.out.println("=============== USING MONGODB URI ===============");
        System.out.println(mongoUri);
        System.out.println("=================================================");
        ConnectionString connectionString = new ConnectionString(mongoUri);
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .build();
        
        return MongoClients.create(mongoClientSettings);
    }
}
