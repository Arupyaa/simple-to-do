export {Todos};

class Todos {
    title
    description
    dueDate
    priority
    notes
    checklist
    isComplete
    #id
    constructor(id,title, description, dueDate, notes = "", checklist = [],priority) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        if (notes != "")
            this.notes = notes;
        if (checklist.length !=0)
            this.checklist = checklist;
        this.isComplete = false;
    }
    get id(){
        return this.#id;
    }

}