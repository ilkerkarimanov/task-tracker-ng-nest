import { Injectable } from '@nestjs/common';
import { TaskEditModel } from './models/task-edit.model';
import { TaskModel } from './models/task.model';

@Injectable()
export class TaskEditFactory {
  public create(taskInput: TaskEditModel, editTask: TaskModel): TaskModel {
    const taskOutput: TaskModel = {
      taskId: editTask.taskId,
      taskName: taskInput.taskName,
      taskCreatedBy: editTask.taskCreatedBy,
      taskCreatedOn: editTask.taskCreatedOn,
      taskDueDate: taskInput.taskDueDate,
      taskAssignedTo: taskInput.taskAssignedTo,
      isCompleted: editTask.isCompleted,
      isOverdue: editTask.isOverdue,
    };

    return taskOutput;
  }
}
