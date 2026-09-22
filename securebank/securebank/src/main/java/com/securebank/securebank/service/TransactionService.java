package com.securebank.securebank.service;

import com.securebank.securebank.entity.Account;
import com.securebank.securebank.entity.Transaction;
import com.securebank.securebank.repository.AccountRepository;
import com.securebank.securebank.repository.TransactionRepository;
import com.securebank.securebank.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.securebank.securebank.entity.User;

import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(
            AccountRepository accountRepository,
            TransactionRepository transactionRepository,UserRepository userRepository) {

        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository=userRepository;
    }

    @Transactional
   public Transaction deposit(
        String accountNumber,
        BigDecimal amount,
        String email) {

    Account account = accountRepository
            .findByAccountNumber(accountNumber)
            .orElseThrow(() ->
                    new RuntimeException("Account not found"));

    // Ownership check
    if (!account.getUser().getEmail().equals(email)) {
        throw new RuntimeException("You are not authorized to access this account");
    }

    if (!account.getStatus().equals("ACTIVE")) {
        throw new RuntimeException("Account is not active");
    }

    account.setBalance(account.getBalance().add(amount));
    accountRepository.save(account);

    Transaction transaction = new Transaction();
    transaction.setTransactionId(generateTransactionId());
    transaction.setReceiverAccount(account);
    transaction.setAmount(amount);
    transaction.setTransactionType("DEPOSIT");
    transaction.setStatus("SUCCESS");
    transaction.setCreatedAt(LocalDateTime.now());

    return transactionRepository.save(transaction);
}
   @Transactional
public Transaction withdraw(
        String accountNumber,
        BigDecimal amount,
        String email) {

    Account account = accountRepository
            .findByAccountNumber(accountNumber)
            .orElseThrow(() ->
                    new RuntimeException("Account not found"));

    // Ownership check
    if (!account.getUser().getEmail().equals(email)) {
        throw new RuntimeException("You are not authorized to access this account");
    }

    if (!account.getStatus().equals("ACTIVE")) {
        throw new RuntimeException("Account is not active");
    }

    if (account.getBalance().compareTo(amount) < 0) {
        throw new RuntimeException("Insufficient balance");
    }

    account.setBalance(account.getBalance().subtract(amount));
    accountRepository.save(account);

    Transaction transaction = new Transaction();
    transaction.setTransactionId(generateTransactionId());
    transaction.setSenderAccount(account);
    transaction.setAmount(amount);
    transaction.setTransactionType("WITHDRAW");
    transaction.setStatus("SUCCESS");
    transaction.setCreatedAt(LocalDateTime.now());

    return transactionRepository.save(transaction);
}
    private String generateTransactionId() {

        String transactionId;

        do {
            transactionId = "TXN-" +
                    UUID.randomUUID()
                            .toString()
                            .replace("-", "")
                            .substring(0, 12)
                            .toUpperCase();

        } while (transactionRepository
                .existsByTransactionId(transactionId));

        return transactionId;
    }
    @Transactional
public Transaction transfer(
        String senderAccountNumber,
        String receiverAccountNumber,
        BigDecimal amount,
        String email) {

    // 1. Find sender account
    Account sender = accountRepository
            .findByAccountNumber(senderAccountNumber)
            .orElseThrow(() ->
                    new RuntimeException("Sender account not found"));

    // 2. Verify sender belongs to logged-in user
    if (!sender.getUser().getEmail().equals(email)) {
        throw new RuntimeException(
                "You are not authorized to use this account");
    }

    // 3. Check sender is active
    if (!sender.getStatus().equals("ACTIVE")) {
        throw new RuntimeException("Sender account is not active");
    }

    // 4. Find receiver
    Account receiver = accountRepository
            .findByAccountNumber(receiverAccountNumber)
            .orElseThrow(() ->
                    new RuntimeException("Receiver account not found"));

    // 5. Check receiver is active
    if (!receiver.getStatus().equals("ACTIVE")) {
        throw new RuntimeException("Receiver account is not active");
    }

    // 6. Prevent transferring to same account
    if (sender.getAccountNumber()
            .equals(receiver.getAccountNumber())) {

        throw new RuntimeException(
                "Cannot transfer money to the same account");
    }

    // 7. Check balance
    if (sender.getBalance().compareTo(amount) < 0) {
        throw new RuntimeException("Insufficient balance");
    }

    // 8. Debit sender
    sender.setBalance(
            sender.getBalance().subtract(amount)
    );

    // 9. Credit receiver
    receiver.setBalance(
            receiver.getBalance().add(amount)
    );

    // 10. Save updated accounts
    accountRepository.save(sender);
    accountRepository.save(receiver);

    // 11. Create transaction record
    Transaction transaction = new Transaction();

    transaction.setTransactionId(generateTransactionId());
    transaction.setSenderAccount(sender);
    transaction.setReceiverAccount(receiver);
    transaction.setAmount(amount);
    transaction.setTransactionType("TRANSFER");
    transaction.setStatus("SUCCESS");
    transaction.setCreatedAt(LocalDateTime.now());

    return transactionRepository.save(transaction);
}
public List<Transaction> getTransactionHistory(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    List<Account> accounts = accountRepository.findByUser(user);

    return accounts.stream()
            .flatMap(account ->
                    transactionRepository
                            .findBySenderAccount_AccountNumberOrReceiverAccount_AccountNumberOrderByCreatedAtDesc(
                                    account.getAccountNumber(),
                                    account.getAccountNumber()
                            )
                            .stream()
            )
            .distinct()
            .toList();
}
}