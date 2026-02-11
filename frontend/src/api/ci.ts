export type JenkinsJob = {
    name: string;
    url?: string;
    color?: string;
};

// Jenkins returns { jobs: [...] }
export type JenkinsJobsResponse = {
    jobs: JenkinsJob[];
};

export type BuildResult = {
    jobId: string;
    status: "QUEUED" | "RUNNING" | "STARTED" | "UNKNOWN";
};

const BACKEND = "http://localhost:8080";

export async function fetchJobs(): Promise<JenkinsJobsResponse> {
    const res = await fetch(`${BACKEND}/api/ci/jobs`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function triggerBuild(jobId: string): Promise<BuildResult> {
    const res = await fetch(`${BACKEND}/api/ci/jobs/${encodeURIComponent(jobId)}`, {
        method: "POST",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}
