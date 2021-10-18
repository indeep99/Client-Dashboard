import { User } from "src/user/models/user.interface";

export interface ProjectEntry {
    id?: number;
    pname?: string;
    type?: string;
    objects?: number;
    images?: number;
    completion?: number;
    billing?: number;
    client: User;
}