import { Link } from "react-router-dom"
import "./notFound.css"

export function NotFound() {
    return(
        <div className="notFound">
            <img src="../images/pizza-5315713_960_720.png" alt="pizza" width="70px" height="auto"/>
            <p>Error 404</p>
            <p>Lost?</p>
            <p>There's no place like <Link to="/">home...</Link></p>
        </div>
    )
}