export enum Status {
  NOT_STARTED = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'DONE',
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface ITodo {
  readonly id?: number;
  task?: string;
  priority?: Priority;
  status?: Status;
  deadLine?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
