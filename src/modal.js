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
        
        if (modal.returnValue != "" && modal.dataset.state == "title") {
            TodosHandler.editTitle(_project, _id, modal.returnValue);
            TodosInterface.editTitle(_id, modal.returnValue);
        }
    })

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

    return { editTitle };
})();