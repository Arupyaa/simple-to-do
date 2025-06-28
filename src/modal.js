import { TodosHandler } from "./todosHandler";
import { TodosInterface } from "./interface.js";
import { add, parse as parseDate } from "date-fns";
import { Project } from "./projects.js";
export { modal };

let modal = (function () {
    let _id = "", _checklist = undefined, _title = undefined, _dueDate = undefined, _description = undefined, _notes = undefined;
    let _projects = [], _project = [], _projectID;
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
                    if (modal.returnValue == "submit") {
                        let list = Array.from(_checklist.querySelectorAll("li"));
                        let returnedList = [];
                        list.forEach((li) => {
                            let listName = li.querySelector("input[type='text']");
                            //skip item if empty
                            if (listName.value == "")
                                return;

                            let listCheckbox = li.querySelector("input[type='checkbox']");
                            let obj = {};
                            obj.name = listName.value;
                            let test = listCheckbox.checked; //test
                            obj.state = listCheckbox.checked;
                            returnedList.push(obj);
                        });
                        TodosHandler.editChecklist(_project, _id, returnedList);
                        TodosInterface.editChecklist(_project, _id, returnedList);
                    }
                    break;
                case "form":
                    if (modal.returnValue == "submit") {
                        let list = Array.from(_checklist.querySelectorAll("li"));
                        let returnedList = [];
                        list.forEach((li) => {
                            let listName = li.querySelector("input[type='text']");
                            //skip item if empty
                            if (listName.value == "")
                                return;

                            let listCheckbox = li.querySelector("input[type='checkbox']");
                            let obj = {};
                            obj.name = listName.value;
                            let test = listCheckbox.checked; //test
                            obj.state = listCheckbox.checked;
                            returnedList.push(obj);
                        });

                        let dueDateValue = parseDate(_dueDate.value, "yyyy-MM-dd'T'HH:mm", new Date());
                        let todo = TodosHandler.addTodo(_project, _title.value, _description.value, dueDateValue, _notes.value, returnedList);
                        let container = document.querySelector(".project-container");
                        TodosInterface.displayCard(container, _project, todo);
                    }
                    break;
                case "confirmation":
                    if (modal.returnValue == "confirm") {
                        TodosHandler.removeTodo(_project, _id);
                        TodosInterface.removeCard(_id);
                    }
                    break;
                case "project-add":
                    let newProject = Project(modal.returnValue);
                    _projects.push(newProject);
                    TodosInterface.updateProjects();
                    TodosInterface.projectFocus(newProject.id);
                    break;
                case "project-rename":
                    let projectEntry = _projects.filter((p) => p.id == _projectID);
                    projectEntry[0].name = modal.returnValue;
                    let projectDOM = document.querySelector(`.sidebar>ul>li[data-id='${_projectID}']`);
                    projectDOM.textContent = modal.returnValue;
                    break;
                case "project-confirmation":
                    if (modal.returnValue == "confirm") {
                        let index = _projects.findIndex((p) => p.id == _projectID);
                        _projects.splice(index, 1);
                        let projectDOM = document.querySelector(`.sidebar>ul>li[data-id='${_projectID}']`);
                        projectDOM.remove();
                        if (_projects.length == 0)
                            TodosInterface.projectFocus(undefined,true,true);
                        else
                            TodosInterface.projectFocus(_projects[0].id,true);

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

    let addTodo = function (project) {
        _project = project;
        let form = document.createElement("form");
        let title = document.createElement("input");
        _title = title;
        title.setAttribute("type", "text");
        title.setAttribute("id", "title-field");
        title.setAttribute("required", "");
        let dueDate = document.createElement("input");
        _dueDate = dueDate;
        dueDate.setAttribute("type", "datetime-local");
        dueDate.setAttribute("id", "dueDate-field");
        dueDate.setAttribute("required", "");
        let description = document.createElement("textarea");
        _description = description;
        description.setAttribute("id", "description-field");
        let notes = document.createElement("textarea");
        _notes = notes;
        notes.setAttribute("id", "notes-field");
        let checklist = document.createElement("ul");
        _checklist = checklist;

        let titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title-field");
        titleLabel.textContent = "Title: ";
        let dueDateLabel = document.createElement("label");
        dueDateLabel.setAttribute("for", "dueDate-field");
        dueDateLabel.textContent = "DueDate: ";
        let descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description-field");
        descriptionLabel.textContent = "Description: ";
        let notesLabel = document.createElement("label");
        notesLabel.setAttribute("for", "notes-field");
        notesLabel.textContent = "Notes: ";
        let checklistLabel = document.createElement("label");
        checklistLabel.setAttribute("for", "checklist-field");
        checklistLabel.textContent = "Checklist*: ";

        let checklistFooter = document.createElement("footer");
        checklistFooter.textContent = "*empty items will be ignored";

        let addItemBtn = document.createElement("button");
        addItemBtn.textContent = "add item";
        addItemBtn.setAttribute("type", "button");
        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        cancelBtn.setAttribute("type", "button");
        cancelBtn.addEventListener("click", () => {
            modal.close();
        });
        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "submit");
        submitBtn.textContent = "add card";
        submitBtn.addEventListener("click", (e) => {
            if (!form.checkValidity()) {
                form.reportValidity();
            }
            else {
                modal.close("submit");
            }
            e.preventDefault();
        })

        let newList = document.createElement("li");
        let newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type", "checkbox");
        let newName = document.createElement("input");
        newName.setAttribute("type", "text");
        newName.setAttribute("id", "checklist-field");
        newList.appendChild(newCheckbox);
        newList.appendChild(newName);
        checklist.appendChild(newList);
        addItemBtn.addEventListener("click", () => {
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
        form.appendChild(titleLabel);
        form.appendChild(title);
        form.appendChild(dueDateLabel);
        form.appendChild(dueDate);
        form.appendChild(descriptionLabel);
        form.appendChild(description);
        form.appendChild(notesLabel);
        form.appendChild(notes);
        form.appendChild(checklistLabel);
        form.appendChild(checklist);
        form.appendChild(checklistFooter);
        form.appendChild(addItemBtn);
        form.appendChild(cancelBtn);
        form.appendChild(submitBtn);
        modal.appendChild(form);

        modal.dataset.state = "form";
        modal.showModal();
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

    let removeCardConfirmation = function (project, todoID) {
        _project = project;
        _id = todoID;
        let confirmationText = document.createElement("div");
        confirmationText.textContent = "Are you sure you want to delete this card?";
        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        cancelBtn.addEventListener("click", () => {
            modal.close();
        });
        let confirmBtn = document.createElement("button");
        confirmBtn.textContent = "confirm";
        confirmBtn.addEventListener("click", () => {
            modal.close("confirm");
        });

        modal.appendChild(confirmationText);
        modal.appendChild(cancelBtn);
        modal.appendChild(confirmBtn);
        modal.dataset.state = "confirmation";
        modal.showModal();
    }

    let addProject = function (projects, renameFlag = false, projectID = undefined) {
        _projects = projects;
        let projectName = document.createElement("input");
        projectName.setAttribute("type", "text");
        projectName.setAttribute("id", "project-field");
        let projectlabel = document.createElement("label");
        projectlabel.setAttribute("id", "project-field");
        if (renameFlag && projectID != undefined)
            projectlabel.textContent = "new project name: ";
        else
            projectlabel.textContent = "project name: ";
        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        cancelBtn.addEventListener("click", () => {
            modal.close("");
        });
        let confirmBtn = document.createElement("button");
        confirmBtn.textContent = "confirm";
        confirmBtn.addEventListener("click", () => {
            modal.close(projectName.value);
        });

        modal.appendChild(projectlabel);
        modal.appendChild(projectName);
        modal.appendChild(cancelBtn);
        modal.appendChild(confirmBtn);
        if (renameFlag && projectID != undefined) {
            modal.dataset.state = "project-rename";
            _projectID = projectID;
        }
        else
            modal.dataset.state = "project-add";
        modal.showModal();
    }

    let removeProjectConfirmation = function (projects, projectID) {
        _projects = projects;
        _projectID = projectID;
        let confirmationText = document.createElement("div");
        confirmationText.textContent = "Are you sure you want to delete this project?";
        let cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        cancelBtn.addEventListener("click", () => {
            modal.close("");
        });
        let confirmBtn = document.createElement("button");
        confirmBtn.textContent = "confirm";
        confirmBtn.addEventListener("click", () => {
            modal.close("confirm");
        });

        modal.appendChild(confirmationText);
        modal.appendChild(cancelBtn);
        modal.appendChild(confirmBtn);
        modal.dataset.state = "project-confirmation";
        modal.showModal();
    }

    return { addTodo, editTitle, editDescription, editNotes, editDueDate, editChecklist, removeCardConfirmation, addProject, removeProjectConfirmation };
})();