import { Injectable } from '@nestjs/common';
import { TaskModel } from './models/task.model';
import { Guid } from 'guid-typescript';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './models/task.entity';

@Injectable()
export class TaskCatalogService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {
    const date = new Date();
    date.setDate(date.getDate() + 5);

    this.tasksRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({
        taskId: Guid.parse('32bdb931-81b5-4ba8-9666-33a3b12184c6').toString(),
        taskName: 'Task 1',
        taskCreatedBy: 'ilker.karimanov@hotmail.com',
        taskCreatedOn: new Date(),
        taskDueDate: date,
        taskAssignedTo: 'ilker.karimanov@hotmail.com',
        isCompleted: false,
        isOverdue: false,
      })
      .orIgnore()
      .execute();

    this.tasksRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({
        taskId: Guid.parse('4d869c5a-80b9-4f58-9e03-108040a332ce').toString(),
        taskName: 'Task 2',
        taskCreatedBy: 'demouser@microsoft.com',
        taskCreatedOn: new Date(),
        taskDueDate: date,
        taskAssignedTo: 'ilker.karimanov@hotmail.com',
        isCompleted: false,
        isOverdue: false,
      })
      .orIgnore()
      .execute();

    this.tasksRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values({
        taskId: Guid.parse('1d8b2c20-fbc2-4b1b-9a8e-f868d04587bd').toString(),
        taskName: 'Task 3',
        taskCreatedBy: 'ilker.karimanov@hotmail.com',
        taskCreatedOn: new Date(),
        taskDueDate: date,
        taskAssignedTo: 'ilker.karimanov@hotmail.com',
        isCompleted: false,
        isOverdue: false,
      })
      .orIgnore()
      .execute();
  }

  public async listTasks(): Promise<TaskModel[]> {
    const result = await this.tasksRepository.find();
    const model = result.map((data) => {
      return {
        taskId: Guid.parse(data.taskId),
        taskName: data.taskName,
        taskCreatedBy: data.taskCreatedBy,
        taskCreatedOn: data.taskCreatedOn,
        taskDueDate: data.taskDueDate,
        taskAssignedTo: data.taskAssignedTo,
        isCompleted: data.isCompleted,
        isOverdue: data.isOverdue,
      };
    });
    return Promise.resolve(model);
  }

  public add(task: TaskModel) {
    this.tasksRepository.save({
      taskId: task.taskId.toString(),
      taskName: task.taskName,
      taskCreatedBy: task.taskCreatedBy,
      taskCreatedOn: task.taskCreatedOn,
      taskDueDate: task.taskDueDate,
      taskAssignedTo: task.taskAssignedTo,
      isCompleted: task.isCompleted,
      isOverdue: task.isOverdue,
    });
  }

  public edit(task: TaskModel) {
    this.tasksRepository.save({
      taskId: task.taskId.toString(),
      taskName: task.taskName,
      taskCreatedBy: task.taskCreatedBy,
      taskCreatedOn: task.taskCreatedOn,
      taskDueDate: task.taskDueDate,
      taskAssignedTo: task.taskAssignedTo,
      isCompleted: task.isCompleted,
      isOverdue: task.isOverdue,
    });
  }
}
