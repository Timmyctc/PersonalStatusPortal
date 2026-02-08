export type SystemStatus = {
    jenkinsStatus: "UP" | "DOWN";
    nasStatus: "UP" | "DOWN";
    lastBuildStatus: "SUCCESS" | "FAILURE" | "UNKNOWN";
};

export async function fetchStatus(): Promise<SystemStatus> {
    const statusResponse = await fetch("http://localhost:8080/api/status");
    if (!statusResponse.ok) throw new Error(`HTTP ${statusResponse.status}`);
    return statusResponse.json();
}

