import { LargeNumberLike } from "crypto";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('project_entry')
export class ProjectEntryEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    pname: string;

    @Column()
    type: string;

    @Column()
    objects: number;

    @Column()
    images: number;

    @Column()
    completion: number;

    @Column()
    billing: number;

    @ManyToOne(type => UserEntity, user => user.projectEntries)
    client: UserEntity;
}