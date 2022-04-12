// export interface IThanks {
//     name: string
//     date: string
//     time: string
// }

export const ThanksForReservation = () => {
  let data = JSON.parse(localStorage.getItem('ReservationInfo') || '[]')

  return (
    <div>
      Tack för din bestälning {data[0]}, Ditt bord är reserverad för klockan{' '}
      {data[1]} den {data[2]} Välkommen åter
    </div>
  )
}
