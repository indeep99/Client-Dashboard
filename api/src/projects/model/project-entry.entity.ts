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

    @Column({nullable: true})
    objects: number;

    @Column({nullable: true})
    images: number;

    @Column({nullable: true})
    completion: number;

    @Column({nullable: true})
    billing: number;

    @ManyToOne(type => UserEntity, user => user.projectEntries)
    client: UserEntity;
}