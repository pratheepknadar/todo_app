import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';
import { MdDelete, MdEdit, MdEditRoad } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {
  const[isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription,
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);   
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = index  =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy =now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn = `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn:CompletedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));

  };

const handleDeleteCompletedTodo = (index) => {
  let reducedTodo = [...completedTodos];
  reducedTodo.splice(index,1)

  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);


}


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo) {
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);  
    }
  },[]);

 const handleEdit = (ind,item) =>{
  console.log(ind)
  setCurrentEdit(ind);
  setCurrentEditedItem(item);
 }

 const handleUpdateTitle = (value)=>{
  setCurrentEditedItem((prev) =>{
    return {...prev,title:value}
  })
 }

 const handleUpdateDescription = (value)=>{
  setCurrentEditedItem((prev) =>{
    return {...prev,description:value}
  })
 }
  
const handleUpdateTodo = () =>{
  let newToDo = [...allTodos];
  newToDo[currentEdit] = currentEditedItem;
  setTodos(newToDo);
  setCurrentEdit(null);
}

  return (
    <div className="App">
     <h1> My Todos</h1>
   
    <div className='todo-wrapper'>
     <div className= 'todo-input'>
      <div className = 'todo-input-item'>
        <label>Title</label>
        <input type='text' value= {newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what's the task ?"/>
      </div>

      <div className = 'todo-input-item'>
        <label>Description</label>
        <input type='text' value= {newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="what's the description ?"/>
      </div>

      <div className = 'todo-input-item'>
        <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
      </div>
      </div>
     <div className='btn-area'>
      <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick ={()=> setIsCompleteScreen(false)}>Todo</button>
      <button className= {`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick ={()=> setIsCompleteScreen(true)}>Completed</button>
     </div>
     
     <div className='todo-list'>
      
      {isCompleteScreen=== false && allTodos.map((item,index)=> {
        if (currentEdit === index){
           return (
            <div className= 'edit_wrapper' key ={index}>
            <input placeholder= 'Updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title} /> 
             
             <textarea placeholder= 'Updated Title' onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />
              <button type='button' onClick={handleUpdateTodo}>Update</button>
             </div>
           )
      }
        else{
          return  (
            <div className= 'todo-list-item' key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
  
          <div>
        <MdDelete className='icon' onClick={()=>handleDeleteTodo(index)}  ></MdDelete>
        <FaCheck className='check-icon' onClick={()=>handleComplete(index)} ></FaCheck>

        <MdEdit className='check-icon' onClick={()=>handleEdit(index,item)}></MdEdit>
       </div>
        </div>
          )
        }
      })}


      {isCompleteScreen=== true && completedTodos.map((item,index)=> {
        return  (
          <div className= 'todo-list-item' key={index}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
       <p><small>Completed On {item.CompletedOn}</small></p>
        <div>
      <MdDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}  ></MdDelete>

     </div>
      </div>
        )
      })}

     

     </div>
     
    </div>
    </div>
  );
}

export default App;
