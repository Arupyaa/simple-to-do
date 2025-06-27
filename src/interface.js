import { format as dateFormat } from "date-fns";
import { modal } from "./modal";
import { TodosHandler } from "./todosHandler";
export { TodosInterface };

let TodosInterface = (function () {
    let makeEditSVG = createSVG("svg", "edit-icon", { viewBox: "0 0 1024 1024" });
    let makePath1 = createSVG("path", "edit-path", { d: "M81.23 959.96c-4.51 0-8.91-1.78-12.18-5.05a17.2 17.2 0 0 1-4.44-16.7c7.78-28.66 77.36-281.32 123.73-327.69l508.14-508.14c51.15-51.12 134.31-51.09 185.4 0l39.73 39.71c24.75 24.76 38.4 57.68 38.4 92.7s-13.65 67.93-38.4 92.67l-508.2 508.21c-46.35 46.34-299 115.91-327.66 123.69-1.5 0.4-3.01 0.6-4.52 0.6zM789.19 98.48c-24.75 0-49.5 9.41-68.35 28.26L212.7 634.88c-27.65 27.66-76.01 174.78-106.71 283.09 108.31-30.7 255.41-79.04 283.05-106.66L897.23 303.1c18.24-18.24 28.3-42.5 28.3-68.31 0-25.81-10.06-50.08-28.3-68.33l-39.73-39.71c-18.82-18.84-43.56-28.27-68.31-28.27z m-387.97 725h0.17-0.17z" });
    let makePath2 = createSVG("path", "edit-path", { d: "M856.04 385.83c-4.41 0-8.82-1.68-12.18-5.05L643.13 180.03c-6.73-6.73-6.73-17.64 0-24.37s17.63-6.73 24.37 0l200.73 200.76c6.73 6.73 6.73 17.64 0 24.37a17.211 17.211 0 0 1-12.19 5.04zM405.9 836.02c-4.41 0-8.82-1.68-12.18-5.05L192.96 630.23c-6.73-6.73-6.73-17.63 0-24.37s17.63-6.73 24.37 0L418.09 806.6c6.73 6.73 6.73 17.63 0 24.37a17.18 17.18 0 0 1-12.19 5.05z" });
    let makeDeleteSVG = createSVG("svg", "delete-icon", { viewBox: "0 0 24 24" });
    let makePath3 = createSVG("path", "edit-path", {
        d: "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z",
        "fill-rule": "evenodd", "clip-rule": "evenodd"
    });

    let projectContainer, _projects, currProjectID = undefined;


    let interfaceInit = function (projects) {
        projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        let projectButtonContainer = document.createElement("div");
        projectButtonContainer.classList.add("project-btn-container");
        let mainContainer = document.querySelector(".container");

        let sidebar = document.querySelector(".sidebar");
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = "projects:";
        let projectList = document.createElement("ul");
        sidebar.appendChild(projectTitle);
        sidebar.appendChild(projectList);

        _projects = projects;
        updateProjects();

        let addCardSVG = createSVG("svg", "add-card-icon", { viewBox: "0 0 24 24" });
        let addline1 = createSVG("line", "edit-line", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "3", x1: "12", x2: "12", y1: "19", y2: "5" });
        let addline2 = createSVG("line", "edit-line", { stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "3", x1: "5", x2: "19", y1: "12", y2: "12" });
        let addCardIcon = addCardSVG();
        addCardIcon.appendChild(addline1());
        addCardIcon.appendChild(addline2());
        addCardIcon.addEventListener("click", function () {
            modal.addTodo(project);
        });
        projectButtonContainer.appendChild(addCardIcon);
        projectContainer.appendChild(projectButtonContainer);
        mainContainer.appendChild(projectContainer);

    }

    function displayTodos(project) {
        project.list.forEach(todo => {
            displayCard(project, todo);
        });

    };

    let editTitle = function (id, value) {
        let card = document.querySelector(`[data-id = '${id}']`);
        let title = card.querySelector(".title");
        title.textContent = value;
    }

    let editDescription = function (id, value) {
        let card = document.querySelector(`[data-id = '${id}']`);
        let description = card.querySelector(".description");
        description.textContent = value;
    }

    let editNotes = function (id, value) {
        let card = document.querySelector(`[data-id = '${id}']`);
        let notes = card.querySelector(".notes");
        notes.textContent = value;
    }

    let editDueDate = function (id, value) {
        let card = document.querySelector(`[data-id = '${id}']`);
        let dueDate = card.querySelector(".date");
        dueDate.textContent = dateFormat(value, "MMM d h:mm aa");
    }

    let editChecklist = function (project, id, objList) {
        let card = document.querySelector(`[data-id = '${id}']`);
        let checklist = card.querySelector("ul");
        let checklistBox = checklist.parentNode;
        while (checklist.firstChild)
            checklist.firstChild.remove();

        if (objList.length == 0) {
            let card = document.querySelector(`[data-id = '${id}']`);
            let box = card.querySelector(".checklist-box");
            box.setAttribute("style", "display:none");
            let btn = card.querySelector("button[data-type='checklist']");
            btn.setAttribute("style", "inline-block");
            TodosHandler.removeChecklist(project, card.dataset.id);
        }
        else {
            objList.forEach(element => {
                let list = document.createElement("li");
                let listText = document.createElement("span");
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.classList.add("checkbox");
                if (element.state) {
                    checkbox.setAttribute("checked", "");
                }
                listText.textContent = element.name;
                list.appendChild(checkbox);
                list.appendChild(listText);
                checklist.appendChild(list);
            })
        }
    }

    function createSVG(_name, _SVGclass, _attributes) {
        let customFunction = function () {
            let SVG = document.createElementNS("http://www.w3.org/2000/svg", _name);
            if (_SVGclass != "")
                SVG.classList.add(_SVGclass);
            for (let k in _attributes) {
                SVG.setAttribute(k, _attributes[k]);
            }
            return SVG;
        }
        return customFunction;
    }

    function displayCard(project, todo) {
        let card = document.createElement("div");
        card.classList.add("todo-card");
        let header = document.createElement("div");
        header.textContent = todo.priority;
        let deleteCardIcon = makeDeleteSVG();
        deleteCardIcon.appendChild(makePath3());
        deleteCardIcon.addEventListener("click", function () {
            modal.removeCardConfirmation(project, this.parentNode.parentNode.dataset.id);
        });
        header.appendChild(deleteCardIcon);
        let cardBody = document.createElement("div");
        let title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = todo.title;
        let titleEdit = makeEditSVG();
        titleEdit.appendChild(makePath1());
        titleEdit.appendChild(makePath2());
        titleEdit.addEventListener("click", function () {
            modal.editTitle(project, this.parentNode.parentNode.parentNode.dataset.id);
        });
        let titleBox = document.createElement("div");
        titleBox.classList.add("title-box");
        titleBox.appendChild(title);
        titleBox.appendChild(titleEdit);

        let dueDate = document.createElement("div");
        dueDate.textContent = dateFormat(todo.dueDate, "MMM d h:mm aa");
        dueDate.classList.add("date");
        let dueDateEdit = makeEditSVG();
        dueDateEdit.appendChild(makePath1());
        dueDateEdit.appendChild(makePath2());
        dueDateEdit.addEventListener("click", function () {
            modal.editDueDate(project, this.parentNode.parentNode.parentNode.dataset.id);
        });
        let dueDateBox = document.createElement("div");
        dueDateBox.classList.add("dueDate-box");
        dueDateBox.appendChild(dueDate);
        dueDateBox.appendChild(dueDateEdit);

        let description = document.createElement("p");
        description.classList.add("description");
        description.textContent = todo.description;
        let descriptionEdit = makeEditSVG();
        descriptionEdit.appendChild(makePath1());
        descriptionEdit.appendChild(makePath2());
        descriptionEdit.addEventListener("click", function () {
            modal.editDescription(project, this.parentNode.parentNode.parentNode.dataset.id);
        });
        let descriptionDelete = makeDeleteSVG();
        descriptionDelete.appendChild(makePath3());
        descriptionDelete.addEventListener("click", function () {
            let box = this.parentNode;
            box.setAttribute("style", "display:none");
            let card = this.parentNode.parentNode.parentNode;
            let btn = card.querySelector("button[data-type='description']");
            btn.setAttribute("style", "display:inline-block");
            TodosHandler.removeDescription(project, card.dataset.id);
        });
        let descriptionTitle = document.createElement("h4");
        descriptionTitle.textContent = "Description:";
        let descriptionBox = document.createElement("div");
        descriptionBox.classList.add("description-box");
        descriptionBox.appendChild(descriptionTitle);
        descriptionBox.appendChild(descriptionDelete);
        descriptionBox.appendChild(descriptionEdit);
        descriptionBox.appendChild(description);

        let notes = document.createElement("p");
        notes.classList.add("notes");
        notes.textContent = todo.notes;
        let notesEdit = makeEditSVG();
        notesEdit.appendChild(makePath1());
        notesEdit.appendChild(makePath2());
        notesEdit.addEventListener("click", function () {
            modal.editNotes(project, this.parentNode.parentNode.parentNode.dataset.id);
        });
        let notesDelete = makeDeleteSVG();
        notesDelete.appendChild(makePath3());
        notesDelete.addEventListener("click", function () {
            let box = this.parentNode;
            box.setAttribute("style", "display:none");
            let card = this.parentNode.parentNode.parentNode;
            let btn = card.querySelector("button[data-type='notes']");
            btn.setAttribute("style", "display:inline-block");
            TodosHandler.removeNotes(project, card.dataset.id);
        });
        let notesTitle = document.createElement("h4");
        notesTitle.textContent = "Notes:";
        let notesBox = document.createElement("div");
        notesBox.classList.add("notes-box");
        notesBox.appendChild(notesTitle);
        notesBox.appendChild(notesDelete);
        notesBox.appendChild(notesEdit);
        notesBox.appendChild(notes);

        let checklist = document.createElement("ul");
        if (todo.checklist != undefined) {
            todo.checklist.forEach(element => {
                let list = document.createElement("li");
                let listText = document.createElement("span");
                let checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.classList.add("checkbox");
                if (element.state) {
                    checkbox.setAttribute("checked", "");
                }
                listText.textContent = element.name;
                list.appendChild(checkbox);
                list.appendChild(listText);
                checklist.appendChild(list);
            })
        }
        let checklistEdit = makeEditSVG();
        checklistEdit.appendChild(makePath1());
        checklistEdit.appendChild(makePath2());
        checklistEdit.addEventListener("click", function () {
            modal.editChecklist(project, this.parentNode.parentNode.parentNode.dataset.id);
        });
        let checklistDelete = makeDeleteSVG();
        checklistDelete.appendChild(makePath3());
        checklistDelete.addEventListener("click", function () {
            let box = this.parentNode;
            box.setAttribute("style", "display:none");
            let card = this.parentNode.parentNode.parentNode;
            let btn = card.querySelector("button[data-type='checklist']");
            btn.setAttribute("style", "display:inline-block");
            TodosHandler.removeChecklist(project, card.dataset.id);
        });
        let checklistTitle = document.createElement("h4");
        checklistTitle.textContent = "Checklist:";
        let checklistBox = document.createElement("div");
        checklistBox.classList.add("checklist-box");
        checklistBox.appendChild(checklistTitle);
        checklistBox.appendChild(checklistDelete);
        checklistBox.appendChild(checklistEdit);
        checklistBox.appendChild(checklist);

        let addButtons = document.createElement("div");
        let addDescriptionBtn = document.createElement("button");
        let addNotesBtn = document.createElement("button");
        let addChecklistBtn = document.createElement("button");
        addDescriptionBtn.classList.add("add-btn");
        addDescriptionBtn.dataset.type = "description";
        addDescriptionBtn.textContent = "add description";
        addDescriptionBtn.addEventListener("click", function () {
            let card = this.parentNode.parentNode.parentNode;
            modal.editDescription(project, card.dataset.id);
            let box = card.querySelector(".description-box");
            box.setAttribute("style", "display:grid");
            this.setAttribute("style", "display:none");

        });
        addNotesBtn.classList.add("add-btn");
        addNotesBtn.dataset.type = "notes";
        addNotesBtn.textContent = "add notes";
        addNotesBtn.addEventListener("click", function () {
            let card = this.parentNode.parentNode.parentNode;
            modal.editNotes(project, card.dataset.id);
            let box = card.querySelector(".notes-box");
            box.setAttribute("style", "display:grid");
            this.setAttribute("style", "display:none");
        });
        addChecklistBtn.classList.add("add-btn");
        addChecklistBtn.dataset.type = "checklist";
        addChecklistBtn.textContent = "add checklist";
        addChecklistBtn.addEventListener("click", function () {
            let card = this.parentNode.parentNode.parentNode;
            modal.editChecklist(project, card.dataset.id);
            let box = card.querySelector(".checklist-box");
            box.setAttribute("style", "display:grid");
            this.setAttribute("style", "display:none");
        });
        addButtons.appendChild(addDescriptionBtn);
        addButtons.appendChild(addNotesBtn);
        addButtons.appendChild(addChecklistBtn);

        //hide a specific todo field if not defined by user
        if (todo.description == undefined)
            descriptionBox.setAttribute("style", "display:none");
        else
            addDescriptionBtn.setAttribute("style", "display:none");
        if (todo.notes == undefined)
            notesBox.setAttribute("style", "display:none");
        else
            addNotesBtn.setAttribute("style", "display:none");
        if (todo.checklist == undefined)
            checklistBox.setAttribute("style", "display:none");
        else
            addChecklistBtn.setAttribute("style", "display:none");

        card.appendChild(header);
        cardBody.appendChild(titleBox);
        cardBody.appendChild(dueDateBox);
        cardBody.appendChild(descriptionBox);
        cardBody.appendChild(notesBox);
        cardBody.appendChild(checklistBox);
        cardBody.appendChild(addButtons);
        card.appendChild(cardBody);
        card.dataset.id = todo.id;
        projectContainer.appendChild(card);
    }

    let removeCard = function (id) {
        let card = document.querySelector(`[data-id = '${id}']`);
        while (card.firstChild)
            card.firstChild.remove();
        card.remove();
    }

    function updateProjects() {
        let projectItems = Array.from(document.querySelectorAll(".sidebar>ul>li"));
        let projectList = document.querySelector(".sidebar>ul");

        _projects.forEach((project) => {
            if (projectItems.find((p) => p.dataset.id == project.id) == undefined) {
                let entry = document.createElement("li");
                entry.textContent = project.name;
                entry.addEventListener("click", function () { projectFocus(this.dataset.id); });
                entry.dataset.id = project.id;
                projectList.appendChild(entry);
            }
        });
    }

    let projectFocus = function (projectID) {
        //reset project container
        while (projectContainer.firstChild)
            projectContainer.firstChild.remove();

        let projectItems = Array.from(document.querySelectorAll(".sidebar>ul>li"));
        if (currProjectID != undefined) {
            let oldProject = projectItems.filter((p) => p.dataset.id == currProjectID);
            oldProject[0].classList.toggle("focus-project");
        }
        let project = projectItems.filter((p) => p.dataset.id == projectID);
        project[0].classList.toggle("focus-project");
        currProjectID = projectID;

        let projectEntry = _projects.filter((p) => p.id == projectID);
        //display the new project currently selected
        displayTodos(projectEntry[0]);

    }


    return {
        get projectContainer() {
            return projectContainer;
        }, interfaceInit, displayCard, displayTodos, removeCard, editTitle, editDescription, editNotes, editDueDate, editChecklist, projectFocus
    };
})();

