import { Todos } from "./todos";
import { Project } from "./projects";

class TodosHandler {
    addTodo(project, title, description, dueDate, notes = "", checklist = []) {
        let todo = new Todos(crypto.randomUUID(), title, description, dueDate, notes, checklist, project.list.length + 1);
        project.list.push(todo);
    }

    removeTodo(project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1) {
            let removed = project.list.splice(index, 1);
            return removed.length == 1;
        }
        else
            return false;
    }

    increasePriority(project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1 && index != 0) {
            let t = project.list[index];
            project.list[index] = project.list[index - 1];
            project.list[index - 1] = t;
        }
    }

    decreasePriority(project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1 && index != project.list.length-1) {
            let t = project.list[index];
            project.list[index] = project.list[index + 1];
            project.list[index + 1] = t;
        }
    }

    //proper input validation is handled by the DOM module
    editTitle = makeAnEdit(title);
    editDescription = makeAnEdit(description);
    editDueDate = makeAnEdit(dueDate);
    editNotes = makeAnEdit(notes);
    editChecklist = makeAnEdit(checklist);
}

let makeAnEdit = function (editField) {
    let edit = function (project, id, value) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1) {
            project.list[index][editField] = value;
            return true;
        }
        else
            return false;
    }
    return edit;
}

