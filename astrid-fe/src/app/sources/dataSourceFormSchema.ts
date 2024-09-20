import { z } from "zod";

// PostgreSQL Schema
const postgresSchema = z.object({
    host: z.string().min(1, { message: "Host is required" }),
    port: z.string().min(1, { message: "Port is required" }),
    database: z.string().min(1, { message: "Database name is required" }),
    user: z.string().min(1, { message: "User is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    sslMode: z
        .enum([
            "disable",
            "allow",
            "prefer",
            "require",
            "verify-ca",
            "verify-full",
        ])
        .optional(),
});

// SeaweedFS Schema
const seaweedFSSchema = z.object({
    masterServerUrl: z
        .string()
        .min(1, { message: "Master Server URL is required" }),
    volumeServerUrl: z.string().nonempty("Volume Server URL is required"),
    accessKey: z.string().optional(),
    secretKey: z.string().optional(),
});

// MongoDB Schema
const mongoSchema = z.object({
    connectionUri: z.string().nonempty("Connection URI is required").optional(),
    host: z.string().nonempty("Host is required"),
    port: z.string().nonempty("Port is required"),
    database: z.string().nonempty("Database name is required"),
    user: z.string().nonempty("User is required"),
    password: z.string().nonempty("Password is required"),
    replicaSet: z.string().optional(),
    ssl: z.boolean().optional(),
});

// Main schema that allows only one of the three to be fully filled
const formSchema = z
    .object({
        postgres: postgresSchema.optional(),
        seaweedfs: seaweedFSSchema.optional(),
        mongodb: mongoSchema.optional(),
    })
    .refine(
        (data) =>
            // Ensure only one of the objects is fully filled
            Object.values(data).filter(
                (obj) => obj && Object.keys(obj).length > 0
            ).length === 1,
        {
            message:
                "You must fill out one of PostgreSQL, SeaweedFS, or MongoDB configurations.",
        }
    );

export { formSchema };
