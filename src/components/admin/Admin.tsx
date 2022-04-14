import React from "react";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap/";
import { IBooking } from "../../models/IBooking";
import { GetAdminService } from "../../services/GetAdminService";
import { UpdateBookingModal } from "./UpdateBookingModal";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [modalUpdateShow, setModalUpdateShow] = useState<IBooking>();

  const service = new GetAdminService();

  useEffect(() => {
    service
      .getBookings("624c2f5347678330c7a5c58e")
      .then((bookings) => setBookings(bookings));
  }, []);

  function deleteBooking(id: string) {
    service.deleteBooking(id).then(() => {
      const filteredBookings = bookings.filter((booking) => {
        return id !== booking._id;
      });
      setBookings(filteredBookings);
    });
  }

  function updateBooking(updatedBooking: IBooking) {
    setModalUpdateShow(undefined);
    service.changeBooking(updatedBooking).then(() => {
      const changedBookings = bookings.map((booking) => {
        if (booking._id === updatedBooking._id) return updatedBooking;
        return booking;
      });
      setBookings(changedBookings);
    });
  }

  let showBookings = bookings.map((booking, i) => {
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
        <Button variant="primary" onClick={() => setModalUpdateShow(booking)}>
          Ändra
        </Button>
      </div>
    );
  });

  return (
    <Container>
      <h3>Alla Bokningar :</h3>
      {showBookings}
      {modalUpdateShow && (
        <UpdateBookingModal
          onSaveChanges={updateBooking}
          bookings={bookings}
          booking={modalUpdateShow}
          show={modalUpdateShow !== undefined}
          onHide={() => setModalUpdateShow(undefined)}
        />
      )}
    </Container>
  );
}
