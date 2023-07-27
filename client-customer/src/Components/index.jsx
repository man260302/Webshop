import { useEffect, useContext} from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';

import Login from './Login/login'
import Customer from './Client/Customer/index';
import { GlobalContext } from '../GlobalContext';

import './index.scss';

const Index = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/customers')
    },[])
    return(
        <Routes>
            <Route path='/login/:role' element={<Login/>} />
            <Route path='/customers/*'element={<Customer/>}/>
        </Routes>
    )
}

export default Index;