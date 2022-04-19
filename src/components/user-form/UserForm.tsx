import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICreateReserve } from '../../models/interfaces/ICreateReserve'
import { User } from '../../models/interfaces/User'
import { GetDataServices } from '../../services/GetDataServices'
import { Button } from '../styled-com/Button'
import "./userForm.css"

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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name

    setNewCustomer({ ...newCustomer, [name]: e.target.value })
  }

  const handleClick = () => {
    // Postar info till apiet
    let num = props.people
    let CreateReserve: ICreateReserve = {
      restaurantId: '624c2f5347678330c7a5c58e',
      date: `${props.date}`,
      time: `${props.time}`,
      numberOfGuests: num,
      customer: newCustomer,
    }
    let saveInfo: any = []
    
      let postData = new GetDataServices()
      postData.createBooking(CreateReserve)
      saveInfo = [newCustomer.name, props.time, props.date]
    
    localStorage.setItem('ReservationInfo', JSON.stringify(saveInfo))
  }

  return (
    <div>
      <form className='userFormDiv'>
        <label>Förnamn: <input
          type="text"
          name="name"
          value={newCustomer.name}
          onChange={handleChange}
        /></label>
        <label>Efternamn: <input
          type="text"
          name="lastname"
          value={newCustomer.lastname}
          onChange={handleChange}
        /></label>
        <label>Mobil: <input
          type="text"
          name="phone"
          value={newCustomer.phone}
          onChange={handleChange}
        /></label>
        <label>Email: <input
          type="email"
          name="email"
          value={newCustomer.email}
          onChange={handleChange}
        /></label>
      </form>
      <div className='userFormBtn'>
         <Link to="/thanksForReservation" >
        <Button  type="button" onClick={handleClick}>
          Spara Bokning
        </Button>
      </Link>
     </div>
    </div>
  )
}
