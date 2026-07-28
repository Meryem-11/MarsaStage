package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.PlanAction;
import ma.marsamaroc.smi_backend.enums.OrigineModule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PlanActionRepository extends JpaRepository<PlanAction, Long> {
    List<PlanAction> findByProcessus_Code(String code);
    List<PlanAction> findByOrigineModuleAndOrigineId(OrigineModule origineModule, UUID origineId);
}