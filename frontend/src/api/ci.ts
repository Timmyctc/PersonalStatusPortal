export type BuildResult = {
    buildId: string;
    status: "QUEUED" | "RUNNING" | "COMPLETED" | "ABORTED"
};

export async function triggerBuild(): Promise<BuildResult> {
   const response = await fetch("http://localhost:8080/api/ci", {
       method: "POST",
   });

   if(!response.ok) throw new Error(`HTTP ${response.status}`);
   return response.json();
}
