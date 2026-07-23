package ma.marsamaroc.smi_backend.controller;

import ma.marsamaroc.smi_backend.model.AnalyseSWOT;
import ma.marsamaroc.smi_backend.repository.AnalyseSWOTRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/swot")
@CrossOrigin(origins = "*")
public class AnalyseSWOTController {

    private final AnalyseSWOTRepository repository;

    public AnalyseSWOTController(AnalyseSWOTRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AnalyseSWOT> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public AnalyseSWOT create(@RequestBody AnalyseSWOT swot) {
        if (swot.getDate() == null) {
            swot.setDate(LocalDate.now());
        }
        return repository.save(swot);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnalyseSWOT> update(@PathVariable Long id, @RequestBody AnalyseSWOT details) {
        return repository.findById(id).map(swot -> {
            swot.setType(details.getType());
            swot.setDescription(details.getDescription());
            swot.setPriorite(details.getPriorite());
            if (details.getDate() != null) {
                swot.setDate(details.getDate());
            }
            return ResponseEntity.ok(repository.save(swot));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}