package com.civicconnect.service.impl;

import com.civicconnect.dto.*;
import com.civicconnect.exception.DuplicateResourceException;
import com.civicconnect.exception.ResourceNotFoundException;
import com.civicconnect.model.Admin;
import com.civicconnect.model.User;
import com.civicconnect.model.enums.Role;
import com.civicconnect.repository.AdminRepository;
import com.civicconnect.repository.UserRepository;
import com.civicconnect.security.JwtUtil;
import com.civicconnect.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse registerUser(UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), Role.USER.name());
        return new AuthResponse(token, user.getName(), user.getEmail(), Role.USER.name());
    }

    @Override
    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), Role.USER.name());
        return new AuthResponse(token, user.getName(), user.getEmail(), Role.USER.name());
    }

    @Override
    public AuthResponse registerAdmin(AdminRegisterRequest request) {
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered");
        }
        Admin admin = new Admin();
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole(Role.ADMIN);
        adminRepository.save(admin);

        String token = jwtUtil.generateToken(admin.getEmail(), Role.ADMIN.name());
        return new AuthResponse(token, admin.getName(), admin.getEmail(), Role.ADMIN.name());
    }

    @Override
    public AuthResponse loginAdmin(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), Role.ADMIN.name());
        return new AuthResponse(token, admin.getName(), admin.getEmail(), Role.ADMIN.name());
    }
}
