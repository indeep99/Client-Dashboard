import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProjectEntriesPageable } from 'src/app/model/project-entry.interface';
import { User } from 'src/app/model/user.interface';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
// implements OnInit, OnDestroy 
export class ClientProfileComponent{

  // userId: number = null!;
  // private sub!: Subscription;
  // user: User = null!;

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  )

  projectEntries$: Observable<ProjectEntriesPageable> = this.userId$.pipe(
    switchMap((userId: number) => this.projectService.indexByUser(userId, 1, 10))
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService
  ) { }


  onPaginateChange(event: PageEvent) {
    return this.userId$.pipe(
      tap((userId: number) => this.projectEntries$ = this.projectService.indexByUser(userId, event.pageIndex, event.pageSize))
    ).subscribe()
  }
  // ngOnInit(): void {
  //   this.sub = this.activatedRoute.params.subscribe(params => {
  //     this.userId = parseInt(params['id']);
  //     this.userService.findOne(this.userId).pipe(
  //       map((user: User) => this.user = user)
  //     ).subscribe()
  //   })
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }
}
