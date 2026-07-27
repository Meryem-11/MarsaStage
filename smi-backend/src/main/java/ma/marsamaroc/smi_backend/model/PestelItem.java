package com.marsa.smi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pestel_items")
public class PestelItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String categoryKey; // politique, economique, etc.

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    public PestelItem() {}

    public PestelItem(String categoryKey, String text) {
        this.categoryKey = categoryKey;
        this.text = text;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategoryKey() { return categoryKey; }
    public void setCategoryKey(String categoryKey) { this.categoryKey = categoryKey; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}