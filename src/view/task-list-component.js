import {createElement} from '../framework/render.js';


function createTaskListComponent() {
    return (
        `
        <section class="backlog">
            <h2 class="task-list__title">Бэклог</h2>
            <ul class="task-list__body">
            </ul>
        </section>
		`
      );
}


export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponent();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
