import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap/";
import { IBooking } from "../../models/IBooking";
import { ICreateBooking } from "../../models/ICreateBooking";
import { GetAdminService } from "../../services/GetAdminService";
import { NewManualBookingModal } from "./NewManualBookingModal";
import { UpdateBookingModal } from "./UpdateBookingModal";

export function Admin() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [modalUpdateShow, setModalUpdateShow] = useState<IBooking>();
  const [modalNewManualShow, setModalNewManualShow] = useState<boolean>(false);

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
  function createBooking(booking: ICreateBooking) {
    service.createBooking(booking).then((data: IBooking) => {
      console.log("Skapade en booking", data);
      service
        .getBookings("624c2f5347678330c7a5c58e")
        .then((bookings) => setBookings(bookings));
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

  return (
    <Container>
      <div className="d-grid gap-2">
        <Button
          className="my-3 "
          size="lg"
          variant="success"
          onClick={() => setModalNewManualShow(true)}
        >
          Ny Bokning
        </Button>
      </div>

      <h3>Alla Bokningar:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tid</th>
            <th>Datum</th>
            <th>Antal Personer</th>
            <th>Customer Id</th>
          </tr>
        </thead>

        <tbody>
          {bookings
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((booking: IBooking, index: number) => (
              <tr key={booking._id}>
                <td>{booking.time}</td>
                <td>{booking.date}</td>
                <td>{booking.numberOfGuests}</td>
                <td>{booking.customerId}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => setModalUpdateShow(booking)}
                  >
                    Ändra
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteBooking(booking._id);
                    }}
                  >
                    Avboka
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {modalUpdateShow && (
        <UpdateBookingModal
          onSaveChanges={updateBooking}
          bookings={bookings}
          booking={modalUpdateShow}
          show={modalUpdateShow !== undefined}
          onHide={() => setModalUpdateShow(undefined)}
        />
      )}
      {modalNewManualShow && (
        <NewManualBookingModal
          show={modalNewManualShow}
          onHide={() => setModalNewManualShow(false)}
          bookings={bookings}
          onSave={createBooking}
        />
      )}
    </Container>
  );
}
