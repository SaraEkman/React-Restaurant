import axios from "axios";
import { IBooking } from "../models/IBooking";

export class GetAdminService {
  async getBookings(id: string): Promise<IBooking[]> {
    let response = await axios.get<IBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/${id}`
    );
    return response.data;
  }
}
