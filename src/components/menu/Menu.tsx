import { useState } from "react";

import menuJson from "../../data/menu.json";
import { IDish, IMenu } from "../../models/IMenu";

export function Menu() {
  const [menu] = useState<IMenu[]>(menuJson);

  function menuDish(dish: IDish, i: number) {
    return (
      <li key={i}>
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>
        <p>{dish.sek} kr</p>
      </li>
    );
  }
  return (
    <>
      {menu.map((menuPart, i: number) => {
        return (
          <div key={i}>
            <div>
              <h2>{menuPart.title}</h2>
              <ul>{menuPart.dishes.map(menuDish)}</ul>
            </div>
            <div>
              {menuPart.imagePath && (
                <img width={400} src={menuPart.imagePath} alt="" />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
