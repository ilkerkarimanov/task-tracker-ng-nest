import { Guid } from 'guid-typescript';

export class TaskModel {
  public taskId: Guid;
  public taskName: string;
  public taskCreatedBy: string;
  public taskCreatedOn: Date;
  public taskDueDate: Date;
  public taskAssignedTo: string;
  public isCompleted: boolean;
  public isOverdue: boolean;
}
