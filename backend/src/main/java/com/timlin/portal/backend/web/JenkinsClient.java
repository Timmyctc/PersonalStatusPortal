package com.timlin.portal.backend.web;

import com.timlin.portal.backend.config.JenkinsProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class JenkinsClient {

    private final WebClient webClient;

    public JenkinsClient(JenkinsProperties jenkinsProperties) {
        String basic = jenkinsProperties.username() + ":" + jenkinsProperties.apiToken();
        String authentication = "Basic " + Base64.getEncoder().encodeToString(basic.getBytes(StandardCharsets.UTF_8));

        this.webClient = WebClient.builder()
                .baseUrl(jenkinsProperties.baseUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, authentication)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    //These are JENKINS uris not Spring APIS
    public String getJobsAsJson() {
        return webClient.get()
                .uri("/api/json?tree=jobs[name,color,url]")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    //JENKINS endpoint that triggers a job. I.E you have a pipeline job set up called ConorsJob then POSTing to /job/conorJob/build will trigger a build in that job
    public void triggerJobBuild(String jobName) {
        webClient.post()
                .uri("/job/{jobName}/build", jobName)
                .retrieve()
                .toBodilessEntity()
                .block();
    }
}
