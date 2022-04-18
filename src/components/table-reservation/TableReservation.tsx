import { ChangeEvent, useEffect, useState } from 'react'
import { IReservation } from '../../models/interfaces/IReservation'
import { GetDataServices } from '../../services/GetDataServices'
import { Button } from '../styled-com/Button'
import { Div } from '../styled-com/Div'
import { UserForm } from '../user-form/UserForm'
import './tableReservation.css'

export function TableReservation() {
  const [ShowBtn18, setShowBtn18] = useState(false)
  const [ShowBtn21, setShowBtn21] = useState(false)
  const [ShowError, setShowError] = useState(false)
  const [ShowError18, setShowError18] = useState(false)
  const [ShowError21, setShowError21] = useState(false)
  const [ShowUserForm, setShowUserForm] = useState(false)
  const [Time, setTime] = useState('')

  const [InputDateValue, setInputDateValue] = useState('')
  const [InputNumValue, setInputNumValue] = useState('')
  const [NumOfTables, setNumOfTables] = useState(0)
  const [Bookings, setBookings] = useState<IReservation[]>([])
  // Hämtar bokningar
  useEffect(() => {
    let getBookingsApi = new GetDataServices()
    getBookingsApi.getBookings().then((bookingsData) => {
      setBookings(bookingsData)
    })
  }, [])
  // Sparar datum som användaren väljer
  const saveTheDate = (e: ChangeEvent<HTMLInputElement>) => {
    setInputDateValue(e.target.value)
  }
  // Sparar antal personer
  const saveNumOfPeople = (e: any) => {
    setInputNumValue(e.target.value)
  }
  // Vi kontrollerar data och kollar om det finns ledig tid-körs på hitta tid knappen
  const checkData = () => {
    // Skapar en lista som innehåller alla bokningar på det datumet användaren har valt
    let sameDate: IReservation[] = []
    setShowUserForm(false)
    setShowBtn18(true)
    setShowBtn21(true)

    Bookings.map((boking) => {
      if (boking.date === InputDateValue) {
        sameDate.push(boking)
      }
    })

    const numOfTables = Math.ceil(+InputNumValue / 6)
    setNumOfTables(numOfTables)

    let list18: IReservation[] = []
    let list21: IReservation[] = []

    sameDate.map((boking) => {
      if (boking.time === '18:00') {
        list18.push(boking)
      } else if (boking.time === '21:00') {
        list21.push(boking)
      }
    })

    if (list18.length > 15 - numOfTables) {
      console.log(list18.length)
      setShowBtn18(false)
      setShowError18(true)
    }
    if (list21.length > 15 - numOfTables) {
      console.log(list21.length)
      setShowBtn21(false)
      setShowError21(true)
    }
    if (
      list18.length > 15 - numOfTables &&
      list21.length > 15 - numOfTables
    ) {
      setShowError(true)
      setShowError18(false)
      setShowError21(false)
    } else setShowError(false)
  }

  const goToUserForm = (e: any) => {
    // sparar tiden från knappen (18 eller 21) för att kunna skicka vidare
    setTime(e.target.innerHTML)
    setShowUserForm(true)
  }

  let today = new Date().toLocaleDateString()

  return (
    <Div className="bookingDiv">
        <label>
          Antal personer:{' '}
          <input
            type="number"
            value={InputNumValue}
            min="1"
            onChange={saveNumOfPeople}
          />
        </label>
        <label>
          Datum:{' '}
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            value={InputDateValue}
            onChange={saveTheDate}
          />
        </label>
        <Button type="submit" onClick={checkData}>
          Hitta tid
        </Button>

      <div className="btnDiv">
        {ShowBtn18 ? (
          <div>
            <Button onClick={goToUserForm}>18:00</Button>
          </div>
        ) : ShowError18 === true ? (
          <div>Tiden klockan 18 är upptagen</div>
        ) : (
          <div></div>
        )}
        {ShowBtn21 ? (
          <div>
            <Button onClick={goToUserForm}>21:00</Button>
          </div>
        ) : ShowError21 === true ? (
          <div>Tiden klockan 21 är upptagen</div>
        ) : (
          <div></div>
        )}
      </div>

      {ShowError ? (
        <div>Tyvärr det finns ingen ledig tid för valda datumet 😰</div>
      ) : (
        <div></div>
      )}

      {ShowUserForm ? (
        <UserForm
          time={Time}
          date={InputDateValue}
          people={+InputNumValue}
          numOfTables={NumOfTables}
        ></UserForm>
      ) : (
        <div></div>
      )}
    </Div>
  )
}
