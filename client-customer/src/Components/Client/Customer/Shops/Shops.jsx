import { useContext, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import ShopsProductList from './ShopsProductList/ShopsProductList'
import ShopsProduct from './ShopsProduct/ShopsProduct'
import { GlobalContext } from '../../../../GlobalContext'


import './shops.scss'



const Shops = () => {
    const {productsData} = useContext(GlobalContext)
    const navigate = useNavigate();
    useEffect(
        ()=>{
            window.scrollTo({top:0, left:0, behavior:"smooth"})   
        }
            ,[])
    return(
        <div className="shops">
            <div className="shops_poster">
                <div className="shops_poster_logo">
                    <div className="shops_poster_logo_square"></div>
                    <h3 className="shops_poster_logo_brand">
                        Long term
                    </h3>
                </div>
            </div>
            <Routes>
                <Route path="/:styleproducts" element={<ShopsProductList/>} />
                <Route path="/:styleproducts/:id" element={<ShopsProduct/>} />
            </Routes>
        </div>
    )
}

export default Shops;