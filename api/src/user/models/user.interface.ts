import { ProjectEntry } from "src/projects/model/project-entry.interface";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    projectEntries?: ProjectEntry[];
}

export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client'
}
