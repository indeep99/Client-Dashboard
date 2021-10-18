import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { ProjectEntryEntity } from '../model/project-entry.entity';
import { ProjectEntry } from '../model/project-entry.interface';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntryEntity) private readonly projectRepository: Repository<ProjectEntryEntity>,
        private userService: UserService
    ) {}

    create(user: User, projectEntry: ProjectEntry): Observable<ProjectEntry> {
        projectEntry.client = user;
        return from(this.projectRepository.save(projectEntry));
    }

    findAll(): Observable<ProjectEntry[]> {
        return from(this.projectRepository.find({relations: ['client']}));
    }

    findByUser(userId: number): Observable<ProjectEntry[]> {
        return from(this.projectRepository.find({
            where: {
                client: userId
            },
            relations: ['client']
        })).pipe(map((projectEntries: ProjectEntry[]) => projectEntries))
    }

    findOne(id: number): Observable<ProjectEntry> {
        return from(this.projectRepository.findOne({id}, {relations: ['author']}));
    }
}   
