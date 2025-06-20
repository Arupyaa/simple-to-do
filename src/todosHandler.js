import { Todos } from "./todos";
import { Project } from "./projects";

class TodosHandler {
    addTodo(project,title,description,dueDate,notes = "",checklist = []){
        let todo = new Todos(crypto.randomUUID(),title,description,dueDate,notes,checklist,project.list.length+1);
        project.list.push(todo);
    }
    removeTodo(project,id){
        let index = project.list.findIndex((todo)=>todo.id == id );
        let removed = project.list.splice(index,1);
        return removed.length ==1;
    }
    editTodo(){}
}