import React, { useReducer, createContext, useContext, Dispatch, ReactElement } from 'react';
import { ITodo, Priority, Status, IEditTodo } from 'type';

const initialTodos: ITodo[] = [];

export type CreateTodoType = {
  task: string;
  priority: Priority;
  status: Status;
  deadLine: Date;
  createdAt: Date;
};

type Action =
  | { type: 'LOAD_TODOS'; todos: ITodo[] }
  | { type: 'CREATE'; todo: CreateTodoType }
  | { type: 'REMOVE'; id: number }
  | { type: 'EDIT'; editTodo: IEditTodo }
  | { type: 'CHANGE'; id: number };

type todoDispatch = Dispatch<Action>;

function todoReducer(state: ITodo[] = initialTodos, action: Action): ITodo[] {
  switch (action.type) {
    case 'LOAD_TODOS':
      return state.concat(action.todos);
    case 'CREATE':
      const nextId = state.length ? Math.max(...state.map((todo) => todo.id)) + 1 : 1;
      return state.concat({
        ...action.todo,
        id: nextId,
        updatedAt: action.todo.createdAt,
      });
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

const TodoStateContext = createContext<ITodo[]>([]);
const TodoDispatchContext = createContext<todoDispatch | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = (): ITodo[] => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};

export const useTodoDispatch = (): todoDispatch => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};
