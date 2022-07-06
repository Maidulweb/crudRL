import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Register.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Register = () => {
    const navigate = useNavigate();
    const [stateRegister,setRegister] = useState({
        'username' : '',
        'email' : '',
        'password' : '',
        'error_list': [],
    })
    const handleInput = (e) => {
        e.preventDefault();
        setRegister({...stateRegister, [e.target.name]:e.target.value})
    }
    const data = {
        'username': stateRegister.username,
        'email': stateRegister.email,
        'password': stateRegister.password,
    }
    const submitRegister = (e) => {
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data)
        .then(res =>{
            if(res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('username', res.data.name);
                navigate('/')
            }else {
               setRegister({...stateRegister, error_list : res.data.validation_errors})
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
            <h2 className='text-center'>Register</h2>
            <hr className='main-hr' />
                    <form onSubmit={submitRegister}>
                    <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" name='username' onChange={handleInput} value={stateRegister.username} />
                            <span className='color-red'>{stateRegister.error_list.username}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' onChange={handleInput} value={stateRegister.email} />
                            <span className='color-red'>{stateRegister.error_list.email}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' onChange={handleInput} value={stateRegister.password} />
                            <span className='color-red'>{stateRegister.error_list.password}</span>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;