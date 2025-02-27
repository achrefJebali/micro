package com.example.ressource.service;

import com.example.ressource.entity.Ressource;

import java.util.List;

public interface IRessourceService {
    public List<Ressource> retrieveAllRessources();
    public Ressource retrieveRessource(Long rId);
    public Ressource addRessource(Ressource r);
    public void removeRessource(Long rId);
    public Ressource modifyRessource(Ressource r);
}
