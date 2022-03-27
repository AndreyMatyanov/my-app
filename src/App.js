import './App.css';

import {Navigation} from './Navigation';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Route, Routes } from 'react-router-dom';

function App() {
  return (

    <div className="container">
      <h3 className="m-3 d-flex justiny-content-center">ReactJS</h3>

    <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>} exact/>
      <Route path='/department' element={<Department/>} exact/>
      <Route path='/employee' element={<Employee/>} exact/>
    </Routes>
    
    </div>
  );
}

export default App;
