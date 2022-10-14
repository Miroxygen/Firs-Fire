import './card.js'
import './random-monster-info.js'



const template = document.createElement('template')
template.innerHTML = `
<style>
</style>
<fantasy-card id="card">
<random-monster-info id="info"></random-monster-info>
</fantasy-card>
`

customElements.define('random-monster-card', 

class extends HTMLElement {
    #card
    #info
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#card = this.shadowRoot.querySelector('#card')
        this.#info = this.shadowRoot.querySelector('#info')

        this.#card.addEventListener('click', () => {
            this.#card.setMonsterStyle()
            this.#info.setInfo()
        })
    }

    getMonsterAttributes() {
      return this.#info.getMonsterAttributes()
    }

    setCardAsBoss() {
      this.#info.setBossAttributes()
    }
})