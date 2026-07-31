package com.civicconnect.service;

import com.civicconnect.dto.*;

public interface AuthService {
    AuthResponse registerUser(UserRegisterRequest request);
    AuthResponse loginUser(LoginRequest request);
    AuthResponse registerAdmin(AdminRegisterRequest request);
    AuthResponse loginAdmin(LoginRequest request);
}
