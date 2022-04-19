import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { ICreateBooking } from "../../models/ICreateBooking";
import { IBooking } from "../../models/IBooking";

export function NewManualBookingModal(props: {
  show: boolean;
  onHide: MouseEventHandler<HTMLButtonElement> | undefined;
  onSave(booking: ICreateBooking): void;
  bookings: IBooking[];
}) {
  const [booking, setBooking] = useState<ICreateBooking>({
    restaurantId: "624c2f5347678330c7a5c58e",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const [availableTables, setAvailableTables] = useState<{
    eighteen: number;
    twentyOne: number;
  }>({ eighteen: 0, twentyOne: 0 });
  const [validated, setValidated] = useState(false);
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    if (booking.date && props.bookings) {
      const filteredBookings = props.bookings.filter((b) => {
        return b.date === booking.date;
      });
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
        (numberOfFreeTables, oneOfExsistingBookings) => {
          if (oneOfExsistingBookings.time === "21:00") {
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
      setAvailableTables({
        eighteen: available1800Slots,
        twentyOne: available2100Slots,
      });
    }
  }, [booking.date, props.bookings]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setBooking({ ...booking, [name]: value });
  }

  function handleNumberOfGuestsChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setBooking({ ...booking, [name]: value, time: "" });
  }

  function handleUserChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setBooking({
      ...booking,
      customer: { ...booking.customer, [name]: value },
    });
  }
  function changeDate(e: ChangeEvent<HTMLInputElement>) {
    setBooking({ ...booking, time: "", date: e.target.value });
  }

  function setTime(time: string) {
    console.log("setTime", time);
    setBooking({ ...booking, time: time });
  }

  const handleSubmit = (event: any) => {
    setTimeError(false);
    const form = event?.currentTarget;
    if (form.checkValidity() === false || booking.time === "") {
      event.preventDefault();
      event.stopPropagation();
    } else {
      props.onSave(booking);
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
        <Modal.Title id="contained-modal-title-vcenter">Ny Bokning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Antal personer</Form.Label>
            <Form.Control
              required
              name="numberOfGuests"
              type="number"
              onChange={handleNumberOfGuestsChange}
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
              onChange={changeDate}
            />
            <Form.Control.Feedback type="invalid">
              Välj ett datum
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              className="me-3 mb-2"
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
              className="mb-2"
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

          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label>Förnamn</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Förnamn"
              name="name"
              onChange={handleUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Ange ett Förnamn
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom04">
            <Form.Label>Efternamn</Form.Label>
            <Form.Control
              required
              placeholder="Efternamn"
              name="lastname"
              onChange={handleUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Ange ett Efternamn
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom05">
            <Form.Label>E-post</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="E-post"
              name="email"
              onChange={handleUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Ange E-post
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom06">
            <Form.Label>Telefonnummer</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Telefonnummer"
              name="phone"
              onChange={handleUserChange}
            />
            <Form.Control.Feedback type="invalid">
              Ange ett telefonummmer
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="success" type="submit">
            Spara Bokning
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
//onClick={() => props.onSave(booking)}
