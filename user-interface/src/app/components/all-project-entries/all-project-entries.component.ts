import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectEntriesPageable } from 'src/app/model/project-entry.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-all-project-entries',
  templateUrl: './all-project-entries.component.html',
  styleUrls: ['./all-project-entries.component.scss']
})

// implements OnInit
export class AllProjectEntriesComponent  {

  @Input() projectEntries!: ProjectEntriesPageable;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  // dataSource: Observable<ProjectEntriesPageable> = this.projectService.indexAll(1, 10);
  pageEvent!: PageEvent;

  // private projectService: ProjectService
  constructor(private router: Router) { }

  // ngOnInit(): void {
  //   this.dataSource.subscribe();
  // }

  onPaginateChange(event: PageEvent) {
    // let page = event.pageIndex;
    event.pageIndex = event.pageIndex + 1;
    // let limit = event.pageSize;

    // page = page + 1;
    this.paginate.emit(event);

    // this.dataSource = this.projectService.indexAll(page, limit);
  }


  navigate(id: any) {
    this.router.navigateByUrl('project/' + id);
  }
}
