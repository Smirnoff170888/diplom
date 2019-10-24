import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';

export default class Search extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._errorsSet = new Set();
        this._inputHandlers = new Array();
        this._errorText = Utils.nodeElements('.search__error', this._container);
        if (data.q) this._container['item'].value = data.q;
        this.validate = () => this._inputHandlers.forEach((handler) => handler());
        this.reset = () => {
            this._container.reset();
            this._submit.disabled = false;
        };

        this._container.forEach((elem) => {
            if (elem.tagName == 'INPUT') this._initInputHandler(elem);
            if (elem.tagName == 'BUTTON' && elem.type == 'submit') this._submit = elem;
        });

        this._container.addEventListener('submit', this._submitHander.bind(this));
        this._container.addEventListener('focus', this.validate());
    }

    _initInputHandler(elem) {
        const validateInput = () => {
            this._inputHandler(elem);
            this._submit.disabled = this._errorsSet.size > 0;
        };
        elem.addEventListener('input', validateInput);
        this._inputHandlers.push(validateInput);
    }

    _submitHander(event) {
        event.preventDefault();
        this._onSearch(this._container['item'].value);
    }

    set onSearch(cb) {
        this._onSearch = cb;
    }

    enable() {
        this._container.forEach((elem) => elem.disabled = false);
    }

    disable() {
        this._container.forEach((elem) => elem.disabled = true);
    }

    _inputHandler(elem) {
        const minLength = elem.getAttribute('minlength');
        const maxLength = elem.getAttribute('maxlength');
        const pattern = elem.getAttribute('pattern');
        const errHelper = (errText) => {
            elem.classList.add('search__input_error');
            this._errorText.textContent = errText;
            this._errorsSet.add(elem);
            return;
        };

        if (!elem.value.length)
            return errHelper('Это обязательное поле');

        if (minLength && elem.validity.tooShort)
            return errHelper(`Должно быть от ${minLength} до ${maxLength} символов`);

        if (pattern && elem.validity.patternMismatch)
            return errHelper('Введите нормальный текст');
        elem.classList.remove('search__input_error');
        this._errorsSet.delete(elem);
        this._errorText.textContent = '';
    }
}