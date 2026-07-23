package ma.marsamaroc.smi_backend.service;

import org.springframework.stereotype.Service;
import ma.marsamaroc.smi_backend.model.Risque;
import ma.marsamaroc.smi_backend.repository.RisqueRepository;
import java.util.List;

@Service
public class RisqueService {

    private final RisqueRepository repository;

    public RisqueService(RisqueRepository repository) {
        this.repository = repository;
    }

    public List<Risque> getAll() {
        return repository.findAll();
    }

    public List<Risque> getByProcessusCode(String code) {
        return repository.findByProcessus_Code(code);
    }

    public Risque save(Risque risque) {
        return repository.save(risque);
    }

    public Risque update(Long id, Risque updated) {
        Risque existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risque introuvable avec l'id : " + id));

        existing.setProcessus(updated.getProcessus());
        existing.setCode(updated.getCode());
        existing.setDescription(updated.getDescription());
        existing.setCategorie(updated.getCategorie());
        existing.setCause(updated.getCause());
        existing.setGravite(updated.getGravite());
        existing.setProbabilite(updated.getProbabilite());
        existing.setDetectabilite(updated.getDetectabilite());
        existing.setCriticite(updated.getCriticite());
        existing.setStatut(updated.getStatut());
        existing.setMesurePrevention(updated.getMesurePrevention());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}