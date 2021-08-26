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
  readonly id: number;
  task: string;
  priority: Priority;
  status: Status;
  deadLine: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEditTodo {
  id: number;
  task?: string;
  priority?: Priority;
  status?: Status;
  deadLine?: Date;
}

export type OrderType = '' | 'DESC' | 'ASC';

export interface IFilterOptions {
  status: Status[]; // [Status.NOT_STARTED, Status.IN_PROGRESS, Status.FINISHED]
  priority: Priority[]; // [Priority.LOW, Priority.MEDIUM, Priority.HIGH]
  startDate: Date | null;
  endDate: Date | null;
}

export type SortOptions = {
  sortBy: null | string;
  order: OrderType;
};

//Date는 deadLine 기준으로 비교
