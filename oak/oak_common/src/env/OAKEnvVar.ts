interface OAKEnvVar {

    clientId: string;

    clientSecret: string;

    // channelCode: string;
}

export const oakEnv: OAKEnvVar = (process.env.OAK || {}) as OAKEnvVar;