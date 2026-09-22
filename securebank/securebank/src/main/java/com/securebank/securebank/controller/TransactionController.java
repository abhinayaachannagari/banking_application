package com.securebank.securebank.controller;

import com.securebank.securebank.dto.DepositRequest;
import com.securebank.securebank.dto.WithdrawRequest;
import com.securebank.securebank.dto.TransferRequest;
import com.securebank.securebank.entity.Transaction;
import com.securebank.securebank.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService) {

        this.transactionService = transactionService;
    }

    @PostMapping("/deposit/{accountNumber}")
public ResponseEntity<Map<String, Object>> deposit(
        @PathVariable String accountNumber,
        @Valid @RequestBody DepositRequest request,
        Authentication authentication) {

    Transaction transaction =
            transactionService.deposit(
                    accountNumber,
                    request.getAmount(),
                    authentication.getName()
            );

    return ResponseEntity.ok(
            Map.of(
                    "message", "Deposit successful",
                    "transactionId", transaction.getTransactionId(),
                    "amount", transaction.getAmount()
            )
    );
}

   @PostMapping("/withdraw/{accountNumber}")
public ResponseEntity<Map<String, Object>> withdraw(
        @PathVariable String accountNumber,
        @Valid @RequestBody WithdrawRequest request,
        Authentication authentication) {

    Transaction transaction =
            transactionService.withdraw(
                    accountNumber,
                    request.getAmount(),
                    authentication.getName()
            );

    return ResponseEntity.ok(
            Map.of(
                    "message", "Withdrawal successful",
                    "transactionId", transaction.getTransactionId(),
                    "amount", transaction.getAmount()
            )
    );
}
@PostMapping("/transfer/{senderAccountNumber}")
public ResponseEntity<Map<String, Object>> transfer(
        @PathVariable String senderAccountNumber,
        @Valid @RequestBody TransferRequest request,
        Authentication authentication) {

    Transaction transaction =
            transactionService.transfer(
                    senderAccountNumber,
                    request.getReceiverAccountNumber(),
                    request.getAmount(),
                    authentication.getName()
            );

    return ResponseEntity.ok(
            Map.of(
                    "message", "Transfer successful",
                    "transactionId", transaction.getTransactionId(),
                    "amount", transaction.getAmount(),
                    "receiverAccount",
                    transaction.getReceiverAccount().getAccountNumber()
            )
    );
}
}