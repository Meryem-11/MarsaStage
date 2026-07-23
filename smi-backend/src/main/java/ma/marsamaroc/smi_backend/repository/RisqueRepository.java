package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.Risque;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RisqueRepository extends JpaRepository<Risque, Long> {
    List<Risque> findByProcessus_Code(String code);
    List<Risque> findByProcessus_Id(Long idProcessus);
}