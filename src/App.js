import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
