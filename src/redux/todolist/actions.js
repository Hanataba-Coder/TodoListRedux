import { ADD_TODO } from './type';

export const addTodo = (todo) => {
  // console.log(todo);

  return {
    type: ADD_TODO,
    payload: todo,
  };
};
