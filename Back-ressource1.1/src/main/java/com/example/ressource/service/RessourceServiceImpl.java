package com.example.ressource.service;

import com.example.ressource.entity.Ressource;
import com.example.ressource.repository.RessourceRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class RessourceServiceImpl implements IRessourceService {
    RessourceRepository ressourceRepository;
    @Override
    public List<Ressource> retrieveAllRessources() {
        return ressourceRepository.findAll();
           }

    @Override
    public Ressource retrieveRessource(Long rId) {
        return ressourceRepository.findById(rId).get();
            }

    @Override
    public Ressource addRessource(Ressource r) {
        return ressourceRepository.save(r);
    }

    @Override
    public void removeRessource(Long rId) {
        ressourceRepository.deleteById(rId);

    }

    @Override
    public Ressource modifyRessource(Ressource r) {
        return ressourceRepository.save(r);
    }
}
