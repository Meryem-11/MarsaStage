package ma.marsamaroc.smi_backend.controller;

import ma.marsamaroc.smi_backend.model.PlanAudit;
import ma.marsamaroc.smi_backend.service.PlanAuditService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:4200")
public class PlanAuditController {

    private final PlanAuditService service;

    public PlanAuditController(PlanAuditService service) {
        this.service = service;
    }

    // Récupérer tous les plans
    @GetMapping
    public List<PlanAudit> getAll() {
        return service.getAll();
    }

    // Récupérer un plan par son id
    @GetMapping("/{id}")
    public PlanAudit getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Créer un plan
    @PostMapping
    public PlanAudit create(@RequestBody PlanAudit planAudit) {
        return service.save(planAudit);
    }

    // Modifier un plan
    @PutMapping("/{id}")
    public PlanAudit update(
            @PathVariable Long id,
            @RequestBody PlanAudit planAudit) {

        planAudit.setId(id);

        return service.update(planAudit);
    }

    // Supprimer un plan
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}