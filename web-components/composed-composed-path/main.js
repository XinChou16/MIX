// open-shadow
customElements.define('open-shadow', 
  class extends HTMLElement {
    constructor() {
      super();

      const pEl = document.createElement('p');
      pEl.textContent = this.getAttribute('text');

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(pEl);
    }
  }
);

// closed-shadow
customElements.define('closed-shadow',
 class extends HTMLElement {
   constructor() {
     super();

     const pEl = document.createElement('p');
     pEl.textContent = this.getAttribute('text');
     
     const shadowRoot = this.attachShadow({ mode: 'closed' });
     shadowRoot.appendChild(pEl);
   }
 }
);
