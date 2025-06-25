import { format as dateFormat } from "date-fns";
import { modal } from "./modal";
export { TodosInterface };

let TodosInterface = (function () {
    let makeSVG = createSVG("svg", "edit-icon", { viewBox: "0 0 1024 1024" });
    let makePath1 = createSVG("path", "edit-path", { d: "M81.23 959.96c-4.51 0-8.91-1.78-12.18-5.05a17.2 17.2 0 0 1-4.44-16.7c7.78-28.66 77.36-281.32 123.73-327.69l508.14-508.14c51.15-51.12 134.31-51.09 185.4 0l39.73 39.71c24.75 24.76 38.4 57.68 38.4 92.7s-13.65 67.93-38.4 92.67l-508.2 508.21c-46.35 46.34-299 115.91-327.66 123.69-1.5 0.4-3.01 0.6-4.52 0.6zM789.19 98.48c-24.75 0-49.5 9.41-68.35 28.26L212.7 634.88c-27.65 27.66-76.01 174.78-106.71 283.09 108.31-30.7 255.41-79.04 283.05-106.66L897.23 303.1c18.24-18.24 28.3-42.5 28.3-68.31 0-25.81-10.06-50.08-28.3-68.33l-39.73-39.71c-18.82-18.84-43.56-28.27-68.31-28.27z m-387.97 725h0.17-0.17z" });
    let makePath2 = createSVG("path", "edit-path", { d: "M856.04 385.83c-4.41 0-8.82-1.68-12.18-5.05L643.13 180.03c-6.73-6.73-6.73-17.64 0-24.37s17.63-6.73 24.37 0l200.73 200.76c6.73 6.73 6.73 17.64 0 24.37a17.211 17.211 0 0 1-12.19 5.04zM405.9 836.02c-4.41 0-8.82-1.68-12.18-5.05L192.96 630.23c-6.73-6.73-6.73-17.63 0-24.37s17.63-6.73 24.37 0L418.09 806.6c6.73 6.73 6.73 17.63 0 24.37a17.18 17.18 0 0 1-12.19 5.05z" });

    let displayTodos = function (container, project) {
        project.list.forEach(todo => {

            let card = document.createElement("div");
            card.classList.add("todo-card");
            let header = document.createElement("div");
            header.textContent = todo.priority;
            let cardBody = document.createElement("div");
            let title = document.createElement("h3");
            title.textContent = todo.title;
            let titleEdit = makeSVG();
            titleEdit.appendChild(makePath1());
            titleEdit.appendChild(makePath2());
            titleEdit.addEventListener("click",function(){
                modal.editTitle(project,this.parentNode.parentNode.parentNode.dataset.id);})
            let titleBox = document.createElement("div");
            titleBox.classList.add("title-box");
            titleBox.appendChild(title);
            titleBox.appendChild(titleEdit);

            let dueDate = document.createElement("div");
            dueDate.textContent = dateFormat(todo.dueDate, "MMM d h:m aa");
            dueDate.classList.add("date");
            let dueDateEdit = makeSVG();
            dueDateEdit.appendChild(makePath1());
            dueDateEdit.appendChild(makePath2());
            let dueDateBox = document.createElement("div");
            dueDateBox.classList.add("dueDate-box");
            dueDateBox.appendChild(dueDate);
            dueDateBox.appendChild(dueDateEdit);

            let description = document.createElement("p");
            description.textContent = todo.description;
            let descriptionEdit = makeSVG();
            descriptionEdit.appendChild(makePath1());
            descriptionEdit.appendChild(makePath2());
            let descriptionTitle = document.createElement("h4");
            descriptionTitle.textContent = "Description:";
            let descriptionBox = document.createElement("div");
            descriptionBox.classList.add("description-box");
            descriptionBox.appendChild(descriptionTitle);
            descriptionBox.appendChild(descriptionEdit);
            descriptionBox.appendChild(description);

            let notes = document.createElement("p");
            notes.textContent = todo.notes;
            let notesEdit = makeSVG();
            notesEdit.appendChild(makePath1());
            notesEdit.appendChild(makePath2());
            let notesTitle = document.createElement("h4");
            notesTitle.textContent = "Notes:";
            let notesBox = document.createElement("div");
            notesBox.classList.add("notes-box");
            notesBox.appendChild(notesTitle);
            notesBox.appendChild(notesEdit);
            notesBox.appendChild(notes);

            let checklist = document.createElement("ul");
            if (todo.checklist != undefined) {
                todo.checklist.forEach(element => {
                    let list = document.createElement("li");
                    let listText = document.createElement("span");
                    let checkbox = document.createElement("input");
                    checkbox.setAttribute("type","checkbox");
                    checkbox.classList.add("checkbox");
                    if(element.state){
                        checkbox.setAttribute("checked","");
                    }
                    listText.textContent = element.name;
                    list.appendChild(checkbox);
                    list.appendChild(listText);
                    checklist.appendChild(list);
                })
            }
            let checklistEdit = makeSVG();
            checklistEdit.appendChild(makePath1());
            checklistEdit.appendChild(makePath2());
            let checklistTitle = document.createElement("h4");
            checklistTitle.textContent = "Checklist:";
            let checklistBox = document.createElement("div");
            checklistBox.classList.add("checklist-box");
            checklistBox.appendChild(checklistTitle);
            checklistBox.appendChild(checklistEdit);
            checklistBox.appendChild(checklist);

            card.appendChild(header);
            cardBody.appendChild(titleBox);
            cardBody.appendChild(dueDateBox);
            if(todo.description != undefined)
                cardBody.appendChild(descriptionBox);
            if(todo.notes !=undefined)
                cardBody.appendChild(notesBox);
            if(todo.checklist != undefined)
                cardBody.appendChild(checklistBox);
            card.appendChild(cardBody);
            card.dataset.id = todo.id;
            container.appendChild(card);

        });

    };

    return { displayTodos };
})();

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