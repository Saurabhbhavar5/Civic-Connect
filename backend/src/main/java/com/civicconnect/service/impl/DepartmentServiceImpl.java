package com.civicconnect.service.impl;

import com.civicconnect.model.Department;
import com.civicconnect.repository.DepartmentRepository;
import com.civicconnect.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department createDepartment(String name, String officerName) {
        Department department = new Department();
        department.setName(name);
        department.setOfficerName(officerName);
        return departmentRepository.save(department);
    }
}
