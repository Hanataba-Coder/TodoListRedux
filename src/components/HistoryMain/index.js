import React from 'react';
import {
  Container,
  Wrapper,
  ListBoxWrapper,
  TopOption,
  TitleWrapper,
  NavigatorWrap,
  FlexRow,
} from './styled';
import HistoryList from './components/HistoryList';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CLEAR_HISTORY } from '../../redux/todolist/type';

const HistoryMain = () => {
  const HistoryLists = useSelector((state) => state.todoList.history);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <NavigatorWrap>
          <Link to="/">
            <i className="fas fa-arrow-left" style={{ marginRight: 5 }}></i>Todo
          </Link>
        </NavigatorWrap>
        <TopOption>
          <FlexRow>
            <TitleWrapper>History</TitleWrapper>
            <i
              style={{ cursor: 'pointer', color: '#e07c7c' }}
              className="fas fa-eraser"
              onClick={() =>
                dispatch({
                  type: CLEAR_HISTORY,
                })
              }
            >
              {' '}
              clear all
            </i>
          </FlexRow>
        </TopOption>
        <ListBoxWrapper>
          <HistoryList Lists={HistoryLists} />
        </ListBoxWrapper>
      </Wrapper>
    </Container>
  );
};

export default HistoryMain;
