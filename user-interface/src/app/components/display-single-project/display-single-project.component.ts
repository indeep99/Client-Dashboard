import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProjectEntry } from 'src/app/model/project-entry.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-display-single-project',
  templateUrl: './display-single-project.component.html',
  styleUrls: ['./display-single-project.component.scss']
})
export class DisplaySingleProjectComponent implements OnInit {

  projectEntry$: Observable<ProjectEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params ) => {
      const projectEntryId: number = parseInt(params['id']);

      return this.projectService.findOne(projectEntryId).pipe(
        map((projectEntry: ProjectEntry) => projectEntry)
      )
    })
  )

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
