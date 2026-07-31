package com.civicconnect.service.impl;

import com.civicconnect.dto.ComplaintRequest;
import com.civicconnect.exception.ResourceNotFoundException;
import com.civicconnect.model.Complaint;
import com.civicconnect.model.Department;
import com.civicconnect.model.User;
import com.civicconnect.model.enums.Status;
import com.civicconnect.repository.ComplaintRepository;
import com.civicconnect.repository.DepartmentRepository;
import com.civicconnect.repository.UserRepository;
import com.civicconnect.service.ComplaintService;
import com.civicconnect.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }
        String email = auth.getName();
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public List<Complaint> getMyComplaints() {
        User user = getCurrentUser();
        if (user == null) {
            return Collections.emptyList();
        }
        return complaintRepository.findByCitizenId(user.getId());
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with id: " + id));
    }

    @Override
    public Complaint createComplaint(ComplaintRequest request) {
        Complaint complaint = new Complaint();
        complaint.setIssue(request.getIssue());
        complaint.setDescription(request.getDescription());
        complaint.setPriority(request.getPriority() != null ? request.getPriority() : complaint.getPriority());
        complaint.setCitizen(getCurrentUser());
        complaint.setLatitude(request.getLatitude());
        complaint.setLongitude(request.getLongitude());
        complaint.setImageUrl(fileStorageService.store(request.getImage()));

        if (request.getDepartment() != null) {
            Department department = departmentRepository.findAll().stream()
                    .filter(d -> d.getName().equalsIgnoreCase(request.getDepartment()))
                    .findFirst()
                    .orElseGet(() -> departmentRepository.save(new Department(null, request.getDepartment(), null)));
            complaint.setDepartment(department);
        }

        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint updateStatus(Long id, Status status) {
        Complaint complaint = getComplaintById(id);
        complaint.setStatus(status);
        if (status == Status.RESOLVED) {
            complaint.setResolvedOn(LocalDateTime.now());
        }
        return complaintRepository.save(complaint);
    }

    @Override
    public void deleteComplaint(Long id) {
        Complaint complaint = getComplaintById(id);
        complaintRepository.delete(complaint);
    }
}