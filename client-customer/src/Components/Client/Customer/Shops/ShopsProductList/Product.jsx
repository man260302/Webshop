import {Link} from 'react-router-dom'

import './product.scss'

const Product = ({product}) => {
    // console.log(product)
    let url = `/customers/shops/${product.category.name}/${product._id}`
    return (
        <div className="shop_product">
            <div className="shop_product_around">
                <img src={"data:image/jpg;jpeg;png;base64," + product.img[0]} alt="" className="shop_product_around_img" />
                <h3 className="shop_product_around_name">{product.name}</h3>
                <p className="shop_product_around_producer">EAU DE PARFUM</p>
                <h5 className="shop_product_around_price">{product.price}đ</h5>
                <Link to={url} className='link shop_product_around_btn'>XEM CHI TIẾT</Link>
            </div>
        </div>
    )
}

export default Product;