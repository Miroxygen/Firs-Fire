


const template = document.createElement('template')
template.innerHTML = `
<style>
#land {
    height:25px;
    width:25px;
    background:green;
}
</style>
<div id="land"></div>
`

customElements.define('fantasy-land', 

class extends HTMLElement {
    #land
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
        this.#land = this.shadowRoot.querySelector('#land')
    }
})