import { ChangeEvent, useEffect, useState } from 'react'
import { Toggle } from 'react-bootstrap/lib/Dropdown'
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
  const [isActive18, setIsActive18] = useState(false)
  const [isActive21, setIsActive21] = useState(false)

  const [ShowBtnGetTime,setShowBtnGetTime] = useState(true)
  const [InputDateValue, setInputDateValue] = useState('')
  const [InputNumValue, setInputNumValue] = useState('')
  const [Bookings, setBookings] = useState<IReservation[]>([])
  // Hämtar bokningar
  useEffect(() => {
    let getBookingsApi = new GetDataServices()
    getBookingsApi.getBookings().then((bookingsData) => {
      setBookings(bookingsData)
    })
  }, [])

  useEffect(() => {
     if (InputDateValue !== "" && InputNumValue !== "") {
      setShowBtnGetTime(false)
    }else if(InputDateValue === "" && InputNumValue === "") setShowBtnGetTime(true)
  }, [InputNumValue && InputDateValue])
  
   useEffect(() => {
     if (Time === "18:00") {
      setIsActive18(true)
    }else if (Time === "21:00") setIsActive18(false)
     if (Time === "21:00") {
      setIsActive21(true)
    } else if (Time === "18:00") setIsActive21(false)
    
  },[Time])

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
    setIsActive18(false)
    setIsActive21(false)

    Bookings.map((boking) => {
      if (boking.date === InputDateValue) {
        sameDate.push(boking)
      }
    })
    // Antal bord besökaren önskar boka
    const numOfTables = Math.ceil(+InputNumValue / 6)

    // Antal bord som finns bokade för kl18 eller 21 i APIet
    let numOfTables18:number[]=[]
    let numOfTables21:number[]=[]

    sameDate.map((boking) => {
      if (boking.time === '18:00') {
        numOfTables18.push(Math.ceil(boking.numberOfGuests / 6))
      } else if (boking.time === '21:00') {
        numOfTables21.push(Math.ceil(boking.numberOfGuests/6))
      }
    })
    let sum18 = 0
    let sum21 = 0
    numOfTables18.forEach((table) => {
      sum18 = sum18 + table 
    })
    numOfTables21.forEach((table) => {
      sum21 = sum21 + table 
    })
   
    if (numOfTables +sum18 > 15) {
      setShowBtn18(false)
      setShowError18(true)
    }
    if (numOfTables + sum21>15) {
      setShowBtn21(false)
      setShowError21(true)
    }
    if (
      numOfTables +sum18 > 15 &&
      numOfTables +sum21 > 15
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

  const Toggle = () => {
    setShowBtn18(false)
    setShowBtn21(false)
    setInputDateValue("")
    setInputNumValue("")
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
        <Button disabled={ShowBtnGetTime} type="submit" onClick={checkData}>
          Hitta tid
        </Button>

      <div className="btnDiv">
        {ShowBtn18 ? (
          <div>
            <Button className={isActive18 ?  "btnActive" : "btnInactive"} onClick={goToUserForm}>18:00</Button>
          </div>
        ) : ShowError18 === true ? (
          <div className='errorMessage'>Tiden klockan 18 är upptagen!</div>
        ) : (
          <div></div>
        )}
        {ShowBtn21 ? (
          <div>
            <Button className={isActive21 ?  "btnActive" : "btnInactive"} onClick={goToUserForm}>21:00</Button>
          </div>
        ) : ShowError21 === true ? (
          <div className='errorMessage'>Tiden klockan 21 är upptagen!</div>
        ) : (
          <div></div>
        )}
      </div>

      {ShowError ? (
        <div className='errorMessage'>Tyvärr det finns ingen ledig tid för valda datumet 😰</div>
      ) : (
        <div></div>
      )}

      {ShowUserForm ? (
        <UserForm
          time={Time}
          date={InputDateValue}
          people={+InputNumValue}
          changeBtns={Toggle}
        ></UserForm>
      ) : (
        <div></div>
      )}
    </Div>
  )
}
