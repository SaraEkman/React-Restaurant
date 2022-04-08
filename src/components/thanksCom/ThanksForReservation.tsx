export interface IThanks {
    name: string
    date: string
    time: string
}

export const ThanksForReservation = (props: IThanks) => {
  return (
    <div>
      {/* //         Tack  för din bestälning {props.name},
//         Ditt bord är reserverad för klockan {props.time} den {props.date}
//         Välkommen åter */}
    </div>
  )
}
