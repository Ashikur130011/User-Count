import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect( () => {
    fetch ('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = e => {
    const name= nameRef.current.value;
    const email= emailRef.current.value;
    const newUser = {name: name, email: email}

    fetch('http://localhost:5000/users', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {console.log(data)
      const addedUser = data;
      const newUsers = [...users, addedUser]
      setUsers(newUsers)
    })
    
    nameRef.current.value = '';
    emailRef.current.value='';

      e.preventDefault();
  }
  return (
    <div className="App">
      <h1>Number of users: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="Enter your mail" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li
          key={user.id}
          >{user.id}. Name: {user.name}, Mail: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
