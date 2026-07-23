package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.Processus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProcessusRepository extends JpaRepository<Processus, Long> {
    Optional<Processus> findByCode(String code);
}