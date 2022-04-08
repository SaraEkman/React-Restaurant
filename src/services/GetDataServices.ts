import { ICreateReserve } from './../models/interfaces/ICreateReserve'
import { IReservation } from './../models/interfaces/IReservation'
// import { IGetId } from '../models/interfaces/IGetId'
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
  createBooking(){
    axios.post<ICreateReserve>(
      'https://school-restaurant-api.azurewebsites.net/booking/create',
      {
        restaurantId: '624c2f5347678330c7a5c58e',
        date: '2022-04-05',
        time: '21:00',
        numberOfGuests: 4,
        customer: {
          name: 'Sara',
          lastname: 'Ekman',
          email: 'gdhdt@gg.com',
          phone: '089258233',
        },
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((data)=>console.log(data)).catch((erro)=>console.log("Error", erro))
  }
}
