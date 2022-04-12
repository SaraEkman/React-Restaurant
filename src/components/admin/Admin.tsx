import { ChangeEvent, useState } from 'react'

export function Admin() {
  const [Name, setName] = useState('')
  const [PassWord, setPassWord] = useState('')
  const [Show, setShow] = useState(false)

  const handleChangName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangPassWord = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value)
  }

  const handleClick = () => {
    let name: string = 'grupp2'
    let passWord: string = '123'

    if (name === Name && passWord === PassWord) {
      setShow(true)
    }
  }

  return (
    <>
      {Show === false && (
        <div>
          <label>Admins Namn</label>
          <input type="text" value={Name} onChange={handleChangName} />
          <label>Lösenord</label>
          <input type="text" value={PassWord} onChange={handleChangPassWord} />
          <button onClick={handleClick}>Logga in</button>
        </div>
      )}
      <p>Admin works!</p>
    </>
  )
}
