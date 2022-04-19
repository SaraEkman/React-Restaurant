import axios from "axios";
import { IBooking } from "../models/IBooking";

import { ICreateReserve } from "../models/interfaces/ICreateReserve";

export class GetAdminService {
  async getBookings(id: string): Promise<IBooking[]> {
    let response = await axios.get<IBooking[]>(
      `https://school-restaurant-api.azurewebsites.net/booking/restaurant/${id}`
    );
    return response.data;
  }

  async getCustomers(ids: string[]): Promise<
    {
      _id: string;
      name: string;
      lastname: string;
      email: string;
      phone: string;
    }[]
  > {
    return Promise.all(
      ids.map((id) =>
        axios.get(
          `https://school-restaurant-api.azurewebsites.net/customer/${id}`
        )
      )
    ).then((data) => {
      let a: any[] = [];
      data.forEach((b) => a.push(b.data[0]));
      return a;
    });
  }

  async deleteBooking(id: string): Promise<any> {
    let response = await axios.delete(
      `https://school-restaurant-api.azurewebsites.net/booking/delete/${id}`
    );
    return response.data;
  }
  async createBooking(booking: ICreateReserve): Promise<any> {
    let response = await axios.post(
      `https://school-restaurant-api.azurewebsites.net/booking/create`,
      booking
    );
    return response.data;
  }
  async changeBooking(booking: IBooking): Promise<any> {
    const updatedBooking: IBookingChangeRequest = {
      ...booking,
      id: booking._id,
    };
    let response = await axios.put<IBookingChangeRequest>(
      `https://school-restaurant-api.azurewebsites.net/booking/update/${booking._id}`,
      updatedBooking
    );
    return response.data;
  }
}
interface IBookingChangeRequest extends IBooking {
  id: string;
}
