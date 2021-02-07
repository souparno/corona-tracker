package io.spring.springboot.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.springboot.services.DataService;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/v1")
public class Api {

    @Autowired
    DataService DataService;

    @GetMapping("/")
    ResponseEntity<String> get() throws URISyntaxException, IOException, InterruptedException {
        return ResponseEntity.ok().body(DataService.fetchVirusData("/"));
    }

    @GetMapping("/countries")
    ResponseEntity<String> getCountries() throws URISyntaxException, IOException, InterruptedException {
        return ResponseEntity.ok().body(DataService.fetchVirusData("/countries/"));
    }
    
    @GetMapping("/countries/{country}")
    ResponseEntity<String> getCountry(@PathVariable String country) throws URISyntaxException, IOException, InterruptedException {
        return ResponseEntity.ok().body(DataService.fetchVirusData("/countries/" + country));
    }
}
