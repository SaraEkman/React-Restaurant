import { Button } from '../styled-com/Button'
import './contact.css'

export function Contact() {
  return (
    <div className='contactContainer'>
      <div className='contactUs'>
        <address>
            Pastolino
            <br />
            Kungsportsavenyn 22
            <br />
            411 36 Göteborg <br />
            <br />
            <a href="contact@pastolino.com" className="mail">
              contact@pastolino.com
            </a>
            <br />
            <br />
            Telefon:{' '}
            <a href="tel:+46761364241" className="phoneNumber">
              0761364241
            </a>
        </address>
      <div className="map">
        <span>📌</span>
      </div>
      </div>
      <form className='addressForm'>
       <input type="text" placeholder='Förnamn' />
       <input type="text" placeholder='Efternamn' />
       <input type="text" placeholder='E-post' />
        <input type="text" placeholder='Telefonnummer' />
        <textarea name="Meddelande" id="sms" cols={40} rows={10}></textarea>
        <Button>Skicka</Button>
      </form>

    </div>
  )
}
