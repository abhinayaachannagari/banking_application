package com.securebank.securebank.service;

import com.securebank.securebank.dto.AccountResponse;
import com.securebank.securebank.dto.CreateAccountRequest;
import com.securebank.securebank.entity.Account;
import com.securebank.securebank.entity.User;
import com.securebank.securebank.repository.AccountRepository;
import com.securebank.securebank.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public AccountService(
            AccountRepository accountRepository,
            UserRepository userRepository) {

        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public AccountResponse createAccount(
            CreateAccountRequest request,
            String email) {

        // 1. Find the authenticated user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // 2. Generate unique account number
        String accountNumber = generateAccountNumber();

        // 3. Create account
        Account account = new Account();

        account.setAccountNumber(accountNumber);
        account.setUser(user);
        account.setBalance(BigDecimal.ZERO);
        account.setAccountType(request.getAccountType().toUpperCase());
        account.setStatus("ACTIVE");
        account.setCreatedAt(LocalDateTime.now());

        // 4. Save account
        Account savedAccount = accountRepository.save(account);

        // 5. Return safe response
        return convertToResponse(savedAccount);
    }

    public List<AccountResponse> getMyAccounts(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return accountRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private String generateAccountNumber() {

        String accountNumber;

        do {
            accountNumber = "10" +
                    UUID.randomUUID()
                            .toString()
                            .replace("-", "")
                            .substring(0, 10)
                            .toUpperCase();

        } while (accountRepository.existsByAccountNumber(accountNumber));

        return accountNumber;
    }

    private AccountResponse convertToResponse(Account account) {

        return new AccountResponse(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                account.getAccountType(),
                account.getStatus(),
                account.getCreatedAt()
        );
    }
}