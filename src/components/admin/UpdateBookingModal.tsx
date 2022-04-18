import React, { ChangeEvent, useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IBooking } from "../../models/IBooking";

export function UpdateBookingModal(props: {
  show: boolean;
  onHide: MouseEventHandler<HTMLButtonElement> | undefined;
  booking: IBooking;
  bookings: IBooking[];
  onSaveChanges(booking: IBooking): void;
}) {
  const [booking, setBooking] = useState<IBooking>(props.booking);

  const [availableTables, setAvailableTables] = useState<{
    eighteen: number;
    twentyOne: number;
  }>({ eighteen: 0, twentyOne: 0 });

  // Räkna ut antal bord som är lediga,
  // vi börjar beräkningen när modalen laddas för första gängen och när datumet ändras.
  //
  useEffect(() => {
    // Finns datum och bokningar
    if (booking.date && props.bookings) {
      // Filtrera bort bokningar som inte är samma dag.
      const filteredBookings = props.bookings.filter((b) => {
        return b.date === booking.date && b._id !== props.booking._id;
      });
      // Beräkna antal bord som är lediga det datumet
      // Reduce går igenom varenda bokning i filterdbokings kolla på
      const available1800Slots = filteredBookings.reduce(
        (numberOfFreeTables, oneOfExsistingBookings) => {
          if (oneOfExsistingBookings.date === "18:00") {
            const numberOfTablesBooked = Math.ceil(
              oneOfExsistingBookings.numberOfGuests / 6
            );
            return numberOfFreeTables - numberOfTablesBooked;
          } else {
            return numberOfFreeTables;
          }
        },
        15
      );

      const available2100Slots = filteredBookings.reduce(
        (previousValue, currentValue) => {
          if (currentValue.date === "21:00") {
            const numberOfTablesBooked = Math.ceil(
              currentValue.numberOfGuests / 6
            );
            return previousValue - numberOfTablesBooked;
          } else {
            return previousValue;
          }
        },
        15
      );
      setAvailableTables({
        eighteen: available1800Slots,
        twentyOne: available2100Slots,
      });
    }
  }, [booking.date, props.booking._id, props.bookings]);

  useEffect(() => {
    if (props.booking) {
      setBooking(props.booking);
    }
  }, [props.booking]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setBooking({ ...booking, [name]: value });
  }
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setBooking({ ...booking, time: "", date: e.target.value });
  }

  function setTime(time: string) {
    setBooking({ ...booking, time });
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Bokning {booking?._id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Antal personer</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="numberOfGuests"
              type="number"
              defaultValue={booking.numberOfGuests}
              min="1"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={booking?.date}
              onChange={changeDate}
            />
          </Form.Group>
        </Form>
        <Button
          className="me-3"
          onClick={() => setTime("18:00")}
          variant="outline-dark"
          active={booking?.time === "18:00"}
          disabled={
            availableTables.eighteen - Math.ceil(booking.numberOfGuests / 6) < 0
          }
        >
          18:00
        </Button>
        <Button
          onClick={() => setTime("21:00")}
          variant="outline-dark"
          active={booking?.time === "21:00"}
          disabled={
            availableTables.twentyOne - Math.ceil(booking.numberOfGuests / 6) <
            0
          }
        >
          21:00
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            props.onSaveChanges(booking);
          }}
        >
          Submit
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
