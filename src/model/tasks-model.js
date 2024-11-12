import Observable from '../framework/observable.js';
import IdGenerator from '../utils.js';
import {TaskListStatus, UserAction, UpdateType} from '../const.js';


export default class TasksModel extends Observable {
    #tasks = null;
    #idGenerator = null;
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            var tasks = await this.#tasksApiService.tasks;
            this.#tasks = tasks;
            
            var lastId = tasks.reduce((min, task) => {
                return task.id < min ? task.id : min;
            }, Infinity);
            this.#idGenerator = new IdGenerator(lastId);
        } 
        catch(err) {
            this.#tasks = [];
        }

        this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#tasks;
    } 

    async addTask(taskTitle) {
        var newTask = {
            id: this.#idGenerator.generate(),
            title: taskTitle,
            status: TaskListStatus.BACKLOG
        };

        try {
            var createdTask = await this.#tasksApiService.addTask(newTask);
            this.#tasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } 
        catch (err) {
            console.error(`Ошибка при добавлении задачи на сервер: ${err}`);
            throw err;
        }
    }

    async moveTaskToEnd(taskId, targetStatus) {
        var taskIndex = this.#tasks.findIndex((task) => task.id == taskId);
        
        if (taskIndex != -1) {
            var task = this.#tasks[taskIndex];
            var oldStatus = task.status;
            task.status = targetStatus;
            
            try {
                var updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this.#tasks.splice(taskIndex, 1);
                this.#tasks.push(task);
                
                this._notify(UserAction.UPDATE_TASK, {newStatus: targetStatus, oldStatus: oldStatus});
            }
            catch (err) {
                task.status = oldStatus;
                
                console.error(`Ошибка при обновлении статуса задачи на сервера: ${err}`);
                throw err;
            }
        }
    }
    
    async moveTask(taskId, targetTaskId, targetStatus) { 
        var currentTaskIndex = this.#tasks.findIndex((task) => task.id == taskId);
        var targetTaskIndex = this.#tasks.findIndex((task) => task.id == targetTaskId);
        
        if (currentTaskIndex != -1 && targetTaskIndex != -1) {
            var currentTask = this.#tasks[currentTaskIndex];
            var oldStatus = currentTask.status;
            currentTask.status = targetStatus;
            
            try {
                var updatedTask = await this.#tasksApiService.updateTask(currentTask);
                Object.assign(currentTask, updatedTask);
                this.#tasks.splice(currentTaskIndex, 1);
                this.#tasks.splice(targetTaskIndex, 0, currentTask);
                
                this._notify(UserAction.UPDATE_TASK, {newStatus: targetStatus, oldStatus: oldStatus});
            }
            catch (err) {
                currentTask.status = oldStatus;
                
                console.error(`Ошибка при обновлении статуса задачи на сервера: ${err}`);
                throw err;
            }
        }
    }

    hasTasksByStatus(taskListStatus) {
        return this.#tasks.some((task) => task.status == taskListStatus);
    }

    getTasksByStatus(taskListStatus) {
        return this.#tasks.filter((task) => task.status == taskListStatus);
    }

    async removeTasksByStatus(taskListStatus) {
        var basketTasks = this.getTasksByStatus(taskListStatus);
        
        try {
            await Promise.all(basketTasks.map((task) => this.#tasksApiService.removeTask(task.id)));
            basketTasks.forEach((task) => {
                this.#removeTask(task);
            })
            
            this._notify(UserAction.REMOVE_TASK, UpdateType.MINOR);
        }
        catch (err) {
            console.error(`Ошибка при удалении задачи на сервера: ${err}`);
            throw err;
        }
        
    }

    #removeTask(task) {
        var taskIndex = this.#tasks.indexOf(task);
        this.#tasks.splice(taskIndex, 1);
    }
}