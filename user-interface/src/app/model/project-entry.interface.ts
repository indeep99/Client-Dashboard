import { User } from "./user.interface";

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

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface ProjectEntriesPageable {
    items: ProjectEntry[];
    meta: Meta;
    links: Links;
}