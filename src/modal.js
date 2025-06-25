import { TodosHandler } from "./todosHandler";
export { modal };

let modal = (function () {
    let modal = document.createElement("dialog");
    modal.classList.add("modal");
    document.body.appendChild(modal);

    function clearModal() {
        while (modal.firstChild) {
            modal.firstChild.remove();
        }
    }

    let editTitle = function (project,id) {
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

        modal.addEventListener("close", () => {
            if (modal.returnValue != "")
                TodosHandler.editTitle(project,id,modal.returnValue);
        })
        
        modal.showModal();
    }

    return {editTitle};
})();