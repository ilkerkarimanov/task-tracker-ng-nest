import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryColumn()
  public taskId: string;
  @Column()
  public taskName: string;
  @Column()
  public taskCreatedBy: string;
  @Column()
  public taskCreatedOn: Date;
  @Column()
  public taskDueDate: Date;
  @Column()
  public taskAssignedTo: string;
  @Column()
  public isCompleted: boolean;
  @Column()
  public isOverdue: boolean;
}
