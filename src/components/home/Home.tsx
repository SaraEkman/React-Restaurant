import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <Link to={'/table-reservation'}>
        <button>Boka bord</button>
      </Link>

      <button>Meny</button>
    </>
  )

  // useEffect(() => {
  //    axios
  //   .post(
  //     'https://school-restaurant-api.azurewebsites.net/restaurant/create',
  //     {
  //       name: 'grupp2',
  //       address: {
  //         street: 'Kungsgatan 1',
  //         zip: '123 45',
  //         city: 'Stockholm',
  //       },
  //     },
  //     {
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     },
  //   ).then(res=>console.log(res.data))
  // },[])
}
