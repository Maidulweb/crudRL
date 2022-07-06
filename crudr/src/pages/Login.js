import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Register.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [stateLogin,setLogin] = useState({
        'email' : '',
        'password' : '',
        'error_list': [],
    })
    const handleInput = (e) => {
        e.preventDefault();
        setLogin({...stateLogin, [e.target.name]:e.target.value})
    }
    const data = {
        'email': stateLogin.email,
        'password': stateLogin.password,
    }
    const submitLogin = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data)
        .then(res =>{
            if(res.data.status === 201) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('username', res.data.name);
                console.log(res.data.success)
                navigate('/')
            }else if(res.data.status === 204) {
                console.log(res.data.warning)
            }else {
                setLogin({...stateLogin, error_list : res.data.validation_errors})
            }
        })
        });
    }
  
    return (
        <div>
               <Header />
               <div className='container'>
               
            <div className='row mt-5'>
            <div className='col-md-6 offset-md-3'>
            <h2 className='text-center'>Login</h2>
            <hr className='main-hr' />
                    <form onSubmit={submitLogin}>
                   {/*  <span className='color-red text-center'>{stateLogin.error_list}</span> */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' onChange={handleInput} value={stateLogin.email} />
                            <span className='color-red'>{stateLogin.error_list.email}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' onChange={handleInput} value={stateLogin.password} />
                            <span className='color-red'>{stateLogin.error_list.password}</span>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;