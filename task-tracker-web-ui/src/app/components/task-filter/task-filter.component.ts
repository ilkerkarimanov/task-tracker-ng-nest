import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskFilterState } from '../../states/taskfilterstate';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {
  TaskFilterState = TaskFilterState;
  tasksUserName: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  btnFilterClick(filterMode: TaskFilterState) {
    this.router.navigate(["filterTasks", filterMode, this.tasksUserName]);
  };
}
