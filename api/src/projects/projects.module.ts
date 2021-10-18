import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProjectEntryEntity } from './model/project-entry.entity';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectEntryEntity]),
        AuthModule,
        UserModule
    ],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectsModule {}
