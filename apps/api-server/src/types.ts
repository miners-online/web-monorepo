import { Env } from "hono";

type AppConfig = {
    // DATABASE_URL: string;
}

type AppVariables = {
    config: AppConfig;
}

type AppEnv = {
    Variables: AppVariables;
} & Env;

export type { AppEnv, AppConfig };
