
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import axios from "axios";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import MasterLayout from "./pages/admin/MasterLayout";
import PrivateRoute from "./components/PrivateRoute";


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use( function(config){
const token = localStorage.getItem('auth_token')
config.headers.Authorization = token ? `Bearer ${token}` : ''
return config
})

function App() {
  return (
    <div>
    <Router>
    <Routes>
        <Route index element={<Home />} />
        <Route path='/register' element={localStorage.getItem('auth_token') ? <Navigate to="/" replace={true} /> : <Register />} />
        <Route path='/login' element={localStorage.getItem('auth_token') ? <Navigate to="/" replace={true} /> : <Login />} />

        <Route path="/admin" element={ <PrivateRoute><MasterLayout /></PrivateRoute>} >
          <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
          <Route path='/admin/profile' element={<PrivateRoute><Profile /></PrivateRoute>}/>
        </Route>
    </Routes>
     
  </Router>
    </div>
  );
}

export default App;
