import React from "react";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to={""}>Hom</Link>
          </li>
          <li>
            <Link to={"/about"}>Om oss</Link>
          </li>
          <li>
            <Link to={"/contact"}>Kontakt</Link>
          </li>
          <li>
            <Link to={"/menu"}>Meny</Link>
          </li>
          <li>
            <Link to={"/table-reservation"}>Boka bord</Link>
          </li>
          <li>
            <Link to={"/admin"}>Logga in</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p>Kontakt information</p>
        <ul>
          <li>Linkedin</li>
          <li>Facebook</li>
          <li>instagram</li>
        </ul>
      </footer>
    </React.Fragment>
  );
}
