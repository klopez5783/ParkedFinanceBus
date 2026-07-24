package com.example.klopez.ParkedFinanceBus.repositories;

import com.example.klopez.ParkedFinanceBus.entities.PaycheckCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaycheckCycleRepository extends JpaRepository<PaycheckCycle, Long> {
    Optional<PaycheckCycle> findTopByUidOrderByCycleIdDesc(Long uid);
}
