export interface IBooking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
  customer: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}
