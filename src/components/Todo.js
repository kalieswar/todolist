import {Button, List, ListItem, ListItemAvatar, ListItemText, TextField} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { myStore } from '../firebase/Config';
import { doc,deleteDoc, updateDoc } from 'firebase/firestore';
import '../../src/components/todo.css'
import { useState } from 'react';

const Todo = ({arr})=>{
    const [editing, setEditing ] = useState(false);
    const [editedTodo, setEditedTodo] = useState(arr.item.todo)

    const handleEdit = async ()=>{
        try{
            const todoRef = doc(myStore, "todos",arr.id);
            await updateDoc(todoRef, { todo: editedTodo});
            setEditing(false);
        }catch(error){
            console.error("Error updating: ", error)
        }
    }
    return(
        <List className='todo__list container'>
            <ListItem>
                <ListItemAvatar/>
                {editing ? (
                    <>
                    <TextField value={editedTodo} onChange={(e)=> setEditedTodo(e.target.value)}/>
                    <Button variant="contained" onClick={handleEdit}>Save</Button>
                    </>
                 ) : (
             <>
                    <ListItemText primary={arr.item.todo}/>
                    <Button onClick={()=> setEditing(true)}><EditIcon/></Button>
                    </>
                    
                    )}
                
            </ListItem>
            <DeleteIcon color='error' fontSize='large' style={{opacity: 1}} onClick={()=>{deleteDoc(doc(myStore,"todos", arr.id))}}/>
        </List>
    )
}

export default Todo;