import {createContext, useState} from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) =>{
    const [token, setToken] = useState()
    const [customer, setCustomer] = useState()
    
    
    const [productsData, setProductsList] = useState() //đây là danh sách sản phẩm lấy được từ call api (ở component login)
    const [cart, setCart] = useState([])
    const productShop = (shopName) => {
        if (shopName === "general") {return productsData}
        return productsData.map((product)=>{return product.category.name === shopName})
    }

    const value = {
        token,
        setToken,
        cart,
        setCart,
        productsData,
        setProductsList,
        customer,
        setCustomer,
        productShop
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,GlobalProvider}