import { useQuery } from "@tanstack/react-query";
import { fetchStatus } from "../api/status";

export default function StatusPanel() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["systemStatus"],
        queryFn: fetchStatus,
    });

    if (isLoading) return <p>Loading status...</p>;
    if (error instanceof Error)
        return <p style={{ color: "crimson" }}>Error: {error.message}</p>;
    if (!data) return <p>No status available.</p>;

    return (
        <div>
            <h3>System Status</h3>
            <ul>
                <li>Jenkins: {data.jenkins}</li>
                <li>NAS: {data.nas}</li>
                <li>Last build: {data.lastBuild}</li>
            </ul>
        </div>
    );
}
