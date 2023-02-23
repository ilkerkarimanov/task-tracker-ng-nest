import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { ActivatedRoute, Params} from '@angular/router';
import { Subject } from "rxjs";
import { TaskFilterState } from '../../states/taskfilterstate';
import { TaskApiService } from '../../api/task-api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasksCreatedBySubject = new Subject<[TaskFilterState, string]>();
  tasks: TaskModel[] | undefined;
  tasksUserName: string | undefined;
  filterMode: TaskFilterState | undefined;

  constructor(
    private taskApiService: TaskApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tasksCreatedBySubject.subscribe((val) => {
      this.filterMode = val[0];
      this.tasksUserName = val[1];
      this.loadTasks();
    });

    this.route.params.subscribe((params: Params) =>
    {
      const tasksUserName = params['tasksUserName'];
      const taskMode = params['filterMode'] as TaskFilterState;
      this.tasksCreatedBySubject.next([taskMode, tasksUserName])
    });
  }

  async loadTasks(){
    const allTask = await this.taskApiService.listTasks();

    if(this.isCreationMode()){
      this.tasks = allTask.filter((task) => { return task.taskCreatedBy === this.tasksUserName});
    }

    if(this.isAssignmentMode()){
      this.tasks = allTask.filter((task) => { return task.taskAssignedTo === this.tasksUserName});
    }
  }

  isCreationMode(){
    return this.filterMode === TaskFilterState.Creation;
  }

  isAssignmentMode(){
    return this.filterMode === TaskFilterState.Assignment;
  }
}
