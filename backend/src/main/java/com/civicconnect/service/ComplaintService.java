package com.civicconnect.service;

import com.civicconnect.dto.ComplaintRequest;
import com.civicconnect.model.Complaint;
import com.civicconnect.model.enums.Status;

import java.util.List;

public interface ComplaintService {
    List<Complaint> getAllComplaints();
    List<Complaint> getMyComplaints();
    Complaint getComplaintById(Long id);
    Complaint createComplaint(ComplaintRequest request);
    Complaint updateStatus(Long id, Status status);
    void deleteComplaint(Long id);
}