package com.timlin.portal.backend.contracts;

public record SystemStatus(String jenkinsStatus, String nasStatus, String lastBuildStatus) {}

