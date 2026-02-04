import { useEffect, useState } from "react";
import { fetchStatus, type SystemStatus } from "../api/status";

export default function StatusPanel() {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchStatus();
                if (!cancelled) setStatus(data);
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) return <p>Loading status...</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!status) return <p>No status available.</p>;

    return (
        <div>
            <h3>System Status</h3>
            <ul>
                <li>Jenkins: {status.jenkins}</li>
                <li>NAS: {status.nas}</li>
                <li>Last build: {status.lastBuild}</li>
            </ul>
        </div>
    );
}
