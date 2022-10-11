


const template = document.createElement('template')
template.innerHTML = `
<style>
#road {
    height:3px;
    width:3px;
    background:#4a2c02;
}
</style>
<div id="road"></div>
`

customElements.define('fantasy-road', 

class extends HTMLElement {
    #road
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
        this.#road = this.shadowRoot.querySelector('#road')
    }
})