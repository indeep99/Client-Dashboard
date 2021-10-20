import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ProjectEntriesPageable } from 'src/app/model/project-entry.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-all-project-entries',
  templateUrl: './all-project-entries.component.html',
  styleUrls: ['./all-project-entries.component.scss']
})
export class AllProjectEntriesComponent implements OnInit {

  dataSource: Observable<ProjectEntriesPageable> = this.projectService.indexAll(1, 10);
  pageEvent!: PageEvent;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let limit = event.pageSize;

    page = page + 1;

    this.dataSource = this.projectService.indexAll(page, limit);
  }

}
