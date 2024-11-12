export const TaskListStatus = {
    BACKLOG:   0,
    INPROCESS: 1,
    DONE:      2,
    BASKET:    3
};

export const TaskListTitle = {
    [TaskListStatus.BACKLOG]:   'Бэклог',
    [TaskListStatus.INPROCESS]: 'В процессе',
    [TaskListStatus.DONE]:      'Готово',
    [TaskListStatus.BASKET]:    'Корзина',
};

export const TaskListColor = {
    [TaskListStatus.BACKLOG]:   'black',
    [TaskListStatus.INPROCESS]: 'royalblue',
    [TaskListStatus.DONE]:      'green',
    [TaskListStatus.BASKET]:    'brown',
};

export const UserAction = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK:    'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK'
};

export const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT:  'INIT'
};