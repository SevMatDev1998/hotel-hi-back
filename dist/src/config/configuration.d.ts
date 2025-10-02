export declare const databaseConfig: (() => {
    url: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string | undefined;
}>;
export declare const jwtConfig: (() => {
    access: {
        secret: string;
        expiresIn: string;
    };
    refresh: {
        secret: string;
        expiresIn: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    access: {
        secret: string;
        expiresIn: string;
    };
    refresh: {
        secret: string;
        expiresIn: string;
    };
}>;
export declare const appConfig: (() => {
    port: number;
    environment: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    environment: string;
}>;
export declare const swaggerConfig: (() => {
    title: string;
    description: string;
    version: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    title: string;
    description: string;
    version: string;
}>;
