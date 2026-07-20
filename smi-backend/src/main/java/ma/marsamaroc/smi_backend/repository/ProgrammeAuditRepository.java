package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.ProgrammeAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProgrammeAuditRepository 
        extends JpaRepository<ProgrammeAudit, Long> {

}