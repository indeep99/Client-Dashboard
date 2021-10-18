import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable, switchMap, map } from "rxjs";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";
import { ProjectEntry } from "../model/project-entry.interface";
import { ProjectService } from "../service/project.service";

@Injectable()
export class ClientIsOwnerGuard implements CanActivate {

    constructor(private userService: UserService, private projectService: ProjectService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const projectEntryId: number = Number(params.id);
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            switchMap((user: User) => this.projectService.findOne(projectEntryId).pipe (
                map((projectEntry: ProjectEntry) => {
                    let hasPermission = false;

                    if(user.id === projectEntry.client.id) {
                        hasPermission = true;
                    }

                    return user && hasPermission;
                })
            ))
        )
    }
}