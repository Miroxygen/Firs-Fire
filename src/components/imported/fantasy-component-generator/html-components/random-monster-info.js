import { MonsterGenerator } from "../generators/monster-generator.js"
import { getArrayFromString } from "../helper-functions/string-to-array.js"

const monsterGenerator = new MonsterGenerator()
const monsterInfo = monsterGenerator.getRandomMonster()
const monsterAttributes = getArrayFromString(monsterInfo.Traits, ",")

const template = document.createElement('template')
template.innerHTML = `
<style>
#cardInfo {
    height:600px;
    width:550px;
    position:absolute;
}
#subtypeHolder {
    background: rgba(247,241,245, 0.3);
    height:60px;
    width:230px;
    border:ridge #828778;
    border-radius:5px;
    margin-top:120px;
    margin-left:30px;
    padding:20px;
    font-size:30px;
}
#typeHolder {
    background: rgba(247,241,245, 0.3);
    margin-top:60px;
    margin-left:50px;
    height:25px;
    width:150px;
    border:ridge #828778;
    border-radius:5px;
    font-size:20px;
    padding:15px;
    position:absolute;
    border-bottom:none;
}
#attackHolder{
    background: rgba(247,241,245, 0.3);
    margin-top:240px;
    margin-left:60px;
    height:55px;
    width:400px;
    border:ridge #828778;
    border-radius:5px;
    font-size:20px;
    padding:15px;
    position:absolute;
    white-space: pre-line;
}

.attributes {

}
.hidden {
    display:none;
}

td {
    background: rgba(247,241,245, 0.3);
    border:ridge #828778;
    border-radius:50%;
    padding:10px;
    display:block;
    margin-left:60px;
    margin-top:20px;
    width:70px;
    height:50px;
    font-size:17px;
    text-align:center;
}

tr {
    display:flex;
    flex-wrap:wrap;
}

table {
    margin:auto;
    margin-top:20px;
    border-spacing:0px;
    display:inline-block;
}
</style>
<div id="cardInfo">
<div id="typeHolder"></div>
<div id="subtypeHolder"></div>
<div id="attackHolder">
</div>
<table id="attributesHolder">
    <tr id="tableHolder">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>  
    </tr>
</table>
</div>
`

customElements.define('random-monster-info', 

class extends HTMLElement {
    #typeHolder
    #subtypeHolder
    #attackHolder
    #attributesHolder
    #tableHolder
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.#typeHolder = this.shadowRoot.querySelector('#typeHolder')
        this.#subtypeHolder = this.shadowRoot.querySelector('#subtypeHolder')
        this.#attackHolder = this.shadowRoot.querySelector('#attackHolder')
        this.#attributesHolder = this.shadowRoot.querySelector('#attributesHolder')
        this.#tableHolder = this.shadowRoot.querySelector('#tableHolder')

        this.monster = monsterGenerator.getRandomMonster()
    }

    setInfo() {
      this.setType()
      this.setSubtype()
      this.setAttacks()
      this.setAttributes()
    }

    setType() {
      this.#typeHolder.textContent = this.monster.Type
    }

    setSubtype() {
      this.#subtypeHolder.textContent = this.monster.Subtype
    }

    setAttacks() {
      this.#attackHolder.textContent = `Normal attack : ${this.monster.NormalAttack} \n Legendary attack : ${this.monster.LegendaryAttack}`
    }

    setAttributes() {
      const monsterAttributes = getArrayFromString(this.monster.Traits, ",")
      for(let iterator = 0; iterator < this.#tableHolder.children.length; iterator++) {
        this.#tableHolder.children[iterator].textContent = monsterAttributes[iterator]
      }
    }
})