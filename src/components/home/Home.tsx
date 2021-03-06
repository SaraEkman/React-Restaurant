import { Link } from 'react-router-dom'
import { Button } from '../styled-com/Button'
import './home.css'

export function Home() {
  // Hämtar vår  rastaurang id(kan tas bort men lämnas ifall att Sebastian vill titta på koden)

  // const [id,setId]=useState("")

  // useEffect(()=>{
  //     let idToGet = new GetDataServices();
  //     idToGet.getRestaurantId()
  //         .then((restaurantId) => {
  //             console.log(restaurantId);
  //             // setId(restaurantId.id)
  //         })
  // },[])

  return (
    <section className="mainSection">
      <div
        style={{ backgroundImage: 'url(./images/colosseum.jpg)' }}
        className="buttonsDiv"
      >
        {/* Knappar för att boka bord och till menyn */}
        <Link to={'/table-reservation'}>
          <Button>Boka bord</Button>
        </Link>
        <Link to={'/menu'}>
          <Button>Meny</Button>
        </Link>
      </div>
      <div className="pastaContent">
        <div>
          <h2>Pastolino-pasta</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
            ducimus aliquam error atque sed similique architecto quod doloribus
            nihil, perferendis dolorum nemo. Harum libero sint consectetur cum
            numquam aperiam enim!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos ratione dolor sit illum quibusdam, eius a odio maiores,
            nesciunt dolores officiis quod totam, nulla quam. Eius ad deserunt
            distinctio in.
          </p>
        </div>
        <img
          src="./images/pasta-luxe.jpg"
          width="100%"
          height="auto"
          alt="pasta"
        />
      </div>
      <div className="employeesContent">
        <img src="./images/chef.jpg" width="100%" height="auto" alt="chef" />
        <div>
          <h2>Vår pesonal</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            quibusdam dolores. Minus voluptas odit, quisquam fugiat iste
            perspiciatis, corporis labore animi at ducimus architecto maiores
            doloremque, laborum nulla et fugit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, et!
            Quasi cumque facilis sed ea illo quam repudiandae molestiae amet,
            veniam nisi voluptatibus in excepturi voluptatem recusandae
            voluptate, eaque ab.
          </p>
        </div>
      </div>
      <div className="aboutContent">
        <div className="family">
          <div>
            <h2>För familj...</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              nostrum, molestiae est suscipit voluptates molestias pariatur
              fugiat placeat quaerat. Quaerat aperiam et, voluptatum dolorum ut
              nesciunt aliquid iste eius ad?
            </p>
          </div>
          <img
            src="./images/family.jpg"
            width="50%"
            height="auto"
            alt="family"
          />
        </div>
        <div className="friends">
          <div>
            <h2>...och vänner</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
              animi! Expedita, amet? Ullam nisi modi dolore aspernatur. Vero
              quasi vitae, doloribus tenetur praesentium aliquam itaque
              voluptatem, error culpa rerum asperiores!
            </p>
          </div>
          <img
            src="./images/wine-food.jpg"
            width="50%"
            height="auto"
            alt="wine-food"
          />
        </div>
      </div>
    </section>
  )
  // Skapade vår restaurang för att kunna få id(kan också tas bort)

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
