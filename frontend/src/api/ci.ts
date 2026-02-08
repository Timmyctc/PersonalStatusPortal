export type BuildResult = {
    buildId: string;
    status: "QUEUED" | "RUNNING" | "COMPLETED" | "ABORTED"
};

export async function triggerBuild(): Promise<BuildResult> {
    await new Promise((r) => setTimeout(r, 600));
    return {
        buildId: crypto.randomUUID(),
        status: "QUEUED",
    };
}
