import { ChangeEvent, useState } from "react";

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
  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;

    setNewCustomer({ ...newCustomer, [name]: e.target.value });
  }
  console.log(newCustomer);

  const handleClickWithArgs = (msg: string) => {
    console.log(msg);
  };

  return (
    <>
      <form>
        <label>Förnamn</label>
        <input
          type="text"
          name="firstname"
          value={newCustomer.firstname}
          onChange={handleClick}
        />
        <input
          type="text"
          name="lastname"
          value={newCustomer.lastname}
          onChange={handleClick}
        />
        <input
          type="text"
          name="mobil"
          value={newCustomer.mobil}
          onChange={handleClick}
        />
        <input
          type="email"
          name="email"
          value={newCustomer.email}
          onChange={handleClick}
        />
      </form>
      <button
        type="button"
        onClick={() => {
          handleClickWithArgs("Det fungerar!");
        }}
      >
        Spara Bokning
      </button>
    </>
  );
}
