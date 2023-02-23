import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { TaskCreateModel } from './models/task-create.model';
import { TaskEditModel } from './models/task-edit.model';
import { TaskModel } from './models/task.model';
import { TaskCatalogService } from './task-catalog.service';
import { TaskCreationFactory } from './task-creation-factory.service';
import { TaskEditFactory } from './task-edit-factory.service';

@Controller('api/task')
export class TaskController {
  constructor(
    private taskCatalogService: TaskCatalogService,
    private taskCreationFactory: TaskCreationFactory,
    private taskEditFactory: TaskEditFactory,
  ) {}
  @Post()
  async add(@Body() createTaskDto: TaskCreateModel) {
    const newTask = this.taskCreationFactory.create(createTaskDto);
    this.taskCatalogService.add(newTask);
  }
  @Put()
  async edit(@Body() editTaskDto: TaskEditModel) {
    const tasks = await this.taskCatalogService.listTasks();
    const foundTask = tasks.find((task) => {
      return task.taskId.toString() == editTaskDto.taskId;
    });
    const editTask = this.taskEditFactory.create(editTaskDto, foundTask);
    this.taskCatalogService.edit(editTask);
  }

  @Get()
  async listTasks(): Promise<TaskModel[]> {
    return await this.taskCatalogService.listTasks();
  }
}
