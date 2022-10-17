import './random-character-info.js'
import './card.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
#cardIcon {
    border-radius:50%;
    height:200px;
    position:absolute;
    width:150px;
    margin-top:10px;
    margin-left:330px;
}


</style>
<fantasy-card id="card">
<random-character-info id="info"></random-character-info>
</fantasy-card>
</div>
`

customElements.define('random-character-card', 

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
          this.#card.setCharacterStyle()
          this.#info.setNewInfo()
        })
    }

    getCharacterAttributes() {
      return this.#info.getAttributes()
    }

    openCard() {
      this.#card.setCharacterStyle()
      this.#card.openCard()
      this.#info.setNewInfo()
    }
})