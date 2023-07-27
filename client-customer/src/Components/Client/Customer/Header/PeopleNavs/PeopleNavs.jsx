import {useContext} from "react"
import {useNavigate} from "react-router-dom"

import { GlobalContext } from "../../../../../GlobalContext"

import "./peoplenavs.scss"

const PeopleNavs = () => {
    const {setCart, setToken, setCustomer, token} =useContext(GlobalContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        if (token){
            setCart([])
            setToken(null)
            setCustomer(null)
        }
        navigate("/login/customer")
    }
    return(
        <>
            <li className="icon_people_navs_nav ">My profile</li>
            <li className="icon_people_navs_nav ">My setting</li>
            <li className="icon_people_navs_nav " onClick={()=>{handleLogOut()}}>{token?"Log out":"Log in"}</li>
        </>
    )
}
export default PeopleNavs