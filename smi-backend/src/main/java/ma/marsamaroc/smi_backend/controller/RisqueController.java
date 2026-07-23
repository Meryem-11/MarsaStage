package ma.marsamaroc.smi_backend.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import ma.marsamaroc.smi_backend.model.Risque;
import ma.marsamaroc.smi_backend.service.RisqueService;
import java.util.List;

@RestController
@RequestMapping("/api/risques")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RisqueController {

    private final RisqueService service;

    @GetMapping
    public List<Risque> getAll() {
        return service.getAll();
    }

    @GetMapping("/processus/{code}")
    public List<Risque> getByProcessus(@PathVariable String code) {
        return service.getByProcessusCode(code);
    }

    @PostMapping
    public Risque create(@RequestBody Risque risque) {
        return service.save(risque);
    }

    @PutMapping("/{id}")
    public Risque update(@PathVariable Long id, @RequestBody Risque risque) {
        return service.update(id, risque);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}