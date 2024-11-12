import AbstractComponent from '../framework/view/abstract-component.js';
import {TaskListColor} from '../const.js';


function createTaskComponentTemplate(taskId, taskTitle, taskColor) {
    return (
        `<li class="tasks__item tasks__item--${taskColor}" data-taskid="${taskId}">${taskTitle}</li>`
    );
}

export default class TaskComponent extends AbstractComponent {
    taskId = null;
    taskTitle = null;
    taskColor = null;
    
    constructor(task) {
        super();
        this.taskId = task.id;
        this.taskTitle = task.title;
        this.taskColor = TaskListColor[task.status];
        this.#afterCreateElement();
    }

    get template() {
        return createTaskComponentTemplate(this.taskId, this.taskTitle, this.taskColor);
    }

    #afterCreateElement() {
        this.#makeTaskDraggable();
    }

    #makeTaskDraggable() {
        this.element.setAttribute('draggable', true);

        this.element.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.taskId);
        })
    }
}