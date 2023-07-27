import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { GlobalContext } from '../../../../../GlobalContext'

import './cart.scss'

const Cart = () => {
    const navigate = useNavigate()
    const {cart, setCart, token} = useContext(GlobalContext)
    const handleRemoveItem = (product) => {
        setCart(
            cart.filter(item => item!=product )
        )
    }
    const handleGoToPay = () => {
        if (token==null){
            navigate("/login/customer")
        } else {
            if (cart[0] == null) {
                return
            }
            return navigate("/customers/pay")
        }
    }
    if (cart[0]==null){
        return(
            <div className="main_cart">
                <div className="main_cart_around"
                style={{textAlign:"center"}}>
                    Giỏ hàng rỗng
                </div>
            </div>
        )
    }
    return(
        <div className="main_cart">
            <div className="main_cart_around">
                {
                    cart.map((product,index)=>{
                        // console.log(product)
                        return(
                            <div
                                key={index}
                                className="main_cart_around_product link" >
                                <img src={"data:img/jpeg;base64,"+product.product.img} alt="" className="main_cart_around_product_img" />
                                <Link to={`/customers/shops/${product.product.category.name}/${product.product._id}`} className='link' >
                                    <div className="main_cart_around_product_infor">
                                        <p className="main_cart_around_product_infor_name">{product.product.category.name}-{product.product.name}</p>
                                        <p className="main_cart_around_product_infor_price">Đơn giá: {product.product.price}đ</p>
                                        <p className="main_cart_around_product_infor_quantity">Số lượng: {product.quantity}</p>
                                    </div>
                                </Link>
                                <i className="fa-solid fa-x main_cart_around_product_del_btn"
                                    onClick={()=>{handleRemoveItem(product)}}/>
                            </div>
                        )
                    })
                }
            </div>
                <button className="main_cart_btn" onClick={()=>{setCart([])}}>Xóa hết</button>
                <button className="main_cart_btn" onClick={()=>{handleGoToPay()}}>Thanh toán</button>
        </div>
    )
    
}

export default Cart