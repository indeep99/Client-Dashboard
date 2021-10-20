import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ProjectEntriesPageable } from 'src/app/model/project-entry.interface';

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
}
