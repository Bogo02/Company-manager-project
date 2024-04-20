package tech.getarrays.employeemanager.model;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class Project implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String imageUrl;
    private String deadline;

    public Project() {}

    public Project(String name, String imageUrl, String deadline) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.deadline = deadline;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", deadline='" + deadline + '\'' +
                '}';
    }
}
