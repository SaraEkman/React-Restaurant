import { useEffect, useState, ChangeEvent } from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap/";
import { IBooking } from "../../models/interfaces/IBooking";

import { GetAdminService } from "../../services/GetAdminService";
import { NewManualBookingModal } from "./NewManualBookingModal";
import { UpdateBookingModal } from "./UpdateBookingModal";
import { Button as StyledButton } from "../styled-com/Button";
import { Div } from "../styled-com/Div";
import "./admin.css";
import { ICreateReserve } from "../../models/interfaces/ICreateReserve";

export function Admin() {
  const [Name, setName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [Show, setShow] = useState(false);
  const [isFetchingBookings, setIsFetchingBookings] = useState(true);
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

  // Hämtar bokningar när vi loggat in eller redan är inloggad
  useEffect(() => {
    if (Show) {
      getBookings();
    }
    //VSC hjälpte till med varningen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Show]);

  function deleteBooking(id: string) {
    service.deleteBooking(id).then(() => {
      //Filtrerar bort den borttagna bokningen.
      const filteredBookings = bookings.filter((booking) => {
        if (id === booking._id) {
          return false;
        } else {
          return true;
        }
      });
      setBookings(filteredBookings);
    });
  }
  function createBooking(booking: ICreateReserve) {
    setModalNewManualShow(false);
    service.createBooking(booking).then((data: IBooking) => {
      getBookings();
    });
  }

  function updateBooking(updatedBooking: IBooking) {
    setModalUpdateShow(undefined);
    service.changeBooking(updatedBooking).then(() => {
      // Byter ut den gamla bokningen med samma id, med den nya uppdaterade bokningen.
      const changedBookings = bookings.map((booking) => {
        if (booking._id === updatedBooking._id) return updatedBooking;
        return booking;
      });
      setBookings(changedBookings);
    });
  }
  function getBookings() {
    setIsFetchingBookings(true);
    service.getBookings("624c2f5347678330c7a5c58e").then((bookings) => {
      const customerIds = bookings.map((booking) => booking.customerId);
      service.getCustomers(customerIds).then((customerData) => {
        if (customerData.length > 0) {
          // Om vi har fått en array av customers. Gå igenom bokningarna och hitta arrayindex i customers array.
          // Lägg då till den till bokningen.
          const updatedBookings = bookings.map((b) => {
            let index = customerData.findIndex((a) => a._id === b.customerId);
            if (index > -1) {
              return {
                ...b,
                customer: {
                  name: customerData[index].name,
                  lastname: customerData[index].lastname,
                  email: customerData[index].email,
                  phone: customerData[index].phone,
                },
              };
            } else {
              return b;
            }
          });
          setIsFetchingBookings(false);
          setBookings(updatedBookings);
        }
      });
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
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Tid</th>
                <th>Datum</th>
                <th>Antal Personer</th>
                <th>Kunder</th>
              </tr>
            </thead>

            <tbody>
              {isFetchingBookings && (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center" }}>
                    <Spinner
                      animation="border"
                      role="status"
                      className="center"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              )}
              {bookings
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((booking: IBooking, index: number) => (
                  <tr key={booking._id + index}>
                    <td>{booking.time}</td>
                    <td>{booking.date}</td>
                    <td>{booking.numberOfGuests}</td>
                    {booking.customer === undefined ||
                    booking.customer.name === "" ? (
                      <td>{booking.customerId}</td>
                    ) : (
                      <td style={{ whiteSpace: "pre" }}>
                        {booking.customer.name} {booking.customer.lastname}
                        {`\n${booking.customer.email}`}
                        {`\n${booking.customer.phone}`}
                      </td>
                    )}
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
