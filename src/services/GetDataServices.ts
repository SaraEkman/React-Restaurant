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
}
