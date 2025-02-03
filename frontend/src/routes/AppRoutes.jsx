import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuth><Home /></UserAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
