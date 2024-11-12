import TaskAreaComponent from '../view/task-area-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import ButtonClearComponent from '../view/button-clear-component.js';
import {render, RenderPosition} from '../framework/render.js';
import {TaskListStatus, UserAction} from '../const.js';
import LoaderComponent from '../view/loader-component.js';


export default class TaskAreaPresenter {
    #tasksModel = null;

    #taskAreaComponent = new TaskAreaComponent();
    #taskAreaContainer = null;
    
    #taskListComponents = [];
    #taskListContainers = [];
    #loaderComponent = null;
    #buttonClearComponent = new ButtonClearComponent(this.clearBasket.bind(this));

    constructor(tasksModel, mainContainer) {
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
        
        this.#loaderComponent = new LoaderComponent();
        render(this.#loaderComponent, mainContainer, RenderPosition.BEFOREBEGIN);

        render(this.#taskAreaComponent, mainContainer);
        this.#taskAreaContainer = mainContainer.querySelector('.container');
    }

    async init() {
        this.#loaderComponent.start();
        await this.#tasksModel.init();
        this.#loaderComponent.stop();

        this.#clearTaskArea();
        this.#renderTaskArea();
    }

    async createTask() {
        var taskTitle = document.querySelector('.new-task__input').value.trim();
        if (!taskTitle) {
            return;
        }
        
        this.#loaderComponent.start();
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.new-task__input').value = '';
        }
        catch (err) {
            console.error(`Ошибка при создании задачи: ${err}`);
        }
        this.#loaderComponent.stop();
    }

    async clearBasket() {
        this.#loaderComponent.start();

        try {
            await this.#tasksModel.removeTasksByStatus(TaskListStatus.BASKET);
        }
        catch (err) {
            console.error(`Ошибка при очистке корзины: ${err}`);
        }

        this.#loaderComponent.stop();
    }

    async #handleTaskDrop(taskId, targetTaskId, targetStatus) {
        this.#loaderComponent.start();

        try {
            if (targetTaskId != undefined && targetTaskId != null) {
                await this.#tasksModel.moveTask(taskId, targetTaskId, targetStatus);
            }
            else {
                await this.#tasksModel.moveTaskToEnd(taskId, targetStatus);
            }
        }
        catch (err) {
            console.error(`Ошибка при обновлении статуса задачи: ${err}`);
        }

        this.#loaderComponent.stop();
    }
    
    #renderTaskArea() {
        Object.values(TaskListStatus).forEach((taskListStatus) => {
            this.#renderTaskList(taskListStatus, this.#taskAreaContainer);
        });
        
        render(this.#buttonClearComponent, this.#taskListContainers[TaskListStatus.BASKET]);
    }

    #renderTaskList(taskListStatus, container, renderPosition = RenderPosition.BEFOREEND) {
        var taskListComponent = new TaskListComponent(taskListStatus, this.#handleTaskDrop.bind(this));
        this.#taskListComponents[taskListStatus] = taskListComponent;
        render(taskListComponent, container, renderPosition);
        
        var taskListContainer = this.#taskAreaContainer.querySelectorAll('.tasks__list')[taskListStatus];
        this.#taskListContainers[taskListStatus] = taskListContainer;

        this.#loaderComponent.start();
        var taskList = this.#tasksModel.getTasksByStatus(taskListStatus);
        this.#loaderComponent.stop();
        if (taskList.length > 0) {
            taskList.forEach((task) => {
                this.#renderTask(task, this.#taskListContainers[taskListStatus]);
            });
        }
        else {
            render(new EmptyTaskComponent(), taskListContainer);
        }
    }

    #renderTask(task, container) {
        var taskComponent = new TaskComponent(task);
        render(taskComponent, container);
    }

    #clearTaskArea() {
        this.#taskAreaComponent.element.innerHTML = '';
    }

    #clearTaskList(taskListStatus) {
        this.#taskAreaComponent.element.removeChild(this.#taskListComponents[taskListStatus].element);
    }

    #handleModelChange(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:    
                this.#renderTask(payload, this.#taskListContainers[payload.status]);
                this.#loaderComponent.stop();
                return;
            case UserAction.UPDATE_TASK:
                this.#clearTaskArea();
                this.#renderTaskArea();
                break;
            case UserAction.REMOVE_TASK:
                this.#clearTaskList(TaskListStatus.BASKET);
                this.#renderTaskList(TaskListStatus.BASKET, this.#taskAreaContainer);
                render(this.#buttonClearComponent, this.#taskListContainers[TaskListStatus.BASKET]);
                break;
        }

        if (this.#buttonClearComponent) {
            this.#buttonClearComponent.element.disabled = !this.#tasksModel.hasTasksByStatus(TaskListStatus.BASKET);
        }
    }
}