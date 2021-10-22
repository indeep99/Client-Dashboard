import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectEntriesPageable, ProjectEntry } from 'src/app/model/project-entry.interface';


export interface ProjectData {
  items: ProjectEntry[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  indexAll(page: number, limit: number): Observable<ProjectEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(limit));

    return this.http.get<ProjectEntriesPageable>('/api/project', {params});
  }

  post(projectEntry: ProjectEntry): Observable<ProjectEntry> {
    console.log('in')
    return this.http.post<ProjectEntry>('/api/project/', projectEntry);
  }

  findOne(id: number): Observable<ProjectEntry> {
    return this.http.get<ProjectEntry>('/api/project/' + id);
  }

  findByUser(id: number): Observable<ProjectData> {
    return this.http.get('/api/project/user/' + id).pipe(
      map((projectData: any) => projectData)
    )
  }

  indexByUser(userId: number, page: number, limit: number): Observable<ProjectEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<ProjectEntriesPageable>('/api/project/user/' + String(userId), {params});
  }
}
