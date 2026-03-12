import { Env } from "hono";

type HonoVariables = {}

type AppEnv = {
    Variables: HonoVariables;
} & Env;

export type { AppEnv };
