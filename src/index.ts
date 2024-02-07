import {v4 as uuidV4} from "uuid"

type Task={
    id:string,
    title:string,
    completed:boolean,
    createdAt:Date
}

const list=document.querySelector<HTMLUListElement>("#list");

const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")


const task:Task[]=[];

form?.addEventListener("submit",e=>{
    e.preventDefault();

    if(input?.value=="" || input?.value==null)return  // ? --> optional chaining 

    const newTask:Task={
        id:uuidV4(),
        title:input.value,
        completed:false,
        createdAt:new Date()
    }
    
    task.push(newTask);
    saveTask();

    addListItem(newTask)
    input.value="";
})


function addListItem(task:Task){
    const item=document.createElement("li");
    const label=document.createElement("label");
    const checkbox=document.createElement("input");


    checkbox.addEventListener("change",()=>{
        task.completed=checkbox.checked;
        saveTask();
    })

    checkbox.type="checkbox";
    checkbox.checked=task.completed;
    label.append(checkbox,task.title);
    item.appendChild(label);
    list?.append(item)
}


function saveTask(){
    localStorage.setItem("Tasks",JSON.stringify(task));
}

function loadTask():Task[]{
    const taskJSON=localStorage.getItem("Tasks")
    if(taskJSON==null) return []
    return  JSON.parse(taskJSON);
}

