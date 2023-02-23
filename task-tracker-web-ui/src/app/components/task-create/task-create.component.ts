import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskApiService } from 'src/app/api/task-api.service';
import { TaskCreateModel } from 'src/app/models/task-create.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  taskForm = new FormGroup({
    taskName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    taskDueDate: new FormControl('', [
      Validators.required
    ]),
    taskAssignedTo: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(
    private location: Location,
    private taskApiService: TaskApiService
  ) { }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back()
  }

  async onSubmit() {
    console.warn(this.taskForm.value);
    const data: TaskCreateModel = {
      taskName: this.taskForm.value.taskName,
      taskAssignedTo: this.taskForm.value.taskAssignedTo,
      taskDueDate: this.taskForm.value.taskDueDate
    }
    await this.taskApiService.addTask(data);
    this.back();
  }
}
