import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProjectEntriesPageable, ProjectEntry } from 'src/app/model/project-entry.interface';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { ProjectData, ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  dataSource: ProjectData = null!;
  columnsToDisplay: string[] =['pname', 'type', 'objects', 'images', 'completion', 'billing'];

  constructor(
    private authService: AuthenticationService,
    private projectService: ProjectService
  ) { }
  
  initDataSource() {
    this.authService.getUserId().pipe(
      switchMap((id: number) => this.projectService.findByUser(id).pipe(
        map((projectData: ProjectData) => (this.dataSource = projectData))
      ))
    ).subscribe();
  }

  ngOnInit(): void {
    this.initDataSource();
  }

}
