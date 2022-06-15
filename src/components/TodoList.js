import React, { useEffect, useState } from 'react'
import Createtasks from '../modals/Createtasks'
import Card from './Card';

function TodoList() {
    const [modal,setModal ] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(()=>{
        //string edilmiş arr objeye çevirildi
        let arr=localStorage.getItem("taskList")
        if(arr){
            let obj=JSON.parse(arr)
            setTaskList(obj)
        }
        
    },[])

    //silme butonu için fonksiyon oluşturuldu.
    //Sayfa yenilenmeden task silme için window.location.reload kullanıldı.
    const deleteTask= (index) => {
        let tempList=taskList
        tempList.splice(index,1)
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
    
    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
    const toggle = () => {
        setModal(!modal);
    }
    
    
    //Task List ögeleri taskList'e eklendi.LocalStorage 'a kaydedildi
    const saveTask = (taskObj) => {
        let tempList=taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList",JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
        
    }
  return (
    <>
    <div className='header text-center'>
        <h3>Todo List</h3>
        <button className='btn btn-primary mt-2 mb-5' style={{backgroundColor: "rgb(204,22,155)", border:"none"}} onClick={()=>{setModal(true)}}>Create Task</button>
    </div>
    <div className='task-container'>
        {
            taskList && taskList.map((obj,index)=> (<Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray}/>))
        }
    </div>
        <Createtasks toggle={toggle} modal={modal} save={saveTask}/>
    
    </>
  )
}

export default TodoList