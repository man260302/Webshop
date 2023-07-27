import {useState, useEffect} from 'react';
import axios from 'axios';


import SlideShow from './ComponentsHomePage/SlideShow/SlideShow';
import ProductBestSale from './ComponentsHomePage/ProductsBestSale/ProductsBestSale';
import Portfolio from './ComponentsHomePage/PortfolioItem/Portfolio';

import Data from './Data/data.js';

import './homepage.scss'

const HomeMain = () => {
    const [newProducts, setNewProducts] = useState()
    const [hotProducts, setHotProducts] = useState()
    useEffect(()=>{
        const callNewProduct = async () =>{
            let Products = await axios.get("/api/customer/products/new").then(res => res.data)
            setNewProducts(Products)
            // console.log(newProducts) 
        }
        const callHotProduct = async () =>{
            let Products = await axios.get("/api/customer/products/hot").then(res => res.data)
            setHotProducts(Products)
            // console.log(newProducts) 
        }
        callNewProduct()
        callHotProduct()
    },[])
    useEffect(
        ()=>{
            window.scrollTo({top:0, left:0, behavior:"smooth"})})
    //Xử lý cho phần slide
    const [slideNum,changeSlideNum] = useState(3);
    const handleChangeNum = (value) => {
        let num = slideNum+value
        if (num > 4) {
            return changeSlideNum(0)
        } else if (num < 0) {
            return changeSlideNum(4)
        }
        // console.log(slideNum)
        return changeSlideNum(num)
    }
    // setInterval(console.log(slideNum+1), 1000)

    //xử lý cho phần best sale
    return (
        <div className="homepage">
            <SlideShow 
            handleChangeNum={handleChangeNum}
            slideShow={Data.slideShow[slideNum]}/>
            <div className="homepage_bestsale">
                <div className="homepage_bestsale_title">SẢN PHẨM MỚI NHẤT</div>
                {newProducts && newProducts.map((product,index) => {return <ProductBestSale product={product} key={index}/>})}
            </div>
            <div className="homepage_bestsale">
                <div className="homepage_bestsale_title">SẢN PHẨM NỔI BẬT</div>
                {hotProducts && hotProducts.map((product,index) => {return <ProductBestSale product={product} key={index}/>})}
            </div>
            <div className="homepage_portfolio">
                <div className="homepage_portfolio_title title">DANH MỤC ĐẦU TƯ</div>
                {Data.portfolio.map((portfolio,index)=>{return <Portfolio portfolio={portfolio} key={index}/>})}
            </div>
        </div>
    )
}

export default HomeMain;