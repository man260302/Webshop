import {useContext, useEffect, useState } from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'

import { GlobalContext } from '../../../../../GlobalContext'

import './shopsproduct.scss'

const ShopsProduct = () => {
    //lấy params
    const param = useParams()
    const navigate = useNavigate();
    
    //lấy data từ context
    const {cart, setCart, productsData} = useContext(GlobalContext)
    
    //kiểm tra token
    // if (!productsData){
    //     navigate('/customers/')
    // }

    const productRecommend = productsData.filter(product =>product.category.name === param.styleproducts)
    const product = productRecommend.find(product => product._id === param.id)
    //nhận số lượng sản phẩm 
    const [productSum,setProductSum] = useState(1)
    // console.log(product)
    //cuôn trang
    useEffect(
        ()=>{
            window.scrollTo({top:420, left:0, behavior:"smooth"})
            setProductSum(1)
        },[product])
    useEffect(
        ()=>{
            window.scrollTo({top:0, left:0, behavior:"smooth"})},[])
            

    
    //xử lý thay đổi img
    const [imgNum, setImgNum] = useState(0)
    const handleChangeImg = (value) => {
        let num = imgNum+value;
        if (num > product.img.length-1){return setImgNum(0)} else if (num < 0) {return setImgNum(product.img.length-1)}
        return setImgNum(num)
    }
    
    
    //xử lý data đưa hàng vào giỏ hàng
    const handleAddProductToCart = () => {
        let id = product._id 
        let checkProduct = () => {
            if(cart){
                for (let num in cart){
                    if (cart[num].product._id === id ) {
                        // return {"id": id, "quantity":cart[num].product.quantity}
                        console.log("check nè",cart[num].quantity)
                        return {"id": id, "quantity":cart[num].quantity}
                    }
                }
                return null
            }
        }
        let check = checkProduct()
        // console.log(check)
        let quantity = check!==null ? Number(productSum)+Number(check.quantity) : productSum
        let cartFilter = check!==null? cart.filter(productCart => productCart.product._id!==check.id) : cart
        // console.log(quantity,">>>>>",cartFilter[0].product._id)
        let renewProd = {...product,img:product.img[0]}
        let newProduct = {
            "product":renewProd,
            "quantity": Number(quantity)
        }
        // setCart([...cartFilter,newProduct])
        setCart([...cartFilter,newProduct])
        alert("Thêm sản phẩm thành công")
        // console.log(cart)
        }
    if (productsData!==undefined){
        return(
            <div className="shopsproduct">
                <section className="shopsproduct_content">
                    <div className="shopsproduct_content_imglist">
                        <img src={"data:img/jpeg;base64,"+product.img[imgNum]}  className="shopsproduct_content_imglist_bigimg"/>
                        <div className="img_change">
                            <div className="img_prev" onClick={()=>handleChangeImg(-1)}/>
                            <div className="img_next" onClick={()=>handleChangeImg(1)}/>
                        </div>
                        <div className="shopsproduct_content_imglist_smallimg">
                        {product.img.map((imgChild,index) =>{
                            return <img src={"data:img/jpeg;base64,"+imgChild} key={index}  className='shopsproduct_content_imglist_smallimg_imgchild' />
                        })}
                        </div>
                    </div>
                    <div className="shopsproduct_content_information">
                        <h2 className="shopsproduct_content_information_title">{product.name}</h2>
                        <h5 className="shopsproduct_content_information_producer">EAU DE PARFUM</h5>
                        <p className="shopsproduct_content_information_description">{product.propoties.description}</p>
                        <div className="shopsproduct_content_information_milprice">
                            <p className="price">{product.price}đ - <del>{product.price*110/100}đ</del></p>
                        </div>
                        <div className="shopsproduct_content_information_sumadd">
                            <input type="number" value={productSum} onChange={e=>setProductSum(e.target.value)} className='sum'/>
                            <button className="add btn" onClick={()=>{handleAddProductToCart()}}>THÊM VÀO GIỎ HÀNG</button>
                        </div>
                        <div className="shopsproduct_content_information_set">
                            <h6 className="set_title">Discovery Set</h6>
                            <p className="set_content">Trải nghiệm thử set tại cửa hàng trước khi quyết định. </p>
                        </div>
                    </div>
                </section>
                <div className="shopsproduct_recommend">
                    <div className="shopsproduct_recommend_around">
                        {
                            productRecommend.map((product,index)=>{
                                return(
                                    <div key={index} className="shopsproduct_recommend_around_product">
                                        <div className="shopsproduct_recommend_around_product_around">
                                            <img src={"data:img/jpeg;base64,"+product.img[0]} alt="" className="shopsproduct_recommend_around_product_around_img" />
                                            <h3 className="shopsproduct_recommend_around_product_around_name">{product.name}</h3>
                                            <p className="shopsproduct_recommend_around_product_around_producer">EAU DE PARFUM</p>
                                            <h5 className="shopsproduct_recommend_around_product_around_price">{product.price}đ</h5>
                                            <Link 
                                                to={`/customers/shops/${product.category.name}/${product._id}`} 
                                                className='link shopsproduct_recommend_around_product_around_btn'
                                                >XEM CHI TIẾT</Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    } return navigate('/customers')
}

export default ShopsProduct;