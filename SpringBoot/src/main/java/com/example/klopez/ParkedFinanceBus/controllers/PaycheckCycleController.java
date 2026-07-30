package com.example.klopez.ParkedFinanceBus.controllers;

import com.example.klopez.ParkedFinanceBus.entities.PaycheckCycle;
import com.example.klopez.ParkedFinanceBus.repositories.PaycheckCycleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/PaycheckCycles")
public class PaycheckCycleController {

    private final PaycheckCycleRepository paycheckCycleRepository;

    public PaycheckCycleController(PaycheckCycleRepository paycheckCycleRepository) {
        this.paycheckCycleRepository = paycheckCycleRepository;
    }

    @GetMapping
    public List<PaycheckCycle> getAllPaycheckCycles() {
        return paycheckCycleRepository.findAll();
    }

    @GetMapping("/user/{uid}")
    public ResponseEntity<?> getPaycheckCycleByUid(@PathVariable Long uid) {
        return paycheckCycleRepository.findTopByUidOrderByCycleIdDesc(uid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/{id}")
    public PaycheckCycle getPaycheckCycle(@PathVariable Long id) {
        return paycheckCycleRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public PaycheckCycle createPaycheckCycle(@RequestBody PaycheckCycle paycheckCycle) {
        return paycheckCycleRepository.save(paycheckCycle);
    }

    @PatchMapping("/{id}")
    public PaycheckCycle updateBalances(@PathVariable Long id, @RequestBody PaycheckCycle paycheckCycle) {
        PaycheckCycle existingCycle = paycheckCycleRepository.findById(id).orElseThrow();
        existingCycle.setSavings(paycheckCycle.getSavings());
        existingCycle.setNeeds(paycheckCycle.getNeeds());
        existingCycle.setWants(paycheckCycle.getWants());
        existingCycle.setPaycheckAmount(paycheckCycle.getPaycheckAmount());
        existingCycle.setSavingsGoal(paycheckCycle.getSavingsGoal());
        existingCycle.setEndDate(paycheckCycle.getEndDate());
        existingCycle.setStartDate(paycheckCycle.getStartDate());
        return paycheckCycleRepository.save(existingCycle);
    }

    @DeleteMapping("/{id}")
    public void deletePaycheckCycle(@PathVariable Long id) {
        paycheckCycleRepository.deleteById(id);
    }

    @GetMapping("/user/{uid}/all")
    public List<PaycheckCycle> getAllPaycheckCyclesByUid(@PathVariable Long uid) {
        return paycheckCycleRepository.findByUidOrderByCycleIdDesc(uid);
    }
    
}
