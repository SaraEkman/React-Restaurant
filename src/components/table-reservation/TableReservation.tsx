import { ChangeEvent, useEffect, useState } from 'react'
import { IReservation } from '../../models/interfaces/IReservation'
import { GetDataServices } from '../../services/GetDataServices'
import { UserForm } from '../user-form/UserForm'

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
  const [Bookings, setBookings] = useState<IReservation[]>([])

  const saveTheDate = (e: ChangeEvent<HTMLInputElement>) => {
    setInputDateValue(e.target.value)
  }

  const saveNumOfPeople = (e: any) => {
    setInputNumValue(e.target.value)
  }

  useEffect(() => {
    let getBookingsApi = new GetDataServices()
    getBookingsApi.getBookings().then((bookingsData) => {
      setBookings(bookingsData)
    })
  }, [])

  const checkData = () => {
    let same: IReservation[] = []
    setShowUserForm(false)
    setShowBtn18(true)
    setShowBtn21(true)

    Bookings.map((boking) => {
      if (boking.date === InputDateValue) {
        same.push(boking)
      }
    })

    let lists18: IReservation[] = []
    let lists21: IReservation[] = []

    same.map((boking) => {
      if (boking.time === '18:00') {
        lists18.push(boking)
      } else if (boking.time === '21:00') {
        lists21.push(boking)
      }
    })

    if (lists18.length >= 15) {
      console.log(lists18.length)
      setShowBtn18(false)
      setShowError18(true)
    }
    if (lists21.length >= 15) {
      console.log(lists21.length)
      setShowBtn21(false)
      setShowError21(true)
    }
    if (lists18.length >= 15 && lists21.length >= 15) {
      setShowError(true)
      setShowError18(false)
      setShowError21(false)
    } else setShowError(false)
  }

  const goToUserForm = (e: any) => {
    setTime(e.target.innerHTML)
    setShowUserForm(true)
  }

  let today = new Date().toLocaleDateString()

  return (
    <>
      <label>
        Antal personer:
        <input
          type="number"
          value={InputNumValue}
          max="6"
          min="1"
          onChange={saveNumOfPeople}
        />
      </label>
      <label>
        Datum
        <input
          type="date"
          id="date"
          name="date"
          min={today}
          value={InputDateValue}
          onChange={saveTheDate}
        />
      </label>
      <button type="submit" onClick={checkData}>
        Spara
      </button>

      {ShowBtn18 ? (
        <div>
          <button onClick={goToUserForm}>18:00</button>
        </div>
      ) : ShowError18 === true ? (
        <div>Tiden klockan 18 är upptagen 😢</div>
      ) : (
        <div></div>
      )}
      {ShowBtn21 ? (
        <div>
          <button onClick={goToUserForm}>21:00</button>
        </div>
      ) : ShowError21 === true ? (
        <div>Tiden klockan 21 är upptagen 😢</div>
      ) : (
        <div></div>
      )}

      {ShowError ? (
        <div>Tyvärr det finns inte tider i just denna datum 😰</div>
      ) : (
        <div></div>
      )}

      {ShowUserForm ? (
        <UserForm
          time={Time}
          date={InputDateValue}
          people={+InputNumValue}
        ></UserForm>
      ) : (
        <div></div>
      )}
    </>
  )
}
