package com.civicconnect.service;

import com.civicconnect.model.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> getAllDepartments();
    Department createDepartment(String name, String officerName);
}
