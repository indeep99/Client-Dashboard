import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user.interface';


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({type: 'enum', enum: UserRole, default: UserRole.CLIENT})
  role: UserRole;

  @Column()
  password: string;

  @BeforeInsert()
  emailTolowerCase() {
    this.email = this.email.toLowerCase();
  }
}
