package com.example.klopez.ParkedFinanceBus.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "paycheck_cycles")
public class PaycheckCycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cycle_id")
    private Long cycleId;

    @Column(name = "uid")
    private Long uid;

    @Column(name = "paycheck_amount")
    private Double paycheckAmount;

    @Column(name = "savings")
    private Double savings;

    @Column(name = "savings_goal")
    private Double savingsGoal;

    @Column(name = "needs")
    private Double needs;

    @Column(name = "wants")
    private Double wants;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    public Long getCycleId() { return cycleId; }
    public void setCycleId(Long cycleId) { this.cycleId = cycleId; }

    public Long getUid() { return uid; }
    public void setUid(Long uid) { this.uid = uid; }

    public Double getPaycheckAmount() { return paycheckAmount; }
    public void setPaycheckAmount(Double paycheckAmount) { this.paycheckAmount = paycheckAmount; }

    public Double getSavings() { return savings; }
    public void setSavings(Double savings) { this.savings = savings; }

    public Double getSavingsGoal() { return savingsGoal; }
    public void setSavingsGoal(Double savingsGoal) { this.savingsGoal = savingsGoal; }

    public Double getNeeds() { return needs; }
    public void setNeeds(Double needs) { this.needs = needs; }

    public Double getWants() { return wants; }
    public void setWants(Double wants) { this.wants = wants; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}
