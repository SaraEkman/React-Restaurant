import { useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { GetAdminService } from "../../services/GetAdminService";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    let service = new GetAdminService();
    service
      .getBookings("624c2f5347678330c7a5c58e")
      .then((bookings) => setBookings(bookings));
  }, []);
  console.log(bookings);

  return <p>Dessa bokningar finns: {bookings}</p>;
}
