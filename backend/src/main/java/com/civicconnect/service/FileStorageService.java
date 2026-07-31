package com.civicconnect.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    // Saves the file to disk and returns a relative URL (e.g. "/uploads/xyz.jpg")
    // to store on the entity, or null if no file was provided.
    String store(MultipartFile file);
}