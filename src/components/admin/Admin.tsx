// import { useEffect, useState } from "react";
// import { IBooking } from "../../models/IBooking";
// import { GetAdminService } from "../../services/GetAdminService";

// export function Admin() {
//   const [bookings, setBookings] = useState<IBooking[]>([]);

//   useEffect(() => {
//     let service = new GetAdminService();
//     service
//       .getBookings("624c2f5347678330c7a5c58e")
//       .then((bookings) => setBookings(bookings));
//   }, []);

//   return <p>Dessa bokningar finns: {bookings.length}</p>;
// }

import { ChangeEvent, useState } from 'react'
import { Button } from '../styled-com/Button'
import { Div } from '../styled-com/Div'
import "./admin.css"

export function Admin() {
  const [Name, setName] = useState('')
  const [PassWord, setPassWord] = useState('')
  const [Show, setShow] = useState(false)

  const handleChangName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangPassWord = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value)
  }

  const handleClick = () => {
    let name: string = 'grupp2'
    let passWord: string = '123'

    if (name === Name && passWord === PassWord) {
      setShow(true)
    }
  }

  return (
    <>
      {Show === false && (
        <Div className='logInDiv'>
          <label>Admins Namn</label>
          <input type="text" value={Name} onChange={handleChangName} />
          <label>Lösenord</label>
          <input type="password" value={PassWord} onChange={handleChangPassWord} />
          <Button onClick={handleClick} className="loginBtn">Logga in</Button>
        </Div>
      )}
    </>
  )
}
