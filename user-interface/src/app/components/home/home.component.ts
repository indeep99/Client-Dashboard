import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ProjectEntriesPageable } from 'src/app/model/project-entry.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  projectEntries$: Observable<ProjectEntriesPageable> = this.projectService.indexAll(1, 10);

  constructor(private projectService: ProjectService) { }

  onPaginateChange(event: PageEvent) {
    this.projectEntries$ = this.projectService.indexAll(event.pageIndex, event.pageSize);
  }

}
