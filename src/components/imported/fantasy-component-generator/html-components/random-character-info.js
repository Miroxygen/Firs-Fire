import { CharacterGenerator } from "../generators/character-generator.js"
import { getArrayFromString } from "../helper-functions/string-to-array.js"

const characterGenerator = new CharacterGenerator()
const characterInfo = characterGenerator.getCharacter()
const characterAttributes = getArrayFromString(characterInfo.Traits, ",")

const template = document.createElement('template')
template.innerHTML = `
<style>
#cardInfo {
    height:600px;
    width:550px;
    position:absolute;
}
#nameHolder {
    height:60px;
    width:230px;
    border:ridge #D2AC95;
    margin-top:60px;
    margin-left:30px;
    padding:20px;
    font-size:30px;
    border-radius:5px;
}
#classHolder {
    margin-top:80px;
    margin-left:50px;
    height:25px;
    width:150px;
    border:ridge #D2AC95;
    font-size:20px;
    padding:15px;
    position:absolute;
    border-radius:5px;
}
#raceHolder{
    margin-top:80px;
    margin-left:300px;
    height:25px;
    width:150px;
    border:ridge #D2AC95;
    font-size:20px;
    padding:15px;
    position:absolute;
    border-radius:5px;
}
td {
    border:ridge #D2AC95;
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
    margin-top:150px;
    border-spacing:0px;
    display:inline-block;
}
.hidden {
    display:none;
}
</style>
<div id="cardInfo">
<div id="nameHolder">${characterInfo.Name}</div>
<div id="classHolder">Class : ${characterInfo.Class}</div>
<div id="raceHolder">Race : ${characterInfo.Race}</div>
<table id="attributesHolder">
    <tr id="tableHolder">
        <td>${characterAttributes[0]}</td>
        <td>${characterAttributes[1]}</td>
        <td>${characterAttributes[2]}</td>
        <td>${characterAttributes[3]}</td>
        <td>${characterAttributes[4]}</td>
        <td>${characterAttributes[5]}</td>  
    </tr>
</table>
</div>
`

customElements.define('random-character-info', 

class extends HTMLElement {
    
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
})