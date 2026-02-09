package com.timlin.portal.backend.controllers;

import com.timlin.portal.backend.contracts.BuildResult;
import com.timlin.portal.backend.web.JenkinsClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ci")
public class CiController {

    private final JenkinsClient jenkinsClient;

    public CiController(JenkinsClient jenkinsClient) {
        this.jenkinsClient=jenkinsClient;
    }

    @GetMapping("/jobs")
    public String getJobs() {
        return jenkinsClient.getJobsAsJson();
    }

    /*
        So posting to http://localhost8080:/jobs/conorJob will hit jenkins http://localhost8080/job/{jobName}/build"
        triggering a new build of that existing job type
     */
    @PostMapping("/jobs/{jobName}")
    @ResponseStatus(HttpStatus.CREATED)
    public BuildResult triggerCiJob(@PathVariable String jobName) {
        jenkinsClient.triggerJobBuild(jobName);
        return new BuildResult(jobName, "QUEUED");
    }
}
