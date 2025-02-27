package com.example.ressource.controller;

import com.example.ressource.entity.Ressource;
import com.example.ressource.service.IRessourceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Ressource")
public class RessourceRestController {

    IRessourceService ressourceService;
    @GetMapping("/retrieve-all-ressources")
    public List<Ressource> getRessources() {
        return  ressourceService.retrieveAllRessources();

    }
    @GetMapping("/retrieve-ressource/{ressource-id}")
    public Ressource retrieveRessource(@PathVariable("ressource-id") Long rId) {
        return   ressourceService.retrieveRessource(rId);

    }

    @PostMapping("/add-ressource")
    public Ressource addRessource(@RequestBody Ressource r) {
        Ressource ressource = ressourceService.addRessource(r);
        return ressource;
    }

    @DeleteMapping("/remove-ressource/{ressource-id}")
    public void removeRessource(@PathVariable("ressource-id") Long chId) {
        ressourceService.removeRessource(chId);
    }

    @PutMapping("/modify-ressource")
    public Ressource modifyRessource(@RequestBody Ressource r) {
        Ressource ressource = ressourceService.modifyRessource(r);
        return ressource;
    }

}
