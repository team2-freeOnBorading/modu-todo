import React, { useReducer, createContext, useContext, Dispatch, ReactElement } from 'react';
import { IFilterOptions, ITodo, SortOptions, Priority, Status, OrderType } from 'type';
import { Action } from './actions';

type TodosWithFilterAndSort = {
  todos: ITodo[];
  filters: IFilterOptions;
  sort: SortOptions;
};

const initialState: TodosWithFilterAndSort = {
  todos: [],
  filters: {
    status: [],
    priority: [],
    startDate: null,
    endDate: null,
  },
  sort: {
    sortBy: null,
    order: 'ASC',
  },
};

export type CreateTodoType = {
  task: string;
  priority: Priority;
  status: Status;
  deadLine: Date;
  createdAt: Date;
};

type todoDispatch = Dispatch<Action>;

function todoWithFilterReducer(state: TodosWithFilterAndSort = initialState, action: Action): TodosWithFilterAndSort {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.todos };
    case 'CREATE': {
      const nextId = state.todos.length ? Math.max(...state.todos.map((todo) => todo.id)) + 1 : 1;
      const updatedTodos = state.todos.concat({
        ...action.todo,
        id: nextId,
        updatedAt: action.todo.createdAt,
      });
      return { ...state, todos: updatedTodos };
    }
    case 'REMOVE': {
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: updatedTodos };
    }
    case 'EDIT': {
      const updatedTodos = state.todos.map((todo) => (todo.id === action.editTodo.id ? { ...todo, ...action.editTodo, updatedAt: new Date() } : todo));
      return { ...state, todos: updatedTodos };
    }
    case 'FILTER': {
      const updatedFilters = Object.assign({}, { ...state.filters, ...action.filters });
      return { ...state, filters: updatedFilters };
    }
    case 'SORT': {
      const updatedSort = Object.assign({}, { ...state, ...action.sort });
      return { ...state, sort: updatedSort };
    }
    default:
      return state;
  }
}

type TodosAndDispatch = {
  TodosWithFilterAndSort: TodosWithFilterAndSort;
  dispatch: todoDispatch;
};
const TodosAndDispatchContext = createContext<TodosAndDispatch | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(todoWithFilterReducer, initialState);
  const { todos, filters, sort } = state;
  const { startDate, endDate } = filters;
  const { sortBy, order } = sort;

  let modifiedTodos: ITodo[] = todos;

  // TODO: priroiry filter
  if (filters.priority.length > 1) {
    modifiedTodos = todos?.filter((todo) => filters.priority.includes(todo.priority));
  }

  // TODO: Date filter
  const startDateFilter = (start: Date | null, target: Date) => {
    return start ? target >= start : true;
  };

  const endDateFilter = (end: Date | null, target: Date) => {
    return end ? target <= end : true;
  };
  if (startDate || endDate) {
    modifiedTodos = todos.filter((todo) => startDateFilter(startDate, todo.deadLine) && endDateFilter(endDate, todo.deadLine));
  }

  // TODO: sort Date
  const sortDate = (prev: Date, next: Date, order: OrderType): number =>
    order === 'ASC' ? prev.valueOf() - next.valueOf() : -(prev.valueOf() - next.valueOf());
  if (sortBy === 'deadLine') {
    modifiedTodos = todos.sort((prev, next) => sortDate(prev.deadLine, next.deadLine, order));
  }

  //수정일
  if (sortBy === 'updatedDate') {
    modifiedTodos = todos.sort((prev, next) => sortDate(prev.deadLine, next.deadLine, order));
  }

  // TODO: sort Priority
  const convertPriority = (target: Priority): number => {
    switch (target) {
      case 'LOW':
        return 0;
      case 'MEDIUM':
        return 1;
      case 'HIGH':
        return 2;
      default:
        return 0;
    }
  };

  const prioritySort = (prev: Priority, next: Priority, order: OrderType): number => {
    const convertedPrev: number = convertPriority(prev);
    const convertedNext: number = convertPriority(next);
    return order === 'ASC' ? convertedPrev - convertedNext : -(convertedPrev - convertedNext);
  };

  if (sortBy === 'priority') {
    modifiedTodos = todos.sort((prev, next) => prioritySort(prev.priority, next.priority, order));
  }

  return (
    <TodosAndDispatchContext.Provider value={{ TodosWithFilterAndSort: { ...state, todos: modifiedTodos }, dispatch }}>
      {children}
    </TodosAndDispatchContext.Provider>
  );
};

export const useTodoAndDispatchContext = (): TodosAndDispatch => {
  const context = useContext(TodosAndDispatchContext);
  if (!context) {
    throw new Error('Cannot find todoState in TodoProvider');
  }
  return context;
};
