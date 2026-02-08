import { useMutation } from "@tanstack/react-query";
import { triggerBuild } from "../api/ci";

export default function Ci() {
    const triggerBuildMutation = useMutation({
        mutationFn: triggerBuild,
    });

    return (
        <div>
            <h2>CI (Private)</h2>

            <button
                onClick={() => triggerBuildMutation.mutate()}
                disabled={triggerBuildMutation.isPending}
            >
                {triggerBuildMutation.isPending ? "Triggering..." : "Trigger build"}
            </button>

            {triggerBuildMutation.isError ? (
                <p style={{ color: "crimson" }}>
                    Error: {triggerBuildMutation.error instanceof Error ? triggerBuildMutation.error.message : "Unknown error"}
                </p>
            ) : null}

            {triggerBuildMutation.isSuccess ? (
                <p>
                    Build {triggerBuildMutation.data.buildId} is {triggerBuildMutation.data.status}
                </p>
            ) : null}
        </div>
    );
}
