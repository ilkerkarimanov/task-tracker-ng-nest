import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './tasks/task.controller';
import { TaskCatalogService } from './tasks/task-catalog.service';
import { TaskCreationFactory } from './tasks/task-creation-factory.service';
import { TaskEditFactory } from './tasks/task-edit-factory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/models/task.entity';
import { AppConfigModule } from './app-config-module/app-config.module';
import { AppConfigService } from './app-config-module/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: AppConfigService) => {
        console.log('useFactory');
        return {
          type: 'mysql',
          host: configService.getConfig().databaseHost,
          port: configService.getConfig().databasePort,
          username: configService.getConfig().databaseUsr,
          password: configService.getConfig().databasePwd,
          database: configService.getConfig().databaseName,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      imports: [AppConfigModule],
      inject: [AppConfigService],
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [AppController, TaskController],
  providers: [
    AppService,
    TaskCatalogService,
    TaskCreationFactory,
    TaskEditFactory,
  ],
})
export class AppModule {}
