import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';
import { formatDate } from '@angular/common';
import { TaskApiService } from 'src/app/api/task-api.service';
import { TaskEditModel } from 'src/app/models/task-edit.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({
    taskName: new FormControl(
      '', [
      Validators.required,
      Validators.minLength(3)
    ]),
    taskDueDate: new FormControl(
      '',
      [Validators.required]
    ),
    taskAssignedTo: new FormControl(
      '', [
      Validators.required,
      Validators.email
    ]),
  });

  taskIdSubject = new Subject<Guid>();
  taskId: Guid = Guid.createEmpty();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private taskApiService: TaskApiService
  ) {}

  ngOnInit(): void {
    this.taskIdSubject.subscribe(async (val) => {
      this.taskId = val;
      var allTasks = await this.taskApiService.listTasks();
      var editTask = allTasks.find((task) => {
        return task.taskId?.equals(this.taskId);
      });

      if (editTask) {
        const initialTask: TaskEditModel = {
          taskId: editTask.taskId,
          taskName: editTask.taskName,
          taskDueDate: editTask.taskDueDate,
          taskAssignedTo: editTask.taskAssignedTo,
        };
        this.loadForm(initialTask);
      }
    });

    this.route.params.subscribe((params: Params) => {
      const taskId = Guid.parse(params['taskId']);
      this.taskIdSubject.next(taskId);
    });
  }

  loadForm(taskData: TaskEditModel) {
    this.taskForm.setValue(
      {
        taskName: taskData.taskName,
        taskDueDate: formatDate(taskData.taskDueDate as Date, 'yyyy-MM-dd', 'en'),
        taskAssignedTo: taskData.taskAssignedTo
      }
    );
  }

  back(): void {
    this.location.back();
  }

  async onSubmit() {
    console.warn(this.taskForm.value);
    const editData: TaskEditModel = {
      taskId: this.taskId,
      taskName: this.taskForm.value.taskName,
      taskAssignedTo: this.taskForm.value.taskAssignedTo,
      taskDueDate: this.taskForm.value.taskDueDate
    }

    await this.taskApiService.editTask(editData);
    this.back();
  }
}
