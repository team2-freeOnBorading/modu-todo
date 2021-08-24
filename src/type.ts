export enum Status {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface ITodo {
  readonly id: number;
  task: string;
  priority: Priority;
  status: Status;
  deadLine?: string;
  createdAt: string;
  updatedAt?: string;
}
