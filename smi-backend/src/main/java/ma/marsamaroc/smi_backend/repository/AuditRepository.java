package ma.marsamaroc.smi_backend.repository;


import ma.marsamaroc.smi_backend.model.Audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

}