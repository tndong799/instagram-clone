import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Auth from './views/Auth';
import Home from './views/Home';
import User from './views/User';
import Account from './views/Account';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate replace to="/login" />}></Route>
            <Route path='/login' element={<Auth authRoute='login'></Auth>}></Route>
            <Route path='/register' element={<Auth authRoute='register'></Auth>}></Route>

            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route path="/home" element={<Home />} />
              <Route path="/account/edit" element={<Account />} />
              <Route path="/account/password/change" element={<Account />} />
              <Route path="/:username" element={<User />} >
              </Route>
            </Route>

            {/* No other routes match */}
            {/* <Route path="*" element={<Navigate to='login' />} /> */}
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
