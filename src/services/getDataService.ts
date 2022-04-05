import { IGetId } from "../models/interfaces/IGetId";
import axios from "axios";
export class GetRestaurantId{
    async getRestaurantId():Promise<IGetId[]>{
        let restaurantId =await axios.get<IGetId[]>('https://school-restaurant-api.azurewebsites.net/restaurant/:id')
            return restaurantId.data
    }
}