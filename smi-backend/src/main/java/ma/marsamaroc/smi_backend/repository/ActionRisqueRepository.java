package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.ActionRisque;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActionRisqueRepository extends JpaRepository<ActionRisque, Long> {
    List<ActionRisque> findByRisque_IdRisque(Long idRisque);
    List<ActionRisque> findByRisque_Processus_Code(String code);
}