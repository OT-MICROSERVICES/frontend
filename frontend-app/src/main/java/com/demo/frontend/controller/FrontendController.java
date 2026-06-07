package com.demo.frontend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@Controller
public class FrontendController {

    @Value("${backend.url:http://localhost:8081}")
    private String backendUrl;

    private final RestTemplate rest = new RestTemplate();

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("backendUrl", backendUrl);
        return "index";
    }
}
