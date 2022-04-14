import { useEffect, useState } from "react";
import { Container } from "react-bootstrap/";
import { IBooking } from "../../models/IBooking";
import { GetAdminService } from "../../services/GetAdminService";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const service = new GetAdminService();
  let getBookings = service.getBookings;

  useEffect(() => {
    getBookings("624c2f5347678330c7a5c58e").then((bookings) =>
      setBookings(bookings)
    );
  }, [getBookings]);

  function deleteBooking(id: string) {
    service.deleteBooking(id).then(() => {
      const filteredBookings = bookings.filter((booking) => {
        return id !== booking._id;
      });
      setBookings(filteredBookings);
    });
  }

  let ShowBokings = bookings.map((booking, i) => {
    return (
      <div key={booking._id}>
        <p>id{booking._id}</p>
        <p>Datum: {booking.date}</p>
        <p>Antal personer: {booking.numberOfGuests}</p>
        <p>Tid: {booking.time}</p>
        <p>Customer Id {booking.customerId}</p>
        <button
          onClick={() => {
            deleteBooking(booking._id);
          }}
        >
          Avboka
        </button>
      </div>
    );
  });

  return (
    <>
      <h3>Alla Bokningar :</h3>
      <Container>{ShowBokings}</Container>
    </>
  );
}
