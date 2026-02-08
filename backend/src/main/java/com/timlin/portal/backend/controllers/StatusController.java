package com.timlin.portal.backend.controllers;

import com.timlin.portal.backend.contracts.SystemStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StatusController {

    @GetMapping("/status")
    public SystemStatus getStatus() {
        return new SystemStatus("Up", "Up", "Success");
    }
}
