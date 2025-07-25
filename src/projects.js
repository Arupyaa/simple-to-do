export { Project };
import { compareAsc, compareDesc } from "date-fns";

const Project = function (projectName) {
    let internalList = [];
    let _name = projectName;
    let _id = crypto.randomUUID();
    let project = {
        list: internalList,
        name: _name,
        get id() {
            return _id;
        }

    };
    project.sortByPriority = function (order) {
        switch (order) {
            case "DESC":
                internalList.sort((a, b) => {
                    if (a.priority < b.priority)
                        return 1;
                    else if (a.priority > b.priority)
                        return -1;
                    else
                        return 0;
                });
                break;
            default:
            case "ASC":
                internalList.sort((a, b) => {
                    if (a.priority < b.priority)
                        return -1;
                    else if (a.priority > b.priority)
                        return 1;
                    else
                        return 0;
                });
                break;

        }
    }
    project.sortByDueDate = function (order) {
        switch (order) {
            case "DESC":
                internalList.sort((a, b) => compareDesc(a.dueDate, b.dueDate));
                break;
            default:
            case "ASC":
                internalList.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
                break;
        }
    }
    return project;
}