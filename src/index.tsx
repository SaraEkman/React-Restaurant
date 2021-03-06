import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/home/Home";
import { Admin } from "./components/admin/Admin";
import { Contact } from "./components/contact/Contact";
import { Menu } from "./components/menu/Menu";
import { TableReservation } from "./components/table-reservation/TableReservation";
import { NotFound } from "./components/not-found/NotFound";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/table-reservation" element={<TableReservation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
