package com.securebank.securebank.service;

import com.securebank.securebank.dto.LoginRequest;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.UserRepository;
import com.securebank.securebank.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(LoginRequest request) {

    System.out.println("LOGIN EMAIL: " + request.getEmail());

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("EMAIL NOT FOUND"));

    System.out.println("USER FOUND: " + user.getEmail());
    System.out.println("DB PASSWORD: " + user.getPassword());
    System.out.println("PASSWORD MATCH: " +
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            ));

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        throw new RuntimeException("PASSWORD DOES NOT MATCH");
    }

    return jwtService.generateToken(user.getEmail());
}
}