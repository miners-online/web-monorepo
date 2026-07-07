import { useState, useEffect } from "react";

interface StatusProgressProps {
    hostname: string;
}

export default function ServerStatusProgress({ hostname }: StatusProgressProps) {
    const [status, setStatus] = useState<'online' | 'offline' | 'unavailable'>('unavailable');
    const [loading, setLoading] = useState(true);
    const [playerCount, setPlayerCount] = useState<{ current: number; max: number } | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/status`);
                if (response.ok) {
                    const data = await response.json();
                    const serverData = data.servers[hostname];

                    if (serverData?.online) {
                        setStatus('online');
                        setPlayerCount(serverData.players);
                    } else {
                        setStatus('offline');
                        setPlayerCount(null);
                    }
                } else {
                    setStatus('unavailable');
                    setPlayerCount(null);
                }
            } catch (error) {
                console.error('Error fetching server status:', error);
                setStatus('unavailable');
                setPlayerCount(null);
            }
            setLoading(false);
        }
        checkStatus();
    }, [hostname]);

    if (loading) {
        return <p className="mb-1">Checking server...<noscript>Enable JS to see server status</noscript></p>;
    }

    if (status === 'unavailable') {
        return <p className="mb-1">Server status unavailable</p>;
    }

    return (
        <div className="py-3 text-center">
            <p className="mb-1">{status === 'online' ? 'Server is online' : 'Server is offline'}</p>
            {status === 'online' && playerCount && (
                <>
                    <div
                        className="progress mb-1 mx-auto"
                        style={{ width: '30%' }}
                        data-progress-wrapper
                    >
                        <div
                            className="progress-bar"
                            role="progressbar"
                            data-progress-bar
                            style={{ width: `${(playerCount.current / playerCount.max) * 100}%` }}
                        ></div>
                    </div>

                    <p className="mb-1" data-player-count>
                        {playerCount.current} / {playerCount.max} online players
                    </p>
                </>
            )}
        </div>
    );
}
