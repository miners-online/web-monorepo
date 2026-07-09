import { Env } from "hono";

type AppVariables = {
    // config: AppConfig;
}

type AppEnv = {
    Variables: AppVariables;
} & Env;

export type { AppEnv };
