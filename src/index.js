import './style.css'
import './todos.css'
import './modal.css'
import { Project } from "./projects.js";
import { TodosHandler } from './todosHandler';
import { TodosInterface } from './interface.js';

let exampleProject = new Project("example project");
let exampleProject2 = new Project("project crspy");
let projects = [exampleProject, exampleProject2];
TodosInterface.interfaceInit(projects);


TodosHandler.addTodo(projects[0],"do HW",new Date("2025-06-21T00:00"),"do my homework");
TodosHandler.addTodo(projects[0],"Tidy room",new Date("2025-06-19T12:30"),"tidy your room","don't procrascinate",[
    {name:"bedroom",state:false},
    {name:"desk",state:true},
    {name:"closet",state:false}
]
);
TodosHandler.addTodo(projects[0],"sleep",new Date("2025-06-23T03:10"),"go to bed","nonsense");

TodosHandler.addTodo(projects[1],"do crspy",new Date("2025-11-18T06:00"));
//filler cards
/* TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00"));
TodosHandler.addTodo(project,"do HW","do my homework",new Date("2025-06-21T00:00")); */

//end of filler cards
TodosInterface.projectFocus(projects[0].id);

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