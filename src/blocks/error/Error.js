import FixedComponent from '../../modules/FixedComponent.js';
import Err from './__err/Err.js';

export default class Error extends FixedComponent {
    constructor(elem) {
        super(elem);
        this._displayStyle = 'flex';
        this._errCounter = 0;
    }

    error(text) {
        this.show();
        this._errCounter++;
        const err = new Err({text: text}, this._container, {
            timeout: () => {
                err.destroy();
                this._errCounter--;
                if (!this._errCounter) this.hide();
            }
        });
        err.render();
    }
}