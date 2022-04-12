import { useState, Fragment } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";

import menuJson from "../../data/menu.json";
import { IDish, IMenu } from "../../models/IMenu";

export function Menu() {
  const [menu] = useState<IMenu[]>(menuJson);

  function menuDish(dish: IDish, i: number) {
    return (
      <Fragment key={i}>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <p className="mb-5">{dish.sek} kr</p>
      </Fragment>
    );
  }
  return (
    <Container fluid>
      {menu.map((menuPart, i: number) => {
        return (
          <Row
            key={i}
            className={`${i % 2 === 1 ? "flex-md-row-reverse" : ""}`}
          >
            <Col className="text-center px-5" xs={12} md={6}>
              <h2 className="my-5">{menuPart.title}</h2>
              {menuPart.dishes.map(menuDish)}
            </Col>
            <Col className="px-0" xs={12} md={6}>
              {menuPart.imagePath && (
                <Image
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                  src={menuPart.imagePath}
                  alt=""
                />
              )}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
}
