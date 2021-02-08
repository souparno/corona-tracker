package io.spring.springboot.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import io.spring.springboot.services.DataService;

@RestController
@RequestMapping("/api/v1")
public class Api {

    @Autowired
    DataService DataService;

    private static final String VIRUS_DATA_URL = "https://api.covid19india.org";

    @GetMapping("/{path}")
    ResponseEntity<String> get(@PathVariable String path) throws URISyntaxException, IOException, InterruptedException {
        String fetchVirusData = DataService.fetchVirusData(VIRUS_DATA_URL + "/v4/min/" + path);
        return ResponseEntity.ok().body(fetchVirusData);
    }

    @GetMapping("/updatelog")
    ResponseEntity<String> getUpdateLog() throws URISyntaxException, IOException, InterruptedException {
        String fetchVirusData = DataService.fetchVirusData(VIRUS_DATA_URL + "/updatelog/log.json");
        return ResponseEntity.ok().body(fetchVirusData);
    }
}
