import {createElement} from '../framework/render.js';


function createTaskBoardComponent() {
    return (
        `
        <main class="board-app__main">
			
		</main> 
		`
      );
}


export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponent();
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
