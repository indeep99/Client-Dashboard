import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable, switchMap } from 'rxjs';
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

    // user: User, 
    create(projectEntry: ProjectEntry): Observable<ProjectEntry> {
        // projectEntry.client = user;
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
        return from(this.projectRepository.findOne({id}, {relations: ['client']}));
    }

    updateOne(id: number, projectEntry: ProjectEntry): Observable<ProjectEntry> {
        return from(this.projectRepository.update(id, projectEntry)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.projectRepository.delete(id));
    }

    paginateAll(options: IPaginationOptions) : Observable<Pagination<ProjectEntry>> {
        return from(paginate<ProjectEntry>(this.projectRepository, options, {
            relations: ['client']
        })).pipe(
            map((projectEntries: Pagination<ProjectEntry>) => projectEntries)
        )
    }

    paginateByUser (options: IPaginationOptions, userId: number) : Observable<Pagination<ProjectEntry>> {
        return from(paginate<ProjectEntry>(this.projectRepository, options, {
            relations: ['client'],
            where: [
                {client: userId}
            ]
        })).pipe(
            map((projectEntries: Pagination<ProjectEntry>) => projectEntries)
        )
    }
}   
