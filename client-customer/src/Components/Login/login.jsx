import { useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import  axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'
import {GlobalContext} from '../../GlobalContext'

import './login.scss';

const Login = () => {
    const navigate = useNavigate()
    const param = useParams()
    const {setToken, setCustomer} = useContext(GlobalContext)

    //nhập account
    const [account, setAccount] = useState(
        {
            "username":"",
            "password":"" 
        }
    )
    const handleChangeAccount = (e , key) => {
        return setAccount({...account, [key]:e})
    }
    
    
    //call api
    const setPath = (e) => {
        e.preventDefault();
        const APIlogin = async () =>{
            try {
                const data = await axios.post(`/api/${param.role}/login`, account).then(res => res.data)
                // console.log(data)
                setToken(data.token)
                setCustomer(data.customer)  
                alert("Đăng nhập thành công. Vui lòng đợi trong giây lát")
            } catch (error) {   
                console.log(error)
            }
        }
        APIlogin()
        navigate(`/${param.role}s`)       
        // console.log(account)
    }
    return (
        <div className="login">
            <div className="wrapper">
                    <h2>ADMIN LOGIN</h2>
                    <form className="form-box" onSubmit={(e)=>{setPath(e)}}>
                        <div className="input-box">
                            <span className='icon'><i className="fa-solid fa-user"></i></span>
                            <input value={account.username} onChange={(e)=>{handleChangeAccount(e.target.value,"username")}} type="username" required/>
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className='icon'><i className="fa-solid fa-lock"></i></span>
                            <input type="password" value={account.password} onChange={(e)=>{handleChangeAccount(e.target.value,"password")}} required/>
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label className='link_a'> <input type="checkbox"/>Remember me</label>
                            <a href="/" className='link_a'>Forgot Password?</a>
                        </div>
                        <button  className='btn'>Login
                        </button>
                        <div className="login-register">
                            { param.role=="customer" && <Link to='/register/customer'> Register Account </Link>}
                            { param.role=="customer" && <Link to='/active/customer'> Active Account </Link>}
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default Login;