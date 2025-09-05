declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            DATABASE_URL: string;
            SECRET_KEY: string;
            REFRESH_TOKEN_SECRET: string;
            // Add any other environment variables you use
            // For example:
            // DB_HOST: string;
            // AWS_ACCESS_KEY_ID: string;
        }
    }
}

export {}; // This line is necessary to make the file a module