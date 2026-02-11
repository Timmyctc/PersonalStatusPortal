import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchJobs, triggerBuild, type JenkinsJob } from "../api/ci";

export default function Ci() {
    const jobsQuery = useQuery({
        queryKey: ["ciJobs"],
        queryFn: fetchJobs,
    });

    const jobs: JenkinsJob[] = jobsQuery.data?.jobs ?? [];
    const [selectedJobId, setSelectedJobId] = useState<string>("");

    // pick default selection once jobs load
    useMemo(() => {
        if (!selectedJobId && jobs.length > 0) setSelectedJobId(jobs[0].name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobs.length]);

    const triggerMutation = useMutation({
        mutationFn: () => triggerBuild(selectedJobId),
    });

    return (
        <div>
            <h2>CI (Private)</h2>

            <h3>Jobs</h3>
            {jobsQuery.isLoading ? <p>Loading jobs...</p> : null}
            {jobsQuery.isError ? (
                <p style={{ color: "crimson" }}>
                    Error: {jobsQuery.error instanceof Error ? jobsQuery.error.message : "Unknown error"}
                </p>
            ) : null}

            {jobsQuery.isSuccess ? (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <select
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                        disabled={jobs.length === 0}
                    >
                        {jobs.map((j) => (
                            <option key={j.name} value={j.name}>
                                {j.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => triggerMutation.mutate()}
                        disabled={!selectedJobId || triggerMutation.isPending}
                    >
                        {triggerMutation.isPending ? "Triggering..." : "Trigger build"}
                    </button>
                </div>
            ) : null}

            <div style={{ marginTop: 12 }}>
                {triggerMutation.isError ? (
                    <p style={{ color: "crimson" }}>
                        Error: {triggerMutation.error instanceof Error ? triggerMutation.error.message : "Unknown error"}
                    </p>
                ) : null}

                {triggerMutation.isSuccess ? (
                    <p>
                        Triggered: {triggerMutation.data.jobId} ({triggerMutation.data.status})
                    </p>
                ) : null}
            </div>
        </div>
    );
}
