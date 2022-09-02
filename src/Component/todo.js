import React from 'react';
import { useState } from 'react';
import todos from '../images/todos.png'
const Todo = () => {
    const [item,setItems] =useState('');
    const [list,setList] =useState([]);

    function addItems() {
        if(!item){

        }else{
            setList([...list,item])
            setItems('');
        }
    }
    function remove(index){
         const updatedList = list.filter((ele,ind)=>{
            return ind !== index
         });
         setList(updatedList)
    }
return(
    <>
    <div className='main_container'>
        <div className='todo_container'>
      
         <figure>
            <img src={todos} alt="todo_logo" id='todo-logo'/> 
         </figure>
         <figcaption>React Todo App</figcaption>

         <div className="addItems">
            <input type="text" placeholder='Add Items here!' value={item} onChange={(e)=> setItems(e.target.value)} />
            <button onClick={addItems}> Add <i class="fa-solid fa-plus" title='Add Itmes'></i></button> 
        </div>

        <div className="showItems">
            {
                list.map((elem,id)=>{
                  return(
                    <div className="eachItems" key={id}>
                    <span><h3>{elem}</h3></span>
                    <button onClick={()=>remove(id)}> Delete </button> 
                </div>
                  )
                })
            }
           
        </div>
        </div>
    </div>
    </>
)
}
export default Todo;