import { Button, TextField } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import { myStore } from './firebase/Config';
import { collection, onSnapshot, serverTimestamp, addDoc, orderBy, query } from 'firebase/firestore';

const q = query(collection(myStore, 'todos'), orderBy('timestamp', 'desc'))
function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data()
      })))
    })
  }, [input])
  
  const addTodo = (e) => {
    e.preventDefault();
    if (input.length > 0) {

      addDoc(collection(myStore, "todos"), {
        todo: input,
        timestamp: serverTimestamp()
      })
      setInput("")
    }
  }
  return (
    <div className="App">
      <h2>To Do List</h2>
      <form>
        <TextField id='outlined-basic' label="Make Todo" variant='outlined' style={{ margin: "0px 5px" }} size='small' value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={addTodo}>Add Todo</Button>
      </form>
      <ul>
        {todos.map(item => <Todo key={item.id} arr={item} />)}
      </ul>
    </div>
  );
}

export default App;
