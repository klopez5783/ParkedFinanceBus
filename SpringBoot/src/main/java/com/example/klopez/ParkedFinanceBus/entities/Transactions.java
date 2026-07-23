package com.example.klopez.ParkedFinanceBus.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Transactions {

    // transaction_id, cycle_id, uid, category, amount, description, created_at

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "cycle_id")
    private Long cycleId;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "category")
    private String category;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getTransactionId() {return transactionId;}
    public void setTransactionId(Long transactionId) { this.transactionId = transactionId;    }

    public Long getCycleId() {return cycleId;}
    public void setCycleId(Long cycleId) {this.cycleId = cycleId;}

    public Integer getUid() {return uid;}
    public void setUid(Integer uid) { this.uid = uid;}

    public String getCategory() {return category;}
    public void setCategory(String category) {this.category = category;}

    public Double getAmount() {return amount;}
    public void setAmount(Double amount) {this.amount = amount;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

}
