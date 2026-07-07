import { Env } from "hono";

type AppConfig = {
    // DATABASE_URL: string;
    getUser(): Promise<{
        userId: string | null;
        isAuthenticated: boolean;
    }>
}

type AppVariables = {
    config: AppConfig;
}

type AppEnv = {
    Variables: AppVariables;
} & Env;

export type { AppEnv, AppConfig };
