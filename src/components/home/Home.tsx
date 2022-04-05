import axios from "axios"
import { useEffect, useState } from "react"
import { IGetId } from "../../models/interfaces/IGetId"
import { GetRestaurantId } from "../../services/getDataService"

export function Home(){
    const [id,setId]=useState("")
   
    // useEffect(()=>{
    //     let idToGet=new GetRestaurantId();
    //     idToGet.getRestaurantId()
    //         .then(restaurantId => {
    //             console.log(restaurantId);    
    //             // setId(restaurantId.id)
    //         })
    // },[])
    
    // useEffect(() => {
    //     axios.get('https://school-restaurant-api.azurewebsites.net/restaurant/:id').then((res) => {
    //         console.log(res.data);
    //      })
    // },[])
    
    return(
        <p>Home works!{id}</p>
    )
}