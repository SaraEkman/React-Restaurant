import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './layout.css'

export function Layout() {
  return (
    <React.Fragment>
      <nav className="nav">
        <h1>
          Pastolino<span>🍝</span>
        </h1>
        <ul>
          <li>
            <NavLink
              to={''}>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to={'/contact'}>
              Kontakt
            </NavLink>
          </li>
          <li>
            <NavLink  to={'/menu'} >
              Meny
            </NavLink>
          </li>
          <li>
            <NavLink to={'/table-reservation'} >
              Boka bord
            </NavLink>
          </li>
          <li>
            <NavLink to={'/admin'}>
              Admin
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="adress">
          <h3>Kontakt information</h3>
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
        </div>
        <div className="socialMedia">
          <h3>Följ oss på:</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/">Linkedin</a>
            </li>
            <li>
              <a href="https://www.facebook.com/">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/">Instagram</a>
            </li>
          </ul>
        </div>
      </footer>
    </React.Fragment>
  )
}
