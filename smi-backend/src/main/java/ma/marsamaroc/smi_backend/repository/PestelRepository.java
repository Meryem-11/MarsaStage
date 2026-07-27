package com.marsa.smi.repository;

import com.marsa.smi.model.PestelItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PestelRepository extends JpaRepository<PestelItem, Long> {
    List<PestelItem> findByCategoryKey(String categoryKey);
}