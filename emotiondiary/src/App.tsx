import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { initItem } from './redux/modules/items';

import Home from './pages/Home'
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem('diary');

    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a: {id: string}, b: {id: string}) =>
          parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dispatch(initItem(diaryList));
      }
    }
  }, [dispatch]);

  return (
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
  );
}

export default App;
