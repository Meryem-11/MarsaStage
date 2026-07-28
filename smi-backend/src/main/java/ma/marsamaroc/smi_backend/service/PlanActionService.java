package ma.marsamaroc.smi_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ma.marsamaroc.smi_backend.model.PlanAction;
import ma.marsamaroc.smi_backend.repository.PlanActionRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class PlanActionService {

    private final PlanActionRepository repository;

    public PlanActionService(PlanActionRepository repository) {
        this.repository = repository;
    }

    public List<PlanAction> getAll() {
        return repository.findAll();
    }

    public PlanAction create(PlanAction action) {
        return repository.save(action);
    }

  public PlanAction update(Long id, PlanAction updated) {
    PlanAction existing = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Action introuvable avec l'id : " + id));

    existing.setProcessus(updated.getProcessus());
    existing.setResponsable(updated.getResponsable());
    existing.setIntitule(updated.getIntitule());
    existing.setOrigineModule(updated.getOrigineModule());
    existing.setOrigineId(updated.getOrigineId());
    existing.setPriorite(updated.getPriorite());
    existing.setEcheance(updated.getEcheance());
    existing.setStatut(updated.getStatut());

    // Conserver la preuve si non renseignée dans le payload de mise à jour
    if (updated.getPreuveNom() != null) {
        existing.setPreuveNom(updated.getPreuveNom());
    }

    return repository.save(existing);
}

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public PlanAction uploadPreuve(Long id, MultipartFile file) throws IOException {
        PlanAction existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action introuvable avec l'id : " + id));

        String uploadDir = "uploads/plan-actions/";
        Files.createDirectories(Paths.get(uploadDir));
        String fileName = id + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(uploadDir + fileName), StandardCopyOption.REPLACE_EXISTING);

        existing.setPreuveNom(file.getOriginalFilename());
        existing.setCheminPreuve(uploadDir + fileName);

        return repository.save(existing);
    }
}