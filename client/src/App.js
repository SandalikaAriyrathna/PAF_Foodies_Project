import './style.css';
import Home from './Components/HomePage/Home';
import SignUp from './Components/SignUp/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIN from './Components/SignIn/SignIN';
import Profile from './Components/profile/Profile';

function App() {
  return (
    <div className="App">
      {/* {localStorage.getItem('users') == undefined ||
      localStorage.getItem('users') == null ? (
        <SignUp />
      ) : (
        <Home />
      )} */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              localStorage.getItem('users') === undefined ||
              localStorage.getItem('users') == null ? (
                <SignIN />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
