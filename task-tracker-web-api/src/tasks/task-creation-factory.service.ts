import { Injectable } from '@nestjs/common';
import { TaskCreateModel } from './models/task-create.model';
import { TaskModel } from './models/task.model';
import { Guid } from 'guid-typescript';

@Injectable()
export class TaskCreationFactory {
  public create(taskInput: TaskCreateModel): TaskModel {
    const taskOutput: TaskModel = {
      taskId: Guid.create(),
      taskName: taskInput.taskName,
      taskCreatedBy: 'ilker.karimanov@hotmail.com',
      taskCreatedOn: new Date(),
      taskDueDate: taskInput.taskDueDate,
      taskAssignedTo: taskInput.taskAssignedTo,
      isCompleted: false,
      isOverdue: false,
    };

    return taskOutput;
  }
}
