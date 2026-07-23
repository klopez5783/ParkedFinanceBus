package com.example.klopez.ParkedFinanceBus.controllers;


import com.example.klopez.ParkedFinanceBus.entities.Transactions;
import com.example.klopez.ParkedFinanceBus.repositories.TransactionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public List<Transactions> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/user/{uid}")
    public List<Transactions> getTransactionsByUserId(@PathVariable Integer uid) {
        return transactionRepository.findByUid(uid);
    }

    @GetMapping("/cycle/{cycleId}")
    public List<Transactions> getTransactionsByCycleId(@PathVariable Long cycleId) {
        return transactionRepository.findByCycleId(cycleId);
    }

    @GetMapping("/{id}")
    public Transactions getTransaction(@PathVariable Long id) {
        return transactionRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Transactions createTransaction(@RequestBody Transactions transaction) {
        return transactionRepository.save(transaction);
    }

    @PatchMapping("/{id}")
    public Transactions updateTransaction(@PathVariable Long id, @RequestBody Transactions transaction) {
        Transactions existing = transactionRepository.findById(id).orElseThrow();
        existing.setDescription(transaction.getDescription());
        existing.setCategory(transaction.getCategory());
        existing.setAmount(transaction.getAmount());
        return transactionRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
