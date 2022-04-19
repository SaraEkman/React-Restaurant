import { ChangeEvent, useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IBooking } from "../../models/interfaces/IBooking";

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
  const [validated, setValidated] = useState(false);
  const [timeError, setTimeError] = useState(false);

  // Räkna ut antal bord som är lediga,
  // vi börjar beräkningen när modalen laddas för första gängen och när datumet ändras.
  useEffect(() => {
    // Finns datum och bokningar
    if (booking.date && props.bookings) {
      // Filtrera bort bokningar som inte är samma dag.
      const filteredBookings = props.bookings.filter((b) => {
        return b.date === booking.date && b._id !== props.booking._id;
      });
      // Beräkna antal bord som är lediga det datumet
      // Reduce går igenom varenda bokning i filterdbookings och retunerar antal lediga bord.
      const available1800Slots = filteredBookings.reduce(
        (numberOfFreeTables, oneOfExsistingBookings) => {
          if (oneOfExsistingBookings.time === "18:00") {
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
          if (currentValue.time === "21:00") {
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

  // När vi ändrar datumet vill vi sätta tiden till 0.
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setBooking({ ...booking, time: "", date: e.target.value });
  }

  // Sätter tiden till det man valt
  function setTime(time: string) {
    setBooking({ ...booking, time });
  }

  // När vi ändrar antal gäster sätter vi tiden till 0 igen.
  function handleNumberOfGuestsChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setBooking({ ...booking, [name]: value, time: "" });
  }

  // Hanterar valideringen, om allt inte är ifyllt visas felmeddelanden upp.
  // Om allt fyllts i sparas bokningen.
  const handleSubmit = (event: any) => {
    setTimeError(false);
    const form = event?.currentTarget;
    if (form.checkValidity() === false || booking.time === "") {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.onSaveChanges(booking);
    }
    if (booking.time === "") {
      setTimeError(true);
    }
    setValidated(true);
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Bokning {booking.customer.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Antal personer</Form.Label>
            <Form.Control
              required
              onChange={handleNumberOfGuestsChange}
              name="numberOfGuests"
              type="number"
              defaultValue={booking.numberOfGuests}
              min="1"
            />
            <Form.Control.Feedback type="invalid">
              Välj antal personer
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              required
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={booking?.date}
              onChange={changeDate}
            />
            <Form.Control.Feedback type="invalid">
              Välj ett datum
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button
              className="me-3"
              onClick={() => setTime("18:00")}
              variant="outline-dark"
              active={booking?.time === "18:00"}
              disabled={
                availableTables.eighteen -
                  Math.ceil(booking.numberOfGuests / 6) <
                0
              }
            >
              18:00
            </Button>
            <Button
              onClick={() => setTime("21:00")}
              variant="outline-dark"
              active={booking?.time === "21:00"}
              disabled={
                availableTables.twentyOne -
                  Math.ceil(booking.numberOfGuests / 6) <
                0
              }
            >
              21:00
            </Button>
            {timeError && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                Välj tid
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Button variant="success" type="submit">
              Spara
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Stäng</Button>
      </Modal.Footer>
    </Modal>
  );
}
