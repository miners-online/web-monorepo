import { Env } from "hono";

type HonoVariables = {
    user_id?: string;
}

type AppEnv = {
    Variables: HonoVariables;
} & Env;

export type { AppEnv };