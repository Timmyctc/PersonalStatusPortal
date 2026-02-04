export type SystemStatus = {
    jenkins: "UP" | "DOWN";
    nas: "UP" | "DOWN";
    lastBuild: "SUCCESS" | "FAILURE" | "UNKNOWN";
};

export async function fetchStatus(): Promise<SystemStatus> {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    // flip to true to simulate an error
    const shouldFail = false;
    if (shouldFail) throw new Error("Status service unreachable");

    return {
        jenkins: "UP",
        nas: "UP",
        lastBuild: "SUCCESS",
    };
}
