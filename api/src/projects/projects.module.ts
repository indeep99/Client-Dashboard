import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProjectEntryEntity } from './model/project-entry.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectEntryEntity]),
        AuthModule,
        UserModule
    ]
})
export class ProjectsModule {}
