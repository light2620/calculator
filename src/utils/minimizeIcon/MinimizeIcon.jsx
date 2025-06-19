import "./style.css"

export default function MinimizeIcon({setIsMinimize,isMinimize}){
    return <div className="minimize-icon" onClick={()=> setIsMinimize(!isMinimize)}>
        <p></p>
    </div>
}