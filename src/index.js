import './style.css'
import './todos.css'
import './modal.css'
import { Project } from "./projects.js";
import { TodosHandler } from './todosHandler';
import { TodosInterface } from './interface.js';

let projectContainer = document.createElement("div");
projectContainer.classList.add("project-container");
let mainContainer = document.querySelector(".container");
mainContainer.appendChild(projectContainer);

let project = new Project();
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"Tidy room","tidy your room",new Date("2025-06-19T12:30"),"don't procrascinate",[
    {name:"bedroom",state:false},
    {name:"desk",state:true},
    {name:"closet",state:false}
]
);
TodosHandler.addTodo(project,"sleep","go to bed",new Date("2025-06-23T03:10"),"nonsense");

TodosInterface.displayTodos(projectContainer,project);

/* console.log("original order:");
console.log(JSON.parse(JSON.stringify(project)));

project.sortByPriority("DESC");
console.log("reversed order:");
console.log(JSON.parse(JSON.stringify(project)));

project.sortByDueDate("ASC");
console.log("ascending dueDate:");
console.log(JSON.parse(JSON.stringify(project)));

project.sortByDueDate("DESC");
console.log("descending dueDate:");
console.log(JSON.parse(JSON.stringify(project))); */

/* TodosHandler.removeTodo(project,project.list[1].id);
console.log(JSON.parse(JSON.stringify(project)));

TodosHandler.editChecklist(project,project.list[0].id,{english:false,french:false});
console.log(JSON.parse(JSON.stringify(project))); */