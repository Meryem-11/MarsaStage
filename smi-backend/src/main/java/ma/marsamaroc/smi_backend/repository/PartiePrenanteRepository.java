package com.marsa.smi.repository;

import com.marsa.smi.model.PartiePrenante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartiePrenanteRepository extends JpaRepository<PartiePrenante, Long> {
}