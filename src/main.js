import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksApiService from './tasks-api-service.js';
import TasksModel from './model/tasks-model.js';
import TaskAreaPresenter from './presenter/task-area-presenter.js';
import {render, RenderPosition} from './framework/render.js';


const END_POINT = 'https://6720c87f98bbb4d93ca5fd76.mockapi.io';

const bodyContainer= document.getElementsByTagName('body')[0];
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const mainContainer = bodyContainer.getElementsByTagName('main')[0];
render(new FormAddTaskComponent({onClick: handleNewTaskButtonClick}), mainContainer, RenderPosition.AFTERBEGIN);

const tasksModel = new TasksModel({tasksApiService: new TasksApiService(END_POINT)});
const taskAreaPresenter = new TaskAreaPresenter(tasksModel, mainContainer);
taskAreaPresenter.init();

function handleNewTaskButtonClick() {
    taskAreaPresenter.createTask();
}