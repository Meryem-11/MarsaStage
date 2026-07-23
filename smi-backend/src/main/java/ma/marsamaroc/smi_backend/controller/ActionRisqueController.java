package ma.marsamaroc.smi_backend.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import ma.marsamaroc.smi_backend.model.ActionRisque;
import ma.marsamaroc.smi_backend.service.ActionRisqueService;
import java.util.List;

@RestController
@RequestMapping("/api/actions-risques")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ActionRisqueController {

    private final ActionRisqueService service;

    @GetMapping
    public List<ActionRisque> getAll() {
        return service.getAll();
    }

    @GetMapping("/risque/{idRisque}")
    public List<ActionRisque> getByRisque(@PathVariable Long idRisque) {
        return service.getByRisque(idRisque);
    }

    @GetMapping("/processus/{code}")
    public List<ActionRisque> getByProcessus(@PathVariable String code) {
        return service.getByProcessus(code);
    }

    @PostMapping
    public ActionRisque create(@RequestBody ActionRisque action) {
        return service.save(action);
    }

    @PutMapping("/{id}")
    public ActionRisque update(@PathVariable Long id, @RequestBody ActionRisque action) {
        return service.update(id, action);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}