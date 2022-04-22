import { useState } from 'react'
import { ICreateReserve } from '../../models/interfaces/ICreateReserve'
import { GetDataServices } from '../../services/GetDataServices'
import { Button } from '../styled-com/Button'
import useInput from './useInput'
import './userForm.css'

export interface IGetTimeProps {
  date: string
  time: string
  people: number
  changeBtns():void
}

export function UserForm(props: IGetTimeProps) {
  const {
    enteredValue: enteredFirstName,
    enteredValueIsValid: enteredFirstNameIsValid,
    valueInputIsInvalid: firstNameInputIsInvalid,
    valueInputChangeHandler: firstNameInputChangeHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
  } = useInput((value: any) => value.trim() !== '')

  const {
    enteredValue: enteredLastName,
    enteredValueIsValid: enteredLastNameIsValid,
    valueInputIsInvalid: lastNameInputIsInvalid,
    valueInputChangeHandler: lastNameInputChangeHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
  } = useInput((value: any) => value.trim() !== '')

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    valueInputIsInvalid: emailInputIsInvalid,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
  } = useInput((value: any) => value.trim().includes('@'))

  const {
    enteredValue: enteredPhone,
    enteredValueIsValid: enteredPhoneIsValid,
    valueInputIsInvalid: phoneInputIsInvalid,
    valueInputChangeHandler: phoneInputChangeHandler,
    valueInputBlurHandler: phoneInputBlurHandler,
  } = useInput((value: any) => value.trim() !== '')

  let formIsValid = false
  // Om alla inputfält är validerade sätts form till true
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredPhoneIsValid
  ) {
    formIsValid = true
  }

  const firstNameClasses = !firstNameInputIsInvalid
    ? 'form-control'
    : 'form-control invalid'
  const lastNameClasses = !lastNameInputIsInvalid
    ? 'form-control'
    : 'form-control invalid'
  const emailClasses = !emailInputIsInvalid
    ? 'form-control'
    : 'form-control invalid'
  const phoneClasses = !phoneInputIsInvalid
    ? 'form-control'
    : 'form-control invalid'

  const firstNameErrorMessage = firstNameInputIsInvalid && (
    <p className="error-text">Namn är obligatorisk!</p>
  )
  const lastNameErrorMessage = lastNameInputIsInvalid && (
    <p className="error-text">Efternamn är obligatorisk!</p>
  )
  const emailErrorMessage = emailInputIsInvalid && (
    <p className="error-text">'Email är obligatorisk och måste vara i rätt format!</p>
  )
  const phoneErrorMessage = phoneInputIsInvalid && (
    <p className="error-text">Telefonnummer är obligatorisk!</p>
  )

  const [show,setShow] = useState(true)
  const [Date,setDate] = useState("")

  const postData = () => {
    let num = props.people
    let CreateReserve: ICreateReserve = {
      restaurantId: '624c2f5347678330c7a5c58e',
      date: `${props.date}`,
      time: `${props.time}`,
      numberOfGuests: num,
      customer: {
        name: enteredFirstName,
        lastname: enteredLastName,
        email: enteredEmail,
        phone: enteredPhone,
      },
    }
    let postData = new GetDataServices()
    postData.createBooking(CreateReserve)
  }

  const submitFormHandler = (e: any) => {
    e.preventDefault()

    postData()
    setShow(false)
    // Den gömmer tid knapparna i tablereservation komponenten
    props.changeBtns()
    setDate(props.date)
  }

  return (<>
    {show ? <form className="userFormDiv" onSubmit={submitFormHandler}>
      <div className={firstNameClasses}>
        <label htmlFor="name">Förnamn:</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={firstNameInputChangeHandler}
          onBlur={firstNameInputBlurHandler}
          value={enteredFirstName}
        />
        {firstNameErrorMessage}
      </div>
      <div className={lastNameClasses}>
        <label htmlFor="name">Efternamn: </label>
        <input
          id="name"
          type="text"
          name="lastname"
          onChange={lastNameInputChangeHandler}
          onBlur={lastNameInputBlurHandler}
          value={enteredLastName}
        />
        {lastNameErrorMessage}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailErrorMessage}
      </div>
      <div className={phoneClasses}>
        <label htmlFor="phone">Mobil: </label>
        <input
          id="phone"
          type="text"
          name="phone"
          onChange={phoneInputChangeHandler}
          onBlur={phoneInputBlurHandler}
          value={enteredPhone}
        />{' '}
        {phoneErrorMessage}
      </div>
      <div className="form-actions">
        <Button className="formBtn" disabled={!formIsValid}>
          Spara Bokning
        </Button>
      </div>
    </form>
      : <div className="thanksDiv">
        <p>
          Tack för din beställning <b>{enteredFirstName}</b>!<br></br> Ditt bord är reserverad för
          <b> klockan {props.time} den {Date}</b>
          <br></br> Välkommen åter.
        </p>
      </div>}
  </>
  )

}
