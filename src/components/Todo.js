import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { myStore } from '../firebase/Config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import '../../src/components/todo.css'
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Todo = ({ arr }) => {
    const [editing, setEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(arr.item.todo);
    const [status, setStatus] = useState(); 
    const [dat, setDat] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        let getDate = new Date();
        let getMonth = getDate.getMonth() + 1;
        let currentDate =  getDate.getDate() + '/' + getMonth + '/' + getDate.getFullYear() + ',' + getDate.getHours() + ':' + getDate.getMinutes()


        setDat(currentDate)
    },[])


    const handleDelete = (id) => {
        confirmAlert({
          title: 'Delete the task',
          message: 'Are you sure you need to delete this task ?',
          buttons: [
            {
              label: 'Yes',
              style:{color:"white",backgroundColor:"green"},
              onClick: () => { deleteDoc(doc(myStore, "todos", id)) }
            },
            {
              label: 'No',
              style:{color:"white", backgroundColor:"red"}
            }
          ]
        });
      };

    const handleEdit = async () => {
        try {
            const todoRef = doc(myStore, "todos", arr.id);
            await updateDoc(todoRef, { todo: editedTodo });
            setEditing(false);
        } catch (error) {
            console.error("Error updating: ", error)
        }
    }
    const taskEdit = async (newStatus) => {
        try {
            const todotask = doc(myStore, "todos", arr.id);
            await updateDoc(todotask, { status: newStatus, finish: dat });
            setStatus(newStatus)
        } catch (error) {
            console.error("Error Status Updating: ", error)
        }

    }
    return (
        <>
        <List className={arr.item.status === 'Pending' ? 'todo__list-pending shadow-lg' : 'todo__list-finished shadow-lg'} >
            <ListItem>
                <ListItemAvatar />
                {editing ? (
                    <>
                        <TextField value={editedTodo} onChange={(e) => setEditedTodo(e.target.value)} />
                        <Button variant="contained" onClick={handleEdit}>Save</Button>
                    </>
                ) : (
                    <>
                        <ListItemText primary={arr.item.todo} secondary={"Created at " + arr.item.timestamp}  />
                        <ListItemText primary=
                            {arr.item.status === "Finished" ? (arr.item.status) : (
                                <>
                                    <DropdownButton title="Todo Status">
                                        <Dropdown.Item onClick={() => {
                                            taskEdit("Finished");
                                        }}>Finished</Dropdown.Item>
                                    </DropdownButton>
                                </>
                            )}
                            secondary={arr.item.status === "Finished" ? "Finished at: " + arr.item.finish :  arr.item.status} />
                        {arr.item.status === "Finished" ? (null) : (<Button onClick={() => setEditing(true)}><EditIcon /></Button>)}
                    </>

                )}

            </ListItem>
            <RemoveRedEyeIcon onClick={handleShow} fontSize='large' style={{opacity:1 , cursor:"pointer", paddingRight:"10px", color:"orange"}}/>
            <DeleteIcon color='error' fontSize='large' style={{ opacity: 1, cursor: "pointer" }} onClick={() => handleDelete(arr.id)} />
        </List> 
        <Modal show={show} onHide={handleClose} className='shadow-lg'> 
        <Modal.Header closeButton>
          <Modal.Title>Task Name: {arr.item.todo}</Modal.Title>
            </Modal.Header>
        <Modal.Body>
            <h4 className='py-4'>Task Created Date & Time: {arr.item.timestamp}</h4>
            <h4 className='py-4'>Task Status: {arr.item.status}</h4>
            <h4 className='py-4'>Task Finished Date & Time: {arr.item.status === "Finished" ? arr.item.finish : "Time will be updated after finishing the task"}</h4>
        </Modal.Body>
      </Modal>
      </>
    )
}

export default Todo;