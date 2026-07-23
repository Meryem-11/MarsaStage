package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "analyse_pestel")
public class AnalysePESTEL {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String politique;

    @Column(length = 1000)
    private String economique;

    @Column(length = 1000)
    private String social;

    @Column(length = 1000)
    private String technologique;

    @Column(length = 1000)
    private String environnemental;

    @Column(length = 1000)
    private String legal;

    // Getters & Setters
}