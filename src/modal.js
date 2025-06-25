import { TodosHandler } from "./todosHandler";
import { TodosInterface } from "./interface.js";
export { modal };

let modal = (function () {
    let _project = [], _id = "";
    let modal = document.createElement("dialog");
    modal.classList.add("modal");
    document.body.appendChild(modal);
    modal.addEventListener("close", () => {
        //making sure modal is cleared if closed by pressing ESC
        clearModal();

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
            }
        }
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

    return { editTitle, editDescription, editNotes };
})();