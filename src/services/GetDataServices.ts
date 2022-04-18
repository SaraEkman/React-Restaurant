import { ICreateReserve } from './../models/interfaces/ICreateReserve'
import { IReservation } from './../models/interfaces/IReservation'
import axios from 'axios'
import { IGetId } from '../models/interfaces/IGetId'
export class GetDataServices {
  async getRestaurantId(): Promise<IGetId> {
    let restaurantId = await axios.get<IGetId>(
      'https://school-restaurant-api.azurewebsites.net/624c2f5347678330c7a5c58e',
    )
    return restaurantId.data
  }
  async getBookings(): Promise<IReservation[]> {
    let bookingsData = await axios.get<IReservation[]>(
      'https://school-restaurant-api.azurewebsites.net/booking/restaurant/624c2f5347678330c7a5c58e',
    )
    return bookingsData.data
  }
  createBooking(boking:ICreateReserve){
    axios.post<ICreateReserve>(
      'https://school-restaurant-api.azurewebsites.net/booking/create',
     boking,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((data)=>console.log(data)).catch((erro)=>console.log("Error", erro))
  }
 
}
