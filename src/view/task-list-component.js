import AbstractComponent from '../framework/view/abstract-component.js';
import {TaskListTitle, TaskListColor} from '../const.js'


function createTaskListComponentTemplate(taskListTitle, taskColor) {
    return (
        `<section class="tasks">
            <h3 class="tasks__title tasks__title--${taskColor}">${taskListTitle}</h3>
            <ul class="tasks__list">
            </ul>
        </section>`
    );
}

export default class TaskListComponent extends AbstractComponent {
    taskListStatus = null;
    taskListTitle = null;
    taskListColor = null;
    
    constructor(taskListStatus, onTaskDrop) {
        super();
        this.taskListStatus = taskListStatus;
        this.taskListTitle = TaskListTitle[taskListStatus];
        this.taskListColor = TaskListColor[taskListStatus];
        this.#setDropHandler(onTaskDrop);
    }
    
    get template() {
        return createTaskListComponentTemplate(this.taskListTitle, this.taskListColor);
    }

    #setDropHandler(onTaskDrop) {
        var container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        })

        container.addEventListener('drop', (event) => {
            event.preventDefault();

            var taskId = event.dataTransfer.getData('text/plain');
            var targetTask = event.target.closest('.tasks__item');
            var targetTaskId = targetTask?.dataset.taskid;
            onTaskDrop(taskId, targetTaskId, this.taskListStatus);
        })
    }
}