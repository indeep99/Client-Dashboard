import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/models/user.interface';
import { ClientIsOwnerGuard } from '../guards/client-is-owner.guard';
import { ProjectEntry } from '../model/project-entry.interface';
import { ProjectService } from '../service/project.service';

export const PROJECT_URL = 'http://localhost:3000/api/project';

@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) {}

    // @Request() req
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() projectEntry: ProjectEntry): Observable<ProjectEntry> {
        // const user = req.user;
        // user ,
        return this.projectService.create(projectEntry)
    }

    // @Get()
    // findProjectEntries(@Query('userId') userId: number): Observable<ProjectEntry[]> {
    //     if(userId == null) {
    //         return this.projectService.findAll();
    //     } else {
    //         return this.projectService.findByUser(userId);
    //     }
    // }
    
    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        limit = limit > 100 ? 100 : limit;

        return this.projectService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: PROJECT_URL
        });
    }

    @Get('user/:user')
    indexByUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Param('user') userId: number
    ) {
        limit = limit > 100 ? 100 : limit;

        return this.projectService.paginateByUser({
            limit: Number(limit),
            page: Number(page),
            route: PROJECT_URL
        }, Number(userId));
    }
    
    @Get(':id')
    findOne(@Param('id') id: number): Observable<ProjectEntry> {
        return this.projectService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, ClientIsOwnerGuard)
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() projectEntry: ProjectEntry): Observable<ProjectEntry> {
        return this.projectService.updateOne(Number(id), projectEntry);
    }
    
    @UseGuards(JwtAuthGuard, ClientIsOwnerGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Observable<any> {
        return this.projectService.deleteOne(id);
    }
    
}
