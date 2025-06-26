import { TodosHandler } from "./todosHandler";
import { TodosInterface } from "./interface.js";
import { parse as parseDate } from "date-fns";
export { modal };

let modal = (function () {
    let _project = [], _id = "", _checklist = undefined;
    let modal = document.createElement("dialog");
    modal.classList.add("modal");
    document.body.appendChild(modal);
    modal.addEventListener("close", () => {

        if (modal.returnValue != "") {
            switch (modal.dataset.state) {
                case "title":
                    TodosHandler.editTitle(_project, _id, modal.returnValue);
                    TodosInterface.editTitle(_id, modal.returnValue);
                    break;
                case "description":
                    TodosHandler.editDescription(_project, _id, modal.returnValue);
                    TodosInterface.editDescription(_id, modal.returnValue);
                    break;
                case "notes":
                    TodosHandler.editNotes(_project, _id, modal.returnValue);
                    TodosInterface.editNotes(_id, modal.returnValue);
                    break;
                case "dueDate":
                    let dueDateValue = parseDate(modal.returnValue, "yyyy-MM-dd'T'HH:mm", new Date());
                    TodosHandler.editDueDate(_project, _id, dueDateValue);
                    TodosInterface.editDueDate(_id, dueDateValue);
                    break;
                case "checklist":
                    if(modal.returnValue == "submit")
                    {
                        let list = Array.from(_checklist.querySelectorAll("li"));
                        let returnedList = [];
                        list.forEach((li) =>{
                            let listName = li.querySelector("input[type='text']");
                            //skip item if empty
                            if(listName.value == "")
                                return;

                            let listCheckbox = li.querySelector("input[type='checkbox']");
                            let obj = {};
                            obj.name = listName.value;
                            let test = listCheckbox.checked; //test
                            obj.state = listCheckbox.checked;
                            returnedList.push(obj);
                        });
                        TodosHandler.editChecklist(_project,_id,returnedList);
                        TodosInterface.editChecklist(_id,returnedList);
                    }
                    break;
            }
        }
        //making sure modal is cleared if closed by pressing ESC
        clearModal();
    });

    function clearModal() {
        while (modal.firstChild) {
            modal.firstChild.remove();
        }
    }

    let editTitle = function (project, id) {
        _project = project;
        _id = id;
        let Title = document.createElement("input");
        Title.setAttribute("type", "text");
        Title.setAttribute("id", "title-edit");
        let TitleLabel = document.createElement("label");
        TitleLabel.setAttribute("for", "title-edit");
        TitleLabel.textContent = "New title:";
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "cancel";
        cancelButton.addEventListener("click", () => {
            modal.close();
            clearModal();
        });
        let submitButton = document.createElement("button");
        submitButton.textContent = "enter";
        submitButton.addEventListener("click", () => {
            modal.close(Title.value);
            clearModal();
        });

        modal.appendChild(TitleLabel);
        modal.appendChild(Title);
        modal.appendChild(cancelButton);
        modal.appendChild(submitButton);

        modal.dataset.state = "title";
        modal.showModal();
    }

    let editDescription = function (project, id) {
        _project = project;
        _id = id;
        let description = document.createElement("textarea");
        description.setAttribute("rows", "5");
        description.setAttribute("cols", "33");
        description.setAttribute("id", "description-edit");
        let descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description-edit");
        descriptionLabel.textContent = "New description:";
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "cancel";
        cancelButton.addEventListener("click", () => {
            modal.close();
            clearModal();
        });
        let submitButton = document.createElement("button");
        submitButton.textContent = "enter";
        submitButton.addEventListener("click", () => {
            modal.close(description.value);
            clearModal();
        });

        modal.appendChild(descriptionLabel);
        modal.appendChild(description);
        modal.appendChild(cancelButton);
        modal.appendChild(submitButton);

        modal.dataset.state = "description";
        modal.showModal();
    }

    let editNotes = function (project, id) {
        _project = project;
        _id = id;
        let notes = document.createElement("textarea");
        notes.setAttribute("rows", "5");
        notes.setAttribute("cols", "33");
        notes.setAttribute("id", "notes-edit");
        let notesLabel = document.createElement("label");
        notesLabel.setAttribute("for", "notes-edit");
        notesLabel.textContent = "New notes:";
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "cancel";
        cancelButton.addEventListener("click", () => {
            modal.close();
            clearModal();
        });
        let submitButton = document.createElement("button");
        submitButton.textContent = "enter";
        submitButton.addEventListener("click", () => {
            modal.close(notes.value);
            clearModal();
        });

        modal.appendChild(notesLabel);
        modal.appendChild(notes);
        modal.appendChild(cancelButton);
        modal.appendChild(submitButton);

        modal.dataset.state = "notes";
        modal.showModal();
    }

    let editDueDate = function (project, id) {
        _project = project;
        _id = id;
        let dueDate = document.createElement("input");
        dueDate.setAttribute("type", "datetime-local");
        dueDate.setAttribute("id", "dueDate-edit");
        let dueDateLabel = document.createElement("label");
        dueDateLabel.setAttribute("for", "dueDate-edit");
        dueDateLabel.textContent = "New dueDate:";
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "cancel";
        cancelButton.addEventListener("click", () => {
            modal.close();
            clearModal();
        });
        let submitButton = document.createElement("button");
        submitButton.textContent = "enter";
        submitButton.addEventListener("click", () => {
            modal.close(dueDate.value);
            clearModal();
        });

        modal.appendChild(dueDateLabel);
        modal.appendChild(dueDate);
        modal.appendChild(cancelButton);
        modal.appendChild(submitButton);

        modal.dataset.state = "dueDate";
        modal.showModal();
    }

    let editChecklist = function (project, id) {
        let checklist = document.createElement("ul");
        _checklist = checklist;
        _project = project;
        _id = id;
        let todo = project.list.filter((todo) => todo.id == id);
        if (todo[0].checklist != undefined) {
            todo[0].checklist.forEach(element => {
                let list = document.createElement("li");
                let listText = document.createElement("input");
                listText.setAttribute("type", "text");
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.classList.add("checkbox");
                if (element.state) {
                    checkbox.setAttribute("checked", "");
                }
                listText.value = element.name;
                list.appendChild(checkbox);
                list.appendChild(listText);
                checklist.appendChild(list);
            })
        }

        let checklistDescription = document.createElement("p");
        checklistDescription.textContent = "Edit current items or add a new item, any empty item will be counted as deleted and ignored:";

        let cancelButton = document.createElement("button");
        cancelButton.textContent = "cancel";
        cancelButton.addEventListener("click", () => {
            modal.close();
        });
        let submitButton = document.createElement("button");
        submitButton.textContent = "enter";
        submitButton.addEventListener("click", () => {
            modal.close("submit");
        });
        let addList = document.createElement("button");
        addList.textContent = "add item";
        addList.addEventListener("click", () => {
            let nameList = checklist.querySelectorAll("input[type='text']");
            let lastList = nameList[nameList.length - 1];
            if (lastList.value == "") {
                lastList.focus();
            }
            else {
                let newList = document.createElement("li");
                let newCheckbox = document.createElement("input");
                newCheckbox.setAttribute("type", "checkbox");
                let newName = document.createElement("input");
                newName.setAttribute("type", "text");
                newList.appendChild(newCheckbox);
                newList.appendChild(newName);
                checklist.appendChild(newList);
            }
        });

        modal.appendChild(checklistDescription);
        modal.appendChild(checklist);
        modal.appendChild(cancelButton);
        modal.appendChild(submitButton);
        modal.appendChild(addList);

        modal.dataset.state = "checklist";
        modal.showModal();

    }

    return { editTitle, editDescription, editNotes, editDueDate, editChecklist };
})();