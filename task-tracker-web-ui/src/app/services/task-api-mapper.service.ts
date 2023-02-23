import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { TaskCreateModel } from '../models/task-create.model';
import { TaskEditModel } from '../models/task-edit.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class TaskApiMapper {
  constructor() {}
  public createTaskResponse(resp: any[] ): TaskModel[] {
    return resp.map((data: any) => {
        const task : TaskModel = {
          taskId: Guid.parse(data.taskId.value),
          taskName: data.taskName,
          taskAssignedTo: data.taskAssignedTo,
          taskDueDate: new Date(data.taskDueDate),
          taskCreatedBy: data.taskCreatedBy,
          taskCreatedOn: new Date(data.taskCreatedOn),
          isCompleted: data.isCompleted,
          isOverdue: data.isOverdue
        }
      return task;
      });
  }

  public createAddTaskRequest(task: TaskCreateModel): any {
    return {
      taskName: task.taskName,
      taskDueDate: task.taskDueDate,
      taskAssignedTo: task.taskAssignedTo
    };
  }

  public createEditTaskRequest(task: TaskEditModel) : any {
    return  {
      taskId: task.taskId?.toString(),
      taskName: task.taskName,
      taskDueDate: task.taskDueDate,
      taskAssignedTo: task.taskAssignedTo
    };
  }
}
