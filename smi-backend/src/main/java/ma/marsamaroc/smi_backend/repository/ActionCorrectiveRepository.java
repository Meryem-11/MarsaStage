package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.ActionCorrective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActionCorrectiveRepository extends JpaRepository<ActionCorrective, Long> {


    List<ActionCorrective> findByAuditId(Long auditId);


}