const template = document.getElementById('my-paragraph')

customElements.define(template.id, class extends HTMLElement {
  constructor() {
    super()

    const tpl = template.content.cloneNode(true)
    this.attachShadow({ mode: 'open' }).appendChild(tpl)
  }
})

const slottedSpan = document.querySelector('my-paragraph span')

console.log(slottedSpan.assignedSlot)
console.log(slottedSpan.slot)
