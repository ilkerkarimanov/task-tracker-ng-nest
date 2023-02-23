import { Injectable } from '@angular/core';
import axios from 'axios';
import { TaskModel } from '../models/task.model';
import { TaskCreateModel } from '../models/task-create.model';
import { TaskEditModel } from '../models/task-edit.model';
import { TaskApiMapper } from '../services/task-api-mapper.service';
import { AppConfigService } from '../services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(
    private taskApiMapper: TaskApiMapper,
    private appConfigService: AppConfigService
  ) {}
  private axiosConfig = {
    headers: {
      'dapr-app-id': this.appConfigService.getConfig().daprAppId,
    },
  };

  public async listTasks(): Promise<TaskModel[]> {
    try {
      const res = await axios.get<any[]>(
        `${this.appConfigService.getConfig().defaultApiUrl}/task`,
        this.axiosConfig
      );

      return Promise.resolve(this.taskApiMapper.createTaskResponse(res.data));
    } catch (error) {
      console.log('Error:', error);
      return Promise.resolve([]);
    }
  }

  public async addTask(task: TaskCreateModel): Promise<void> {
    try {
      await axios.post(
        `${this.appConfigService.getConfig().defaultApiUrl}/task`,
        this.taskApiMapper.createAddTaskRequest(task),
        this.axiosConfig
      );
      return Promise.resolve();
    } catch (error) {
      console.log('Error:', error);
      return Promise.resolve();
    }
  }

  public async editTask(task: TaskEditModel): Promise<void> {
    try {
      await axios.put(
        `${this.appConfigService.getConfig().defaultApiUrl}/task`,
        this.taskApiMapper.createEditTaskRequest(task),
        this.axiosConfig
      );
      return Promise.resolve();
    } catch (error) {
      console.log('Error:', error);
      return Promise.resolve();
    }
  }
}
