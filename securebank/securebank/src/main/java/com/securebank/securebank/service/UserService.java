package com.securebank.securebank.service;

import com.securebank.securebank.dto.*;

import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(RegisterRequest request) {

    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already registered");
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());

    user.setPassword(
        passwordEncoder.encode(request.getPassword())
    );

    return userRepository.save(user);
}
}