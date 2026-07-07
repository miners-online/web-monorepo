import { useState, useEffect } from "react";

interface StatusBadgeProps {
    hostname: string;
}

export default function StatusBadge({ hostname }: StatusBadgeProps) {
    const [status, setStatus] = useState<'online' | 'offline'>('offline');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/status`);
                if (response.ok) {
                    const data = await response.json();

                    const online = data.servers[hostname]?.online;
                    setStatus(online ? 'online' : 'offline');
                }
            } catch (error) {
                console.error('Error fetching server status:', error);
            }
            setLoading(false);
        }
        checkStatus();
    }, [hostname]);

    if (loading) {
        return <span className="badge ms-2 fs-6 align-middle bg-secondary">Loading...</span>;
    }

    return (
        <span className={`badge ms-2 fs-6 align-middle ${status === 'online' ? 'bg-success' : 'bg-danger'}`}>
            {status === 'online' ? 'Online' : 'Offline'}
        </span>
    );
}
