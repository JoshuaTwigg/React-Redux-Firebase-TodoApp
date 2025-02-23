import { FaCheck } from 'react-icons/fa'; 
import { FaTrashAlt } from 'react-icons/fa'; 
import { FaPen } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { db, collection, addDoc,} from "../firebase"; // Import Firestore
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc,updateDoc } from "firebase/firestore";
import { query, where} from "firebase/firestore";
import { auth } from "../firebase";
import { FaCalendarAlt, FaCalendarDay } from 'react-icons/fa'; 
import './Todo.css';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateText } from '../redux/taskSlice'; 
import { deleteTask } from '../redux/taskSlice'; 
import { updateTask } from '../redux/taskSlice'; 

function Todo(){

    const user = auth.currentUser;   

    if (!user) {
      console.error("No users are logged in");
      alert("No users are logged in")
      return;
    }

    //select values from redux store/redux array
    // state.tasks = object which cannot be mapped. therefore state.tasks.tasks
    const tasks = useSelector(state => state.tasks.tasks);
    //debugging
    // console.log(Array.isArray(tasks) + "is the type of redux array")

    const dispatch = useDispatch();

    const[isVisible, setIsVisible] = useState(false);
    const[isVisibleTwo, setIsVisibleTwo] = useState(false);
    const[task,setTask] = useState("");
    const[date,setDate] = useState("");
    const[update,setUpdate] = useState("placeholder Text");
    const[addedTasks,setAddedTasks] = useState([]);

    //change status
    const updateItem = (id)=>{
        console.log("row to be updated" + id)

        //id is retrieved as the entire row has a task object, task.date,task.id etc
        dispatch(updateTask(id))
    }

    const updateTaskData = async (id) =>{
        console.log("row to be updated" + id)
        setIsVisibleTwo(!isVisibleTwo);

        console.log(update + " " + "is the update value")

        if (update !== "") {  
            try {  
                const docRef = doc(db, "tasks", id);
                //docref = id of db line
                await updateDoc(docRef, { task: update });  
                console.log(`Task with ID ${id} updated successfully.`);  
    
                
            } catch (error) {  
                console.error("Error updating task:", error);  
            }  
        }  

     
        if(update != ""){
            updateRedux(id);
        }
    }

    const updateRedux = (id) =>{
        dispatch(updateText({ id: id, updatedTaskText: update }));

    }

    const removeItem = async (id)=>{

        console.log("row to be deleted" + id)
        // console.log(typeof id)
        
       

        try {
            await deleteDoc(doc(db, "tasks", id));
            console.log(`Task with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
       

        //id is retrieved as the entire row has a task object, task.date,task.id etc
        dispatch(deleteTask(id))

    

    }

    const selectTasks = async (userId) => {
        try {
            
            const tasksRef = collection(db, "tasks");   
         
            const q = query(tasksRef, where("uid", "==", userId));
             
            const select = await getDocs(q);  
        
            const retrievedTasks = select.docs.map(doc => ({
                id: doc.id, 
                ...doc.data() 
            }));
    
            console.log("Tasks retrieved from Firestore:", retrievedTasks);
    
          
            setAddedTasks(retrievedTasks);

            dispatch(addTask(retrievedTasks));

        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };


    const submitItem = async (e)=>{
        e.preventDefault();

        if(!date){
            alert("please fill in all values")
            return
        }

        console.log("adding item to list")

       
     
    // Create a task object without the Firestore ID, only using local fields
    //to delete you need to use firestores docref.id
    const newTask = { 
        uid: user.uid,       
        task: task,
        dueDate: date,
        status: "incomplete",
    };

    try {
       
        const docRef = await addDoc(collection(db, "tasks"), newTask);
        console.log("Task added to Firestore with ID:", docRef.id);

        //passing db document/record firebase id which is unique as the id redux must use|that id is used for CRUD| and the entire task object is passed aswell.
        //its not an array so it is .pushed as a single task with redux
        const taskWithFirestoreId = {
            id: docRef.id, 
            ...newTask, 
        };

       
        dispatch(addTask(taskWithFirestoreId));

    } catch (error) {
        console.error("Error adding task:", error);
    }

       
    }

    return(
        <>
        
        <div >
                <Form.Group className="inputForm" >
                    <Form.Control type="text"placeholder="Enter A Task..." className="input" onChange={(e) => setTask(e.target.value)} required/>        
                        
                </Form.Group>
                <Form.Group className="inputFormTwo" >
                    <Form.Control   style={{ display: isVisible ? "inline-block" : "none" }} type="text"placeholder="DueDate: 2025/02/11" required className="input" onChange={(e) => setDate(e.target.value)}/>   
                    {isVisible && (<Form.Control type="text" className='updateBox' placeholder="update task text" onChange={(e) => setUpdate(e.target.value)} />)}
                </Form.Group>
                <Button className='button'  onClick={()=>setIsVisible(!isVisible)}>Add Date <FaCalendarAlt/></Button>
                {isVisible &&<Button className='button'  onClick={submitItem}>submit Task <FaPlus/></Button>}

        </div>
      
        <div>
            
            <Card className='card'>
                <div>
                        <Table striped bordered hover className='tHead' >
                            <thead >
                                <tr className='tHead'>
                                    <th className='tHead'>#</th>
                                    <th className='tHead'>Task</th>
                                    <th className='tHead'>Due Date</th>
                                    <th className='tHead'>Status <FaCheck  style={{ color: 'green' }}/></th>
                                </tr>
                            </thead>
                            <tbody className='tBody'>                  
                                {tasks.map((task, index) => (
                                    <tr key={index} className='tBody'>
                                        <td className='tBody' >{index + 1}</td> 
                                        <td className='tBody'>{task.task} </td>
                                        <td className='tBody'>{task.dueDate}</td>
                                        <td className='tBody'>{task.status}<FaCheck style={{ color: 'green', marginLeft: '10px' }} onClick={() => updateItem(task.id)}/> <FaPen style={{ color: 'blue', marginLeft: '10px' }} onClick={() => updateTaskData(task.id)} /> <FaTrashAlt  style={{ color: 'red', marginLeft: '10px' }} onClick={() => removeItem(task.id)}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                </div>
            </Card>
        </div>
        <div>
        {user && (<Button className='buttonTwo' onClick={()=> selectTasks(user.uid)}> select </Button>)}
                        
            </div>
           
        </>
    )
}

export default Todo;