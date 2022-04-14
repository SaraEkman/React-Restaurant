// export interface IThanks {
//     name: string
//     date: string
//     time: string
// }
import { Div } from '../styled-com/Div'
import './thanks.css'

export const ThanksForReservation = () => {
  let data = JSON.parse(localStorage.getItem('ReservationInfo') || '[]')

  return (
    <Div className="thanksDiv">
      <p>
        Tack för din beställning <b>{data[0]}</b>!<br></br> Ditt bord är reserverad för
        <b> klockan {data[1]} den {data[2]}</b>
        <br></br> Välkommen åter.
      </p>
    </Div>
  )
}
