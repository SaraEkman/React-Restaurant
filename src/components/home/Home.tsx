import axios from "axios"
import { useEffect, useState } from "react"
import { GetDataServices } from "../../services/GetDataServices";


export function Home(){
    // const [id,setId]=useState("")
   
    useEffect(()=>{
        let idToGet = new GetDataServices();
        idToGet.getRestaurantId()
            .then((restaurantId) => {
                console.log(restaurantId);    
                // setId(restaurantId.id)
            })
    },[])
    
    // useEffect(() => {
    //    axios
    //   .post(
    //     'https://school-restaurant-api.azurewebsites.net/restaurant/create',
    //     {
    //       name: 'grupp2',
    //       address: {
    //         street: 'Kungsgatan 1',
    //         zip: '123 45',
    //         city: 'Stockholm',
    //       },
    //     },
    //     {
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //     },
    //   ).then(res=>console.log(res.data))
    // },[])
    
    return(
        <p>Home works!</p>
    )
}