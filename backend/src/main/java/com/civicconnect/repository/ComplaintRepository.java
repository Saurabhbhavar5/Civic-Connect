package com.civicconnect.repository;

import com.civicconnect.model.Complaint;
import com.civicconnect.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByCitizenId(Long citizenId);
    List<Complaint> findByStatus(Status status);
}
