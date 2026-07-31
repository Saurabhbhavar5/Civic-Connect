package com.civicconnect.dto;

import com.civicconnect.model.enums.Priority;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ComplaintRequest {
    private String issue;
    private String description;
    private String department;
    private Priority priority;
    private Double latitude;
    private Double longitude;
    private MultipartFile image;
}