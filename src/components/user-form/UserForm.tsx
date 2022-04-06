import { useState } from "react";

interface INewCustomer {
  firstname: string;
  lastname: string;
  mobil: number;
  email: string;
}

export function UserForm() {
  const [newCustomer, setNewCustomer] = useState<INewCustomer>({
    firstname: "",
    lastname: "",
    mobil: 0,
    email: "",
  });
  return (
    <>
      <form>
        <label>Förnamn</label>
        <input type="text" name="firstname" />
        <input type="text" name="firstname" />
        <input type="text" name="firstname" />
        <input type="email" name="firstname" />
      </form>
      <button>Spara Bokning</button>
    </>
  );
}
