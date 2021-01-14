import React, { useState, useEffect } from 'react';
import Checkbox from '../../../../components/CheckboxTodoList';
import {
  ListWrapper,
  List,
  ListInput,
  InlineFlex,
  SaveBtn,
  CancelBtn,
} from './styled';
import {
  EDIT_TODO,
  TOGGLE_TODO,
  ADD_HISTORY,
  DELETE_TODO,
} from '../../../../redux/todolist/type';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ListTodo = ({ TodoList }) => {
  const loadingEdit = useSelector((state) => state.todoList.loading);
  const [Text, setText] = useState('');
  const [Edit, setEdit] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setEdit('');
  }, [TodoList]);

  const toggleEdit = (id, title) => {
    setText(title);
    setEdit(id);
  };

  //Edit Todo
  const handlerEdit = (editTodo) => {
    const editedTodo = {
      id: editTodo.id,
      completed: editTodo.completed,
      title: Text,
    };
    dispatch({
      type: EDIT_TODO,
      payload: editedTodo,
    });

    dispatch({
      type: ADD_HISTORY,
      payload: `Edit - id: ${editTodo.id}  ${moment().format(
        'DD/MM/YYYY, hh:mm:ss'
      )}`,
    });
  };

  //Delete Todo
  const handlerDeleteTodo = (id) => {
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });

    dispatch({
      type: ADD_HISTORY,
      payload: `Delete - id: ${id}  ${moment().format('DD/MM/YYYY, hh:mm:ss')}`,
    });
  };

  //Toggle Check
  const handlerChecked = (id) => {
    dispatch({
      type: TOGGLE_TODO,
      payload: id,
    });

    dispatch({
      type: ADD_HISTORY,
      payload: `Change status - id: ${id}  ${moment().format(
        'DD/MM/YYYY, hh:mm:ss'
      )}`,
    });
  };

  //Cancel Edit
  const CancelEdit = () => {
    setEdit('');
  };

  return (
    <ListWrapper>
      {
        //List
      }
      {TodoList &&
        TodoList.map((e) => (
          <List key={e.id}>
            <InlineFlex style={{ width: '100%' }}>
              {Edit !== e.id && (
                <Checkbox
                  checked={e.completed}
                  onChange={() => {}}
                  onClick={() => handlerChecked(e.id)}
                />
              )}
              {
                <ListInput
                  disabled={Edit !== e.id}
                  defaultValue={e.title}
                  value={Edit === e.id ? null : e.title}
                  checked={e.completed}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              }
            </InlineFlex>

            {
              //กรณี Edit
            }
            {Edit === e.id && (
              <InlineFlex>
                <SaveBtn onClick={() => handlerEdit(e)}>
                  {loadingEdit ? 'Saving' : 'SAVE'}
                </SaveBtn>
                <CancelBtn onClick={CancelEdit}>Cancel</CancelBtn>
              </InlineFlex>
            )}
            {
              //กรณีไม่ Edit
            }
            {Edit !== e.id && (
              <InlineFlex>
                <i
                  style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.5)' }}
                  className="far fa-edit"
                  onClick={() => toggleEdit(e.id, e.title)}
                ></i>
                <i
                  style={{ cursor: 'pointer', color: '#e07c7c' }}
                  className="far fa-trash-alt"
                  onClick={() => handlerDeleteTodo(e.id)}
                ></i>
              </InlineFlex>
            )}
          </List>
        ))}
    </ListWrapper>
  );
};

export default ListTodo;
