export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED,
}

export type numRange = 1 | 2 | 3 | 4;

export interface ITodo {
  readonly id: number;
  task: string;
  priority?: numRange;
  status: Status;
  deadLine: string;
  createdAt: string;
  updatedAt?: string;
}
