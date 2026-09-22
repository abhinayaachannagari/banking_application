package com.securebank.securebank.repository;

import com.securebank.securebank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    boolean existsByTransactionId(String transactionId);

    List<Transaction> findBySenderAccount_AccountNumberOrReceiverAccount_AccountNumberOrderByCreatedAtDesc(
            String senderAccountNumber,
            String receiverAccountNumber
    );
}