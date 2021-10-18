import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ClientIsOwnerGuard } from '../guards/client-is-owner.guard';
import { ProjectEntry } from '../model/project-entry.interface';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() projectEntry: ProjectEntry, @Request() req): Observable<ProjectEntry> {
        const user = req.user;
        return this.projectService.create(user, projectEntry)
    }

    @Get()
    findProjectEntries(@Query('userId') userId: number): Observable<ProjectEntry[]> {
        if(userId == null) {
            return this.projectService.findAll();
        } else {
            return this.projectService.findByUser(userId);
        }
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
