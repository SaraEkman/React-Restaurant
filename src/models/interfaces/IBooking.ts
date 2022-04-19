export interface IBooking {
  // Behövs till Admin då man får tillbaks _id från API:et.
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
