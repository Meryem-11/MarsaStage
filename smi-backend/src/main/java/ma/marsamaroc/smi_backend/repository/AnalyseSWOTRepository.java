package ma.marsamaroc.smi_backend.repository;

import ma.marsamaroc.smi_backend.model.AnalyseSWOT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyseSWOTRepository extends JpaRepository<AnalyseSWOT, Long> {
}