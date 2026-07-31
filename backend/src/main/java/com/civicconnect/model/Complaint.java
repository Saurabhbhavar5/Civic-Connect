package com.civicconnect.model;

import com.civicconnect.model.enums.Priority;
import com.civicconnect.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String issue;

    @Column(length = 1000)
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User citizen;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private LocalDateTime submittedOn = LocalDateTime.now();

    private LocalDateTime resolvedOn;

    // Relative URL to an uploaded photo of the issue, e.g. "/uploads/abc123.jpg".
    private String imageUrl;

    // GPS coordinates captured from the citizen's browser at submission time.
    private Double latitude;
    private Double longitude;
}