package ma.marsamaroc.smi_backend.service;

import org.springframework.stereotype.Service;
import ma.marsamaroc.smi_backend.model.Processus;
import ma.marsamaroc.smi_backend.repository.ProcessusRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@Service
public class ProcessusService {

    private final ProcessusRepository repository;

    public ProcessusService(ProcessusRepository repository) {
        this.repository = repository;
    }

    public List<Processus> getAll() {
        return repository.findAll();
    }

    public Processus save(Processus processus) {
        return repository.save(processus);
    }

    public Processus updateByCode(String code, Processus updated) {
        Processus existing = repository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Processus introuvable avec le code : " + code));

        existing.setNom(updated.getNom());
        existing.setDescription(updated.getDescription());
        existing.setType(updated.getType());
        existing.setPilote(updated.getPilote());
        existing.setVersion(updated.getVersion());
        existing.setDateRevision(updated.getDateRevision());
        existing.setStatut(updated.getStatut());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
    public Processus uploadPdf(String code, MultipartFile file) throws IOException {
    Processus existing = repository.findByCode(code)
            .orElseThrow(() -> new RuntimeException("Processus introuvable : " + code));

    String uploadDir = "uploads/processus/";
    Files.createDirectories(Paths.get(uploadDir));
    String fileName = code + "_" + file.getOriginalFilename();
    Files.copy(file.getInputStream(), Paths.get(uploadDir + fileName), StandardCopyOption.REPLACE_EXISTING);

    existing.setCheminPdf(uploadDir + fileName);

    return repository.save(existing);
}
}