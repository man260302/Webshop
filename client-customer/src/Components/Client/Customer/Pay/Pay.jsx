import {useEffect, useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import { GlobalContext } from '../../../../GlobalContext'

import "./pay.scss"
import momo from './momo.jpg'


const Pay = () => {
    useEffect(()=>{window.scrollTo({top:0, left:0, behavior:"smooth"})},[])
    const {cart, customer, setCart, token} = useContext(GlobalContext)

    const [sumPrice, setsumPrice] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const sum = ()=>{
            let sum = 0
            for ( let item of cart){
                sum += Number(item.product.price)*Number(item.quantity) 
            }
            return sum
        }
        setsumPrice(sum())    
    },[cart])
    const handleRemoveItem = (product) => {
        setCart(
            cart.filter(item => item!==product)
        )
    }
    const submit = ()=>{
        let config = {headers : {
            "x-access-token": token
        }}
        let body = {
            total: sumPrice,
            item: cart,
            customer: customer,
        }
        console.log(body)
        // eslint-disable-next-line
        const checkOutAPI = async () => {
            const res = await axios.post('/api/customer/checkout', body, config).then(res => res.data)
            if (res) {
              alert('Xác nhận đơn hàng!');
              setCart([]);
              navigate('/customers/');
            } else {
              alert('Hệ thông đang trục trặc trong giây lát. mong quý khác quay lại sau');
            }
        }
        checkOutAPI()
    }
        return (
            <div className="pay">
                <div className="pay_cart">
                {
                        cart.map((product,index)=>{
                            return(
                                <div
                                    key={index}
                                    className="pay_cart_around_product link" >
                                    <img src={"data:img/jpeg;base64,"+product.product.img} alt="" className="pay_cart_around_product_img" />
                                    <Link to={`/customers/shops/${product.product.category.name}/${product.product._id}`} className='link' >
                                        <div className="pay_cart_around_product_infor">
                                            <p className="pay_cart_around_product_infor_name">{product.product.category.name} - {product.product.name}</p>
                                            <p className="pay_cart_around_product_infor_price">Đơn giá: {product.product.price}đ</p>
                                            <p className="pay_cart_around_product_infor_quantity">Số lượng: {product.quantity}</p>
                                        </div>
                                    </Link>
                                    <i className="fa-solid fa-x pay_cart_around_product_del_btn"
                                        onClick={()=>{handleRemoveItem(product)}}
                                        />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pay_submit" >
                    <div className="pay_submit_select">
                        <select name="" id="" className="pay_submit_select_select">
                                <option value="" className="pay_submit_select_select_option">Chọn phương thức thanh toán</option>
                                <option value="shipper" className="pay_submit_select_select_option">Thanh toán khi nhận hàng</option>
                                <option value="online" className="pay_submit_select_select_option">Thanh toán Momo</option>
                        </select>
                        <select name="" id="" className="pay_submit_select_voucher">
                                <option value="freeship" className="pay_submit_select_voucher_freeship">Miễn phí vận chuyển</option>
                                <option value="discount" className="pay_submit_select_voucher_discount">Giảm giá 10%</option>
                        </select>
                    </div>
                    <form className="pay_submit_form" onSubmit="">
                        <div className="pay_submit_form_username">Tên khác hàng: {customer.name}</div>
                        <div className="pay_submit_form_email">Email: {customer.email}</div>
                        <div className="pay_submit_form_count">Số sản phẩm: {cart.length} món</div>
                        <div className="pay_submit_form_price">Tổng Thanh toán: {sumPrice}đ</div>
                        <label htmlFor="ykien">Nhắn gửi shop: </label>
                        <input className="pay_submit_form_input" type="text"id='ykien' />
                        <button className="pay_submit_form_btn" onClick={(e)=>{e.preventDefault();submit()}}>ĐẶT HÀNG</button>
                    </form>
                    <img src={momo} alt="" className="momo_img" />
                </div>
                   
    
            </div>
        )
}

export default Pay