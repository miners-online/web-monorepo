import { useEffect, useState } from "react";

type RoleResponse = {
    role: string;
};

export default function GameProfilePage() {
    const [role, setRole] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("useEffect called");

        const load = async () => {
            try {
                const roleResponse = await fetch("/api/me/role");

                if (!roleResponse.ok) {
                    throw new Error("Failed to fetch role data");
                }

                const roleData = (await roleResponse.json()) as RoleResponse;
                setRole(roleData.role);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };

        void load();
    }, []);

    return (
        <div>
            <h1 className="cl-headerTitle">Game Profile</h1>
            <p>This is my custom profile page.</p>
            {error ? <p>{error}</p> : <p>My role is: {role ?? "Loading..."}</p>}
        </div>
    );
}