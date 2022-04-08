import { getValue } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetDataServices } from '../../services/GetDataServices'

export function Home() {
  // const [id,setId]=useState("")

  // useEffect(()=>{
  //     let idToGet = new GetDataServices();
  //     idToGet.getRestaurantId()
  //         .then((restaurantId) => {
  //             console.log(restaurantId);
  //             // setId(restaurantId.id)
  //         })
  // },[])

 

  return (
    <>
         <Link to={'/table-reservation'}> <button >Boka bord</button></Link>
          

      
      <button>Meny</button>
    </>
  )

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
}
