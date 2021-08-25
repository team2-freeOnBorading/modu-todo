import { IEditTodo, ITodo } from 'type';
import { CreateTodoType } from './TodoContext';

export type Action =
  | { type: 'LOAD_TODOS'; todos: ITodo[] }
  | { type: 'CREATE'; todo: CreateTodoType }
  | { type: 'REMOVE'; id: number }
  | { type: 'EDIT'; editTodo: IEditTodo };
