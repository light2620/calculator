import "./style.css"
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function MobileMinimize({isMinimize,setIsMinimize}){
    return <IoIosCloseCircleOutline size={40} color={"#E0C0C0"}  onClick={() => setIsMinimize(!isMinimize)}/>
}