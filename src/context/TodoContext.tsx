import React, { useReducer, createContext, useContext, Dispatch, ReactElement } from 'react';
import { IFilterOptions, ITodo, Priority, Status } from 'type';
import { Action } from './actions';

type TodosWithFilter = {
  todos: ITodo[];
  filters: IFilterOptions;
};

const initialTodosWithFilter: TodosWithFilter = {
  todos: [],
  filters: {
    status: [],
    priority: [],
    startDate: null,
    endDate: null,
    sortBy: '', // 정렬 기준 값
    order: '', // 'DESC' | 'ASC'
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

function todoWithFilterReducer(state: TodosWithFilter = initialTodosWithFilter, action: Action): TodosWithFilter {
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
    default:
      return state;
  }
}

type TodosAndDispatch = {
  todosWithFilters: TodosWithFilter;
  dispatch: todoDispatch;
};
const TodosAndDispatchContext = createContext<TodosAndDispatch | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(todoWithFilterReducer, initialTodosWithFilter);

  return <TodosAndDispatchContext.Provider value={{ todosWithFilters: state, dispatch }}>{children}</TodosAndDispatchContext.Provider>;
};

export const useTodoAndDispatchContext = (): TodosAndDispatch => {
  const context = useContext(TodosAndDispatchContext);
  if (!context) {
    throw new Error('Cannot find todoState in TodoProvider');
  }
  return context;
};
