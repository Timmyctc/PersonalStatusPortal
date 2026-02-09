package com.timlin.portal.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "jenkins")
public record JenkinsProperties(String baseUrl, String username, String apiToken) {}
