import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import UserCard from './components/UserCard';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Container } from '@mui/material';

function App() {
  const [users, setusers] = useState([]);
  const [newuserName, setnewUserName] = useState("");
  const [newEmail, setnewEmail] = useState("");


  const userData = collection(db, "users");

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(userData);
      // console.log(data);
      console.log(data.docs);
      const DataArr = data.docs;

      setusers(DataArr.map((item) => (
        {
          ...item.data(),
          id: item.id
        }
      ))
      )
    }

    getUserData();
  }, []);

  const createUser = async (newUsername, newEmail) => {

    await console.log(newUsername, newEmail);
    await addDoc(userData,
      {
        username: newUsername,
        email: newEmail
      });
    window.location.reload();
  }

  return (
    <div className="App">
      <Container>
        <h1>
          Firebase Demo CRUD App
        </h1>
        <br />
        <hr/>
        <br />
       

        <Form>
          <legend>Username</legend>
          <Input label="Required Text Field" required={true}
            onChange={(event) => setnewUserName(event.target.value)} />
          <legend>Email</legend>
          <Input label="Required Email Address" type="email" floatingLabel={true} 
          required={true}
            onChange={(event) => setnewEmail(event.target.value)} />


          <Button variant="raised"
            onClick={() => {
              createUser(newEmail, newuserName)
            }
            }>
            Create a new user
          </Button>
        </Form>
        <br />
        <br />
        <br />
       
        <br />
        {users.map((user) => {
          return (
            <UserCard user={user} />

          )
        })}
      </Container>


    </div>
  );
}

export default App;
