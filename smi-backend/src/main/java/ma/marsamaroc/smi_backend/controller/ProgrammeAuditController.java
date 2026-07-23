package ma.marsamaroc.smi_backend.controller;

import ma.marsamaroc.smi_backend.model.ProgrammeAudit;
import ma.marsamaroc.smi_backend.service.ProgrammeAuditService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programmes")
@CrossOrigin(origins = "http://localhost:4200")
public class ProgrammeAuditController {

    private final ProgrammeAuditService service;

    public ProgrammeAuditController(ProgrammeAuditService service) {
        this.service = service;
    }

    // Récupérer tous les programmes
    @GetMapping
    public List<ProgrammeAudit> getAll() {
        return service.getAll();
    }

    // Créer un programme (avec tous ses audits)
    @PostMapping
    public ProgrammeAudit create(@RequestBody ProgrammeAudit programme) {
        return service.save(programme);
    }
@PutMapping("/{id}")
public ProgrammeAudit update(
        @PathVariable Long id,
        @RequestBody ProgrammeAudit programme) {

    programme.setId(id);

    return service.update(programme);

}
    // Supprimer un programme
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

@GetMapping("/{id}")
public ProgrammeAudit getById(@PathVariable Long id) {
    return service.getById(id);
}}