import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICreateReserve } from '../../models/interfaces/ICreateReserve'
import { User } from '../../models/interfaces/User'
import { GetDataServices } from '../../services/GetDataServices'
import { TableReservation } from '../table-reservation/TableReservation'
import {  ThanksForReservation } from '../thanksCom/ThanksForReservation'

export interface IGetTimeProps {
  date: string
  time: string
  people: number
}

export function UserForm(props: IGetTimeProps) {
  const [newCustomer, setNewCustomer] = useState<User>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
  })

  const [ShowBtn, setShowBtn] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name

    setNewCustomer({ ...newCustomer, [name]: e.target.value })
  }

  const handleClick = () => {
    let num = props.people
    let CreateReserve: ICreateReserve = {
      restaurantId: '624c2f5347678330c7a5c58e',
      date: `${props.date}`,
      time: `${props.time}`,
      numberOfGuests: num,
      customer: newCustomer,
    }

    let postData = new GetDataServices()
    postData.createBooking(CreateReserve)

    //  return <ThanksForReservation name={newCustomer.name} date={props.date} time={props.time} />

    // setShowBtn(true)
  }

  return (
    <>
      <form>
        <label>Förnamn</label>
        <input
          type="text"
          name="name"
          value={newCustomer.name}
          onChange={handleChange}
        />
        <label>Efternamn</label>
        <input
          type="text"
          name="lastname"
          value={newCustomer.lastname}
          onChange={handleChange}
        />
        <label>Mobil</label>
        <input
          type="text"
          name="phone"
          value={newCustomer.phone}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newCustomer.email}
          onChange={handleChange}
        />
      </form>
      {/* {ShowBtn ? (
       <ThanksForReservation/>
      ) : ( */}

      <Link to="/thanksForReservation">
        <button type="button" onClick={handleClick}>
          Spara Bokning
        </button>
      </Link>
    </>
  )
}
