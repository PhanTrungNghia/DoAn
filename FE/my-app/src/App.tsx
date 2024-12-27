// App.tsx
import { Navbar } from './_components/NavBar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/login/LoginPage';
import { AppBody } from './_components/AppBody/AppBody';
import { useSelector, shallowEqual } from 'react-redux';


function App() {
  const authUser: IUser = useSelector(
    (state: any) => state.auth.user,
    shallowEqual
  )

  return (
    <div className={`App ${authUser != null ? "logged-in" : ""}`}>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <div className='ant-spin-nested-loading'>
          <div className='ant-spin-container'>
            <Navbar />
            <AppBody />
          </div>
        </div>
    </div>
  );
}

export default App;
