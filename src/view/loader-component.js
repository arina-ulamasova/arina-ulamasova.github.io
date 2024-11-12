import AbstractComponent from '../framework/view/abstract-component.js';


function createLoaderComponentTemplate() {
    return (
        `<div class="loader-wrapper loader-wrapper--hidden">
            <div class="loader"></div>
        </div>`
    );
}

export default class LoaderComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return createLoaderComponentTemplate();
    }

    start() {
        this.element.classList.remove('loader-wrapper--hidden');
        this.element.classList.add('loader-wrapper--visible');
    }

    stop() {
        this.element.classList.remove('loader-wrapper--visible');
        this.element.classList.add('loader-wrapper--hidden');
    }
}