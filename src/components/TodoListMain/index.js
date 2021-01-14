import React, { useState } from 'react';
import {
  TodoListContainer,
  TodoListWrapper,
  ListBoxWrapper,
  TopOption,
  TitleWrapper,
  ListInputWrap,
  AddListInput,
  FlexRow,
  ListInputSearch,
  NavigatorWrap,
} from './styled';
import ListTodo from './components/ListTodo';
import { addTodo } from '../../redux';
import { ADD_HISTORY } from '../../redux/todolist/type';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TodoListMain = () => {
  const TodoList = useSelector((state) => state.todoList.todo);
  const dispatch = useDispatch();
  const [NewTodo, setNewTodo] = useState('');
  const [searchTodo, setSearchTodo] = useState('');

  //Enter New Todo
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (!NewTodo) return null;

      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        completed: false,
        title: NewTodo,
      };

      dispatch(addTodo(newTodo));
      dispatch({
        type: ADD_HISTORY,
        payload: `Add - id: ${newTodo.id}, title: ${
          newTodo.title
        }  ${moment().format('DD/MM/YYYY, hh:mm:ss')}`,
      });

      setNewTodo('');
    }
  };
  return (
    <TodoListContainer>
      <TodoListWrapper>
        <NavigatorWrap>
          <Link to="/history">History</Link>
        </NavigatorWrap>
        <TopOption>
          <FlexRow>
            <TitleWrapper>Tasks</TitleWrapper>
            {
              //Search
            }
            <ListInputWrap>
              <ListInputSearch
                placeholder="Search"
                onChange={(e) => setSearchTodo(e.target.value)}
                value={searchTodo}
              />
            </ListInputWrap>
          </FlexRow>
          {
            //Input
          }
          <ListInputWrap style={{ width: '100%' }}>
            <AddListInput
              minRows={1}
              placeholder="Add your todo..."
              onChange={(e) => setNewTodo(e.target.value)}
              value={NewTodo}
              onKeyDown={handleKeyDown}
            />
          </ListInputWrap>
        </TopOption>
        <ListBoxWrapper>
          {searchTodo ? (
            <ListTodo
              TodoList={TodoList.filter((e) => e.title.includes(searchTodo))}
            />
          ) : (
            <ListTodo TodoList={TodoList} />
          )}
        </ListBoxWrapper>
      </TodoListWrapper>
    </TodoListContainer>
  );
};

export default TodoListMain;
