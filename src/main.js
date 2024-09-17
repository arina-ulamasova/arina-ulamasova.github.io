import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskItemComponent from './view/task-item-component.js';


const bodyContainer= document.querySelector('.board-app');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskBoardComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const taskBoardModel = [
    {
        name: "list1",
        tasks: [
            { name: "task1", },
            { name: "task2", },
            { name: "task3", },
        ],
    }, {
        name: "list2",
        tasks: [
            { name: "task1", },
            { name: "task2", },
            { name: "task3", },
        ],
    }, {
        name: "list3",
        tasks: [
            { name: "task1", },
            { name: "task2", },
            { name: "task3", },
        ],
    },
];

const taskBoardContainer = document.querySelector('.board-app__main');

taskBoardModel.forEach(list => {
    render(new TaskListComponent(), taskBoardContainer, RenderPosition.BEFOREEND);

    const taskListContainers = document.querySelectorAll('.task-list__body');

    list.tasks.forEach(task => {
        render(new TaskItemComponent(), taskListContainers[taskListContainers.length - 1], RenderPosition.BEFOREEND);
    })
})