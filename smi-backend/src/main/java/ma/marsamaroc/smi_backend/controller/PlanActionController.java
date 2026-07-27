package ma.marsamaroc.smi_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ma.marsamaroc.smi_backend.model.PlanAction;
import ma.marsamaroc.smi_backend.enums.OrigineModule;
import ma.marsamaroc.smi_backend.service.PlanActionService;
import ma.marsamaroc.smi_backend.repository.PlanActionRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource; // Nécessaire aussi pour le téléchargement
import org.springframework.http.HttpHeaders;     // Nécessaire pour les en-têtes de téléchargement
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/plan-actions")
@CrossOrigin(origins = "http://localhost:4200")
public class PlanActionController {

    private final PlanActionService service;
    private final PlanActionRepository repository;

    public PlanActionController(PlanActionService service, PlanActionRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @GetMapping
    public List<PlanAction> getAll() {
        return service.getAll();
    }

    // Toutes les actions générées par un enregistrement précis d'un autre module
    @GetMapping("/origine/{module}/{origineId}")
    public List<PlanAction> getByOrigine(@PathVariable OrigineModule module, @PathVariable UUID origineId) {
        return repository.findByOrigineModuleAndOrigineId(module, origineId);
    }

    @PostMapping
    public PlanAction create(@RequestBody PlanAction action) {
        return service.create(action);
    }

    @PutMapping("/{id}")
    public PlanAction update(@PathVariable Long id, @RequestBody PlanAction action) {
        return service.update(id, action);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping("/{id}/upload-preuve")
    public PlanAction uploadPreuve(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        return service.uploadPreuve(id, file);
    }
    @GetMapping("/{id}/preuve")
public ResponseEntity<Resource> downloadPreuve(@PathVariable Long id) throws IOException {
    PlanAction action = service.getAll().stream()
            .filter(a -> a.getIdAction().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Action introuvable"));

    if (action.getCheminPreuve() == null) {
        return ResponseEntity.notFound().build();
    }

    Path filePath = Paths.get(action.getCheminPreuve());
    Resource resource = new UrlResource(filePath.toUri());

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + action.getPreuveNom() + "\"")
            .body(resource);
}
}