import { useEffect, useState, useContext } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import Product from './Product'
import { GlobalContext } from '../../../../../GlobalContext'


import './ShopsProductList.scss'

const ShopsProducts = (props) => {
    const navigate = useNavigate();
    const {productsData} = useContext(GlobalContext)
    // console.log("sâsas",productsData)
    //lấy param từ url
    const param = useParams()
    // console.log(param)
    
    //chọn danh sách sản phẩm đầu vào 
    const [productsList,setProductsList] = useState(productsData)
    const setProduct = (styleproducts) => {
        setProductsList(
            productsData.filter((product) => {
                return product.category.name === styleproducts
            }))
            // console.log(styleproducts)
            // console.log(productsList)
        }
        useEffect(() => {
            // console.log(param.styleproducts)
            if (param.styleproducts === "general"){
                setProductsList(productsData)
            } else if (param.styleproducts !== "general"){
                setProduct(param.styleproducts)
            }},[param.styleproducts])
            
    //thay đổi nội dung nút filter
    const [filterGeneral, setFilterGeneral] = useState("MẶC ĐỊNH")
    const [filterPrice, setFilterPrice] = useState("GIÁ SẢN PHẨM")
    const [filterType, setFilterType] = useState("LOẠI SẢN PHẨM")
    const [filterCollection, setFilterCollection] = useState("BỘ SƯU TẬP")
    const [filterBackground,setfilterBackground] = useState("MẶC ĐỊNH")
    // console.log(filterBackground)
    useEffect(()=>{
            if (filterPrice !== "GIÁ SẢN PHẨM") {
                return
            }
        },
        [filterPrice,filterType,filterCollection,filterBackground]
    )
    //lọc sản phẩm
    const [productFilter, setProductFilter] = useState(productsList)
    const handleChangeProductFilter = (key,value) => {
        setProductFilter(() => {
            if (key === "MẶC ĐỊNH"){
                setFilterPrice("GIÁ SẢN PHẨM")
                setFilterType("LOẠI SẢN PHẨM")
                setFilterCollection("BỘ SƯU TẬP")
                return productsList
            } else if (key==="price"){
                setFilterPrice(value[2])
                setFilterType("LOẠI SẢN PHẨM")
                setFilterCollection("BỘ SƯU TẬP")
                return productsList
                .filter(product => product.price >= value[0])
                .filter(product => product.price <= value[1])
            } else if (key === "type"){
                setFilterPrice("GIÁ SẢN PHẨM")
                setFilterType(value[1])
                setFilterCollection("BỘ SƯU TẬP")
                return productsList.filter(product => product.propoties.type === value[0])
            } else if (key === "collection"){
                setFilterPrice("GIÁ SẢN PHẨM")
                setFilterType("LOẠI SẢN PHẨM")
                setFilterCollection(value[1])
                return productsList.filter(product => product.propoties.collection === value[0])
            }
            })
        // console.log(value)
        // console.log(productFilter)
    }
    useEffect(()=>{
        // console.log("productsList")
        // console.log(productsList)
        setProductFilter(productsList)
    },[productsList])
    // console.log(productsData)
    if (productsData !== undefined){
        return (
            <div className="shopsmain">
                <section className="shopsmain_products">
                        <div className="shopsmain_products_filter">
                            <div className="shopsmain_products_filter_general filter general"
                                 onClick={()=>{handleChangeProductFilter("MẶC ĐỊNH",[0,0,0])}}>
                                {filterBackground}
                            </div>
                            <div className="shopsmain_products_filter_price filter">
                                {filterPrice}
                                <div className="filter_options">
                                    <div className="filter_options_2m option"
                                         onClick={()=>{handleChangeProductFilter("price",[500000,2000000,"500,000đ - 2,000,000đ"])}}>
                                        500,000đ - 2,000,000đ</div>
                                    <div className="filter_options_2m5 option"
                                         onClick={()=>{handleChangeProductFilter("price",[2000000,2500000,"2,000,000đ - 2,500,000đ"])}}>
                                        2,000,000đ - 2,500,000đ
                                    </div>
                                    <div className="filter_options_last option"
                                         onClick={()=>{handleChangeProductFilter("price",[2500000,10000000,"2,500,000đ - 10,000,000đ"])}}>
                                        2,500,000đ - 10,000,000đ
                                    </div>
                                </div>
                            </div>
                            <div className="shopsmain_products_filter_typeof filter">
                                {filterType}
                                <div className="filter_options">
                                    <div className="filter_options_product option"
                                         onClick={()=>{handleChangeProductFilter("type",["Product","TẤT CẢ SẢN PHẨM"])}}>
                                        TẤT CẢ SẢN PHẨM
                                    </div>
                                    <div className="filter_options_combo option"
                                         onClick={()=>{handleChangeProductFilter("type",["Combo","CÁC COMBO"])}}>
                                        CÁC COMBO
                                    </div>
                                    <div className="filter_options_git option"
                                         onClick={()=>{handleChangeProductFilter("type",["Gift","Phần Quà Tặng"])}}>
                                        PHẦN QUÀ TẶNG
                                    </div>
                                </div>
                            </div>
                            <div className="shopsmain_products_filter_collection filter">
                                {filterCollection}
                                <div className="filter_options">
                                    <div className="filter_options_muaxuan option"
                                         onClick={()=>{handleChangeProductFilter("collection",["Mùa Xuân","BỘ SƯU TẬP MÙA XUÂN"])}}>
                                        BỘ SƯU TẬP MÙA XUÂN
                                    </div>
                                    <div className="filter_options_muaha option"
                                         onClick={()=>{handleChangeProductFilter("collection",["Mùa Hạ","BỘ SƯU TẬP MÙA HẠ"])}}>
                                        BỘ SƯU TẬP MÙA HẠ
                                    </div>
                                    <div className="filter_options_muathu option"
                                         onClick={()=>{handleChangeProductFilter("collection",["Mùa Thu","BỘ SƯU TẬP MÙA THU"])}}>
                                        BỘ SƯU TẬP MÙA THU
                                    </div>
                                    <div className="filter_options_muadong option"
                                         onClick={()=>{handleChangeProductFilter("collection",["Mùa Đông","BỘ SƯU TẬP MÙA ĐÔNG"])}}>
                                        BỘ SƯU TẬP MÙA ĐÔNG
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <div className="shopsmain_products_list">
                            {productFilter.map((product, index) => {
                                return <Product product={product} key={index}/>})}
                        </div>
                </section>
            </div>
        )
    } 
    return navigate('/customers')
}

export default ShopsProducts;