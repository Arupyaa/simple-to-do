import { format as dateFormat } from "date-fns";
export { TodosInterface };

let TodosInterface = (function () {
    let displayTodos = function (container, project) {
        project.list.forEach(todo => {

            let card = document.createElement("div");
            card.classList.add("todo-card");
            let header = document.createElement("div");
            header.textContent = todo.priority;
            let title = document.createElement("h3");
            title.textContent = todo.title;
            let description = document.createElement("p");
            description.textContent = todo.description;
            let dueDate = document.createElement("div");
            dueDate.textContent = dateFormat(todo.dueDate, "do MMM yyyy, h:m aa");
            let notes = document.createElement("p");
            notes.textContent = todo.notes;
            let checklist = document.createElement("ul");
            if (todo.checklist != undefined) {
                todo.checklist.forEach(element => {
                    let list = document.createElement("li");
                    let task = document.createElement("div");
                    task.textContent = element.name;
                    let checkbox = document.createElement("input");
                    checkbox.setAttribute("type", "checkbox");
                    if (element.state)
                        checkbox.setAttribute("checked", "");
                    task.appendChild(checkbox);
                    list.appendChild(task);
                    checklist.appendChild(list);
                })
            }

            card.appendChild(header);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(dueDate);
            card.appendChild(notes);
            card.appendChild(checklist);
            container.appendChild(card);

        });

    };

    return { displayTodos };
})();