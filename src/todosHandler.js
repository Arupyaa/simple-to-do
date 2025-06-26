import { Todos } from "./todos";
export { TodosHandler }

let TodosHandler = (function () {

    let addTodo = function (project, title, description, dueDate, notes = "", checklist = []) {
        let todo = new Todos(crypto.randomUUID(), title, description, dueDate, notes, checklist, project.list.length + 1);
        project.list.push(todo);
    }

    let removeTodo = function (project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1) {
            let removed = project.list.splice(index, 1);
            return removed.length == 1;
        }
        else
            return false;
    }

    let increasePriority = function (project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1 && index != 0) {
            let t = project.list[index];
            project.list[index] = project.list[index - 1];
            project.list[index - 1] = t;
        }
    }

    let decreasePriority = function (project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1 && index != project.list.length - 1) {
            let t = project.list[index];
            project.list[index] = project.list[index + 1];
            project.list[index + 1] = t;
        }
    }

    //proper input validation is handled by the DOM module
    let editTitle = makeAnEdit("title");
    let editDescription = makeAnEdit("description");
    let editDueDate = makeAnEdit("dueDate");
    let editNotes = makeAnEdit("notes");
    let editChecklist = makeAnEdit("checklist");
    let removeDescription = removeField("description");
    let removeNotes = removeField("notes");
    let removeChecklist = removeField("checklist");

    return { addTodo, removeTodo, increasePriority, decreasePriority, editTitle, editDescription, editDueDate, editNotes, editChecklist, removeDescription, removeNotes, removeChecklist };
})();

function makeAnEdit(editField) {
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

function removeField(field) {
    let remove = function (project, id) {
        let index = project.list.findIndex((todo) => todo.id == id);
        if (index != -1) {
            project.list[index][field] = undefined;
            return true;
        }
        else
            return false;
    }
    return remove;
}
