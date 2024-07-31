import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.svg';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);
  
  const inputname = useRef();
  const inputage = useRef();
  const inputemail = useRef();

  async function getUsers() {
    const userFromApi = await api.get('/users');
    setUsers(userFromApi.data);
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputname.current.value,
      age: inputage.current.value,
      email: inputemail.current.value
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro Usuário</h1>
        <input name="nome" type="text" ref={inputname} />
        <input name="idade" type="number" ref={inputage} />
        <input name="email" type="email" ref={inputemail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;