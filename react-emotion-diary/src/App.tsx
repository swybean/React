import React, { useEffect } from 'react';
// import { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

import { useDispatch } from 'react-redux';
import { initItem } from './redux/modules/items';

// const reducer = (state, action) => {
//   let newState = [];
//   switch (action.type) {
//     case 'INIT': {
//       return action.data;
//     }
//     case 'CREATE': {
//       const newItem = {
//         ...action.data,
//       };
//       newState = [newItem, ...state];
//       break;
//     }
//     case 'REMOVE': {
//       newState = state.filter((it) => it.id !== action.targetId);
//       break;
//     }
//     case 'EDIT': {
//       newState = state.map((it) =>
//         it.id === action.data.id ? { ...action.data } : it
//       );
//       break;
//     }
//     default:
//       return state;
//   }

//   localStorage.setItem('diary', JSON.stringify(newState));
//   return newState;
// };

// export const DiaryStateContext = React.createContext();
// export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: '오늘의일기 1번',
//     date: 1663942965356,
//   },
//   {
//     id: 2,
//     emotion: 2,
//     content: '오늘의일기 2번',
//     date: 1663942965357,
//   },
//   {
//     id: 3,
//     emotion: 3,
//     content: '오늘의일기 3번',
//     date: 1663942965358,
//   },
//   {
//     id: 4,
//     emotion: 4,
//     content: '오늘의일기 4번',
//     date: 1663942965359,
//   },
//   {
//     id: 5,
//     emotion: 5,
//     content: '오늘의일기 5번',
//     date: 1663942965360,
//   },
//   {
//     id: 6,
//     emotion: 2,
//     content: '오늘의일기 6번',
//     date: 1763942965360,
//   },
// ];

function App() {
  // const [data, dispatch] = useReducer(reducer, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem('diary');

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a: { id: string }, b: { id: string }) =>
          parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        // dataId.current = parseInt(diaryList[0].id) + 1;
        // data.id = diaryList[0].id;
        // dispatch({ type: 'INIT', data: diaryList });
        dispatch(initItem(diaryList));
      }
    }
  }, [dispatch]);

  // const dataId = useRef(0);
  // // CREATE
  // const onCreate = (date, content, emotion, images) => {
  //   dispatch({
  //     type: 'CREATE',
  //     data: {
  //       id: dataId.current,
  //       date: new Date(date).getTime(),
  //       content,
  //       emotion,
  //       images,
  //     },
  //   });
  //   dataId.current += 1;
  // };
  // // REMOVE
  // const onRemove = (targetId) => {
  //   dispatch({ type: 'REMOVE', targetId });
  // };
  // // EDIT
  // const onEdit = (targetId, date, content, emotion, images) => {
  //   dispatch({
  //     type: 'EDIT',
  //     data: {
  //       id: targetId,
  //       date: new Date(date).getTime(),
  //       content,
  //       emotion,
  //       images,
  //     },
  //   });
  // };
  return (
    // <DiaryStateContext.Provider value={data}>
    // <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
    // </DiaryDispatchContext.Provider>
    // </DiaryStateContext.Provider>
  );
}

export default App;
