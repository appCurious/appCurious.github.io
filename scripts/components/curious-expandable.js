import html from 'snabby';
import {toVNode} from 'snabbdom';

class CuriousExpandable extends HTMLElement {
// class CuriousExpandable extends HTMLButtonElement {
    constructor () {
        self = super();
    }

    // static observedAttributes = ["color", "size"];

    // might want a unique icon
    // nice to expand the height of an element when clicked
    // perhaps it could do more if the height is crazy tall - auto scroll if expanded...just ideas

    connectedCallback () {
        // do some stuff
        // maybe populate a portion of the content
        const content = document.createElement('div');
        content.id = 'content';

        // move anything that was created inside of the element to the shadows
        content.insertAdjacentHTML('beforeend', this.innerHTML);
        this.innerHTML = null;
        const shadow = self.attachShadow({ mode: "open" });
        shadow.appendChild(content);   

    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} => ${newValue}.`);
    }


}

if (!customElements.get('curious-expandable'))
    customElements.define('curious-expandable', CuriousExpandable);
    // customElements.define('curious-expandable', CuriousExpandable,  { extends: 'button' });
