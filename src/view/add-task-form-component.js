import {createElement} from '../framework/render.js';


function createTaskFormComponentTemplate() {
    return (
        `
         <section class="new-task">
            <h1>Новая задача:</h1>
            <input type="text" placeholder="Название задачи..." id="task-input">
            <button id="add-task">Добавить</button>
        </section>
		`
      );
}


export default class AddTaskFormComponent {
  getTemplate() {
    return createTaskFormComponentTemplate();
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
