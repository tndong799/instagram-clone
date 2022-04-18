import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Auth from './views/Auth';
import Home from './views/Home';
import User from './views/User';
import Account from './views/Account';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import CommentContextProvider from './contexts/CommentContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import ErrorPage from './views/ErrorPage';
import ListPost from './components/posts/ListPost';
import PostSaved from './components/posts/PostSaved';
import PostTagged from './components/posts/PostTagged';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <CommentContextProvider>
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
                  <Route index element={<ListPost />} />
                  <Route path="" element={<ListPost />} />
                  <Route path="saved" element={<PostSaved />} />
                  <Route path="tagged" element={<PostTagged />} />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
                {/* <Route path="/:username/tagged" element={<User />} />
                <Route path="/:username/saved" element={<User />} /> */}
                <Route path="*" element={<ErrorPage />} />
              </Route>

              {/* No other routes match */}
              {/* <Route path="*" element={<Navigate to='login' />} /> */}
            </Routes>
          </Router>
        </CommentContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
