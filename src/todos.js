export {Todos};

class Todos {
    #title
    #description
    #dueDate
    #priority
    #notes
    #checklist
    #isComplete
    constructor(title, description, dueDate, notes = "", checklist = []) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = TodosHandler.addPriority(); //to implement
        if (notes != "")
            this.#notes = notes;
        if (checklist.length !=0)
            this.#checklist = checklist;
        this.#isComplete = false;
    }

}