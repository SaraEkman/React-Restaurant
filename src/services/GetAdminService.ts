import axios from "axios";
import { IBooking } from "../models/IBooking";

export class GetAdminService {
  async getBookings(id: string): Promise<IBooking[]> {
    let response = await axios.get<IBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/restaurant/${id}`
    );
    return response.data;
  }
  async deleteBooking(id: string): Promise<any> {
    let response = await axios.delete(
      `https://school-restaurant-api.azurewebsites.net/booking/delete/${id}`
    );
    return response.data;
  }
}
