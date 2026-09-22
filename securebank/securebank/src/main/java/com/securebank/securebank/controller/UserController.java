package com.securebank.securebank.controller;

import com.securebank.securebank.dto.*;

import com.securebank.securebank.dto.UserResponse;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

   @PostMapping
public ResponseEntity<UserResponse> createUser(
        @Valid @RequestBody RegisterRequest request) {

    User createdUser = userService.createUser(request);

    UserResponse response = new UserResponse(
            createdUser.getId(),
            createdUser.getName(),
            createdUser.getEmail()
    );

    return ResponseEntity.ok(response);
}
}