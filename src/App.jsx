import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignIn from './components/security/SignIn'
import LogIn from './components/security/LogIn'
import MainPage from './pages/MainPage'
import NewTodo from "./pages/NewTodo.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/' element={<LogIn/>}/>
          <Route path='/home' element={<MainPage/>}/>
          <Route path='/newtodo' element={<NewTodo/>}/>
          <Route path='/home/:id' element={<UpdatePage/>}/>
          <Route path="/home/userprofile" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
