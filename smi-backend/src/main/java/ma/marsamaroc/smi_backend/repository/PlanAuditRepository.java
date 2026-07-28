package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.PlanAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanAuditRepository extends JpaRepository<PlanAudit, Long> {

}