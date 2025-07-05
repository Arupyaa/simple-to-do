import './style.css'
import './todos.css'
import './modal.css'
import { Project } from "./projects.js";
import { TodosHandler } from './todosHandler';
import { TodosInterface } from './interface.js';
import { TodoReplacer } from './modal.js';
import { parse as dateParser } from 'date-fns';
import { Todos } from './todos.js';

/* window.localStorage.clear(); */

let exampleProject = new Project("example project");
let exampleProject2 = new Project("project crspy");
let projects = [exampleProject, exampleProject2];



TodosHandler.addTodo(projects[0], "do HW", new Date("2025-06-21T00:00"), "do my homework");
TodosHandler.addTodo(projects[0], "Tidy room", new Date("2025-06-19T12:30"), "tidy your room", "don't procrascinate", [
    { name: "bedroom", state: false },
    { name: "desk", state: true },
    { name: "closet", state: false }
]
);
TodosHandler.addTodo(projects[0], "sleep", new Date("2025-06-23T03:10"), "go to bed", "nonsense");

TodosHandler.addTodo(projects[1], "do crspy", new Date("2025-11-18T06:00"));

if(window.localStorage.getItem("myProjects") == null)
{
    let projectsSerialized = JSON.stringify(projects,TodoReplacer);
    window.localStorage.setItem("myProjects",projectsSerialized);
}
else
{
    projects = JSON.parse(window.localStorage.getItem("myProjects"),TodoParser);
}

TodosInterface.interfaceInit(projects);
TodosInterface.projectFocus(projects[0].id);

function TodoParser(key,value){
    if(value.hasOwnProperty("dueDate"))
    {
        let newDate = dateParser(value.dueDate,"yyyy-MM-dd'T'HH:mm",new Date());
        return new Todos(value['#id'],value.title,value.description,newDate,value.notes,value.checklist,value.priority);
    }
    else
        return value;
}