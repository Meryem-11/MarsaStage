package com.marsa.smi.controller;

import com.marsa.smi.model.PestelItem;
import com.marsa.smi.repository.PestelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pestel")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class PestelController {

    private final PestelRepository pestelRepository;

    public PestelController(PestelRepository pestelRepository) {
        this.pestelRepository = pestelRepository;
    }

    // Récupérer tous les éléments PESTEL
    @GetMapping
    public List<PestelItem> getAllItems() {
        return pestelRepository.findAll();
    }

    // Créer un nouvel élément
    @PostMapping
    public PestelItem createItem(@RequestBody PestelItem item) {
        return pestelRepository.save(item);
    }

    @PutMapping("/{id}")
public ResponseEntity<PestelItem> updateItem(@PathVariable Long id, @RequestBody PestelItem itemDetails) {
    return pestelRepository.findById(id)
            .map(item -> {
                item.setText(itemDetails.getText());
                return ResponseEntity.ok(pestelRepository.save(item));
            })
            .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
    if (pestelRepository.existsById(id)) {
        pestelRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
}
}