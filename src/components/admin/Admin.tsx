import { useEffect, useState, ChangeEvent } from "react";
import { Button, Container, Table } from "react-bootstrap/";
import { IBooking } from "../../models/IBooking";
import { ICreateBooking } from "../../models/ICreateBooking";
import { GetAdminService } from "../../services/GetAdminService";
import { NewManualBookingModal } from "./NewManualBookingModal";
import { UpdateBookingModal } from "./UpdateBookingModal";
import { Button as StyledButton } from "../styled-com/Button";
import { Div } from "../styled-com/Div";
import "./admin.css";

export function Admin() {
  const [Name, setName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [Show, setShow] = useState(false);
  // Tar värde från  name input
  const handleChangName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // Tar värde från  password input
  const handleChangPassWord = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value);
  };
  // Kontrollerar så att namn och lösenord stämmer
  const handleClick = () => {
    let name: string = "grupp2";
    let passWord: string = "123";

    if (name === Name && passWord === PassWord) {
      setShow(true);
    }
  };
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [modalUpdateShow, setModalUpdateShow] = useState<IBooking>();
  const [modalNewManualShow, setModalNewManualShow] = useState<boolean>(false);

  const service = new GetAdminService();

  useEffect(() => {
    service
      .getBookings("624c2f5347678330c7a5c58e")
      .then((bookings) => setBookings(bookings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setModalNewManualShow(false);
    service.createBooking(booking).then((data: IBooking) => {
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
    <>
      {/* Om man inte är inloggad visas inloggnings sida */}
      {Show === false && (
        <Div className="logInDiv">
          <label>Admins Namn</label>
          <input type="text" value={Name} onChange={handleChangName} />
          <label>Lösenord</label>
          <input
            type="password"
            value={PassWord}
            onChange={handleChangPassWord}
          />
          <StyledButton onClick={handleClick} className="loginBtn">
            Logga in
          </StyledButton>
        </Div>
      )}
      {Show && (
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
      )}
    </>
  );
}
