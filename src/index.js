import './style.css'
import { Project } from "./projects.js";
import { TodosHandler } from './todosHandler';

let project = new Project();
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"Tidy room","tidy your room",new Date("2025-06-21T12:30"),"don't procrascinate",{
    bedroom:false,
    desk:false,
    closet:false
});
TodosHandler.addTodo(project,"sleep","go to bed",new Date("2025-06-23T03:10"),"nonsense");

TodosHandler.removeTodo(project,project.list[1].id);
console.log(JSON.parse(JSON.stringify(project)));

TodosHandler.editChecklist(project,project.list[0].id,{english:false,french:false});
console.log(JSON.parse(JSON.stringify(project)));