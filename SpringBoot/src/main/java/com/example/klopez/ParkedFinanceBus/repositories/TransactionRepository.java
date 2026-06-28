package com.example.klopez.ParkedFinanceBus.repositories;

import com.example.klopez.ParkedFinanceBus.entities.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Long> {
    List<Transactions> findByUid(Integer uid);
    List<Transactions> findByCycleId(Long cycleId);
}
