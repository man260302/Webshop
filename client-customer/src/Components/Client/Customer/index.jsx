import {Routes, Route} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Header from './Header/Header'
import HomeMain from './Home/HomeMain'
import Shops from './Shops/Shops'
import BlogsMain from './Blogs/BlogsMain'
import Portfolio from './Portfolio/Portfolio'
import Contact from './Contact/Contact'
import Setting from './Setting/Setting'
import Profile from './Profile/Profile'
import Pay from './Pay/Pay'
import Footer from './Footer/Footer'
import { GlobalContext } from '../../../GlobalContext'

import './index.scss'

const CustomerMainPage = () => {

    const {setProductsList} = useContext(GlobalContext)
    // console.log("aaaaaaa")
    const [load, setLoad] = useState(false)
    useEffect(()=>{
        const allProductsAPI = async () =>{
            const data = await axios.get("/api/customer/products/all").then(res=>res.data)
            try {
                // console.log(data)
                setProductsList(data)
                setLoad(true)
            } catch (error) {
                console.log(error)
            }
        } 
        allProductsAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if (load) {
        return (
            <div className="customerMain">
                <Header />
                <Routes>
                    <Route path="/" element={<HomeMain />} />
                    <Route path="shops/*" element={<Shops />} />
                    <Route path="blogs" element={<BlogsMain />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path='pay' element={<Pay />}/>
                </Routes>   
                <Footer />
            </div>
        )
    }
    return(
        <>Cửa hàng đang lấy dữ liệu, Vui lòng đợi trong giây lát...</>
    )
}

export default CustomerMainPage;