
# Kapitel 3 Functions

Det som påverkat mig allra mest genom hela boken har nog faktiskt varit dessa två saker ur boken :
"Do One thing"
och,
"One Level of Abstraction".

Detta har gjort att jag inte gör väldigt långa, invecklade funktioner som mixtrar med olika typ av kod.
Jag har, så långt det är möjligt, gjort funktioner som bara gör en sak. Högre upp i hierarkin har jag
lite sötrre huvudfunktioner som kombinerar mindre funktioner för att uppnå den funktionalitet jag kanske
tidigare hade stoppat in i EN funktion.

![Skärmbild 2022-10-17 123359](https://user-images.githubusercontent.com/89847326/196156132-471ff2b3-087d-4e2d-8760-7d83265847a2.png)


 Jag gjorde om denna funktion och delade upp den i fyra funktioner. charaterTurn() innehöll tidigare alla funktioner från de tre underifrån,
 men då gjorde den ju väldigt mycket. Nu är den kortare, och det enda den gör är att kalla på andra funktioner som tillsammans bygger upp
 att det just nu blir karaktärens tur. Det är också tydligare just vad som händer, då fler förklarande namn existerar och minskar nödvändigheten
 för kommentarer.
 
 # Kapitel 4 Comments
 
 Vilket för oss till kommentarer! Vad är en bra kommentar? Jag har haft både svårt och lätt för att släppa tyglarna och inte skriva kommentarer till varje funktion.
 Lätt för att skriva kommentarer tar rätt mycket tid, och det är inte så roligt. Svårt för att jag fortfarande inte riktigt vet vad en bra kommentar är. Jag tror jag dock vet vad en  dålig sådan är.
 
Att lägga in en kommentar bara för att det ser bra ut. 

Mumbling

//dont forget listitem
function removeReadPages(page) {
  newsPaper.remove(page)
 }

Något som kanske betyder något för utvecklaren i just den stunden som den skrivs,
men ser helt enkelt ut som något taget ur luften från en stillbild av dennes hjärna.
En kommentar ska var tydlig och faktiskt förklara något nödvändigt till senare.

Redundant comments

//this class makes cookies
class CookieMaker {

}

Jag tror ändå de som kommer använda CookieMaker klassen förstår att den gör kakor. Kommentarer är onödig.

En bra kommentar då?

Jag har kommit till slutsatsen att den bästa kommentaren är den som inte behöver finnas. Är koden välskriven och lättförståelig
så behövs ingen kommentar. Men, det kommer att exitsera funktioner som kanske inte är så lätta att förstå alla gånger, hur
välskriven den än är.

![Skärmbild 2022-10-17 125330](https://user-images.githubusercontent.com/89847326/196159772-fe3b4cbe-a5d8-4333-a428-c3a484d24c4e.png)

Denna funktion kanske inte är den snyggaste, men namnet förklarar precis vad den gör. Den tar bort CSS margin från ett character card.
Men varför ska den göra det? Här tyckte jag en kommentar passade då det är något som inte görs så ofta, och jag tyckte namnet
removeCharacterCardMarginBecauseCardHasPositionAbsoluteAndMarginNeedsToBeRemovedSoTheCardGoesOnTop() gjorde bara skada.
Jag skriver i kommentaren att korten har position absolute, och jag måste ta bort margin för att de ska få rätt position.


# Kapitel 5 Formatting

**Dependant Functions and Conceptual Affinity**

Jag tyckte dessa två kapitel var snarlika i budskapet de ville få fram, skillnaden är att
dependant functions känns som en typ av conceptual affinity. Nåväl, budskapet är att kod
som har något gemensant ska hänga ihop i distant. Alltså, distansen ska vara så kort som möjlig. 

En funktion som använder en annan bör vara ovanpå denne. 

![Skärmbild 2022-10-18 113928](https://user-images.githubusercontent.com/89847326/196395204-b752afaa-18b0-4839-8ee3-c08ead4f4561.png)

Ett exempel. startBattle är en funktion vars funktion är att använda andra funktioner. startBattle har ingenting annat än en
massa beroenden till andra funktioner. startBattle ska vara ovanpå funktionerna den kallar på.


Det finns även kod som inte använder varandra, men ändå har en länk till varandra som gör att de rent visuellt borde vara nära varandra.


![Skärmbild 2022-10-18 114225](https://user-images.githubusercontent.com/89847326/196396241-80a3b433-53e3-4d2e-9998-a947ab16b022.png)

removeHealthVisible och resetHealthVisible gör två motsatta grejer. Den andra tar bort, den andra återställer. De blir både aldrig kallade samtidigt.
Men de använder båda två samma HTML element, och gör samma sak på detta element. De ändrar färgen på den! Så dessa hade två alternativ,
ligga precis under funktionen som kallar på dem eller ligga bredvid varandra. För de är ju så lika ändå!

 
 # Kaitel 7 Error Handling
 
 Felhantering är jag dålig på. Jag kanske har för stor tilltro till min förmåga att göra felfri kod, eller så vet jag precis vad som gått fel
 när något har gått fel. Men ifall jag skulle göra felhantering har boken gett mig ytterligare förstärkning i att try-catch och att skapa error-klasser/funktioner!
 Jag tycker likt i boken att viss felhantering gör koden stor och klumpig, men en klass vars enda uppgift är att kasta undantag gör ju att "vanliga" klasser 
 bara behöver omges av try-catch och använda error-funktionen.
   
   //Javascript  
 addBakingRecipe(recipe)  {  
   try  {  
     if(recipe !== Typeof(string)) {  
         throw new Error("Recipe needs to be a string")  
       }  else  {  
         this.#recipeBook.addRecipe(recipe)  
         }  
   } catch(error) {  
     console.log(error.message)  
   }  
 }  
 
 Den blir väldigt lång och klumpig. Istället :  
 
 this.#errorHandler = new ErroHandler()  
 
 addBakingRecipe(recipe) {    
   try {  
     this.#erroHandler.checkIfString(recipe)  
     this.#recipeBook.addRecipe(recipe)  
   } catch(error) {   
     console.log(error.message)    
   }   
 }  
   
 //Kan ju nu användas av alla klasser, inte bara recept-klassen!  
 checkIfString(input) {   
   if(input !== Typeof(string)) {  
     throw new Error("Input needs to be a string")  
   }  
 }  
 
**Don't pass/return null**

Nu existerar ju null i JavaScript, och betyder ju att något saknar värde.  
Det finns även undefined som betyder, ja, att något helt enkelt inte är 
definerat ännu. Undefined är något jag stöter på oftare. Jag har aldrig
get ett värde null i JavaScript, men i Java har det förekommit att jag gjort det.
Jag har dock gett en variabel värdet undefined innan jag sätter ett värde med funktioner. 
Det är helt meningslöst flesta gånger att en variabel helt enkelt inte är något.
Vi ska ju arbete med värden och typer, inte någon icke-värdes minnesposition.

Jag gjorde om denna från undefined till att ha typen object. Även fast den är
tom så är den i alla fall något, ett tomt objekt (JavaScript objekt) som ska fyllas.  


![Skärmbild 2022-10-18 122820](https://user-images.githubusercontent.com/89847326/196406697-8885a6ef-5e9d-4e8b-b897-5560840e7835.png)

# Kapitel 8 Boundaries

# Kapitel 9 Unit tests

Klart att testkod ska vara ren kod. Jag har nog av en ren slump lyckats skriva hyfsad ren test kod utan att tänka på det.
Men jag gick tillbaka och ändrade en testsuite som jag hade skrivit på grund av, "One assert, or concept, per test".


![Skärmbild 2022-10-18 162623](https://user-images.githubusercontent.com/89847326/196458601-8d3128c5-150a-41cd-9437-7b424c50af27.png)

Detta är mycket mer lättläst och klart än vad jag hade tidigare, alla tre test ihopklumpade i ett test. 
Alla dessa tre test är 1 assert var, och även fast de behandlar samma koncept (resistance) så är det ju tre olika koncept
av resistans.

# Kapitel 10 Classes

Oj vilken skillnad det blir när jag skriver en "vanlig" klass mot en klass som ärver av HTMLElement. 
Jag tycket det blir jätterörigt att göra för många små HTML komponenter, men det kanske är mig det är fel på.
I mitt huvud när jag gör GameBoard (HTML) så försöker jag göra en klass som representerar brädet. Brädet har alltid kartan,
karaktärerna och monsterna och kan inte existera utan dessa. Därför vill jag stoppa dessa där inne, och inte dela upp brädet 
att en del av brädet vet bara om att kartan existerar. Trots det så har den bara ett syfte, att vara en behållare för dessa
tre saker. Och alla variabler är privata, det går bara att prata med klassen genom att ropa på dess metoder.

![Skärmbild 2022-10-18 164025](https://user-images.githubusercontent.com/89847326/196462187-d7fbcde0-7c82-4c07-b096-b6adb7c508a8.png)

Detta är nog min mest perfekta klass. Den är kort, den är enkel, den gör bara en sak (slår en tärning), variabeln används av 2 av 3 metoder (high cohesion) och den är 
mycket förberedd för en förändring. Denna tärning representar den vanliga sex-sidiga tärningen och borde dock inte vara något annat. Då borde den heta något annat, eller ha en child-klass. 

# Kapitel 11 System

Här måste jag erkänna att jag hade svårt att förstå det här kapitlet, och jag måste nog läsa om det fler gånger än de andra. Mycket kan ha att göra med
att jag inte riktigt är så duktig på Java. Det jag dock förstod och som jag har läst om tidigare är just Separation of concerns. Vem ska göra vad?
Vem är mest lämpad att göra vad? Detta tankesätt har tyvärr inte genomsyrat min tidigare JavaScript kod, men det är ett bra sätt att tänka oavsett
om man jobbar med bara funktioner i JavaScript, eller bygga ihop Ikea möbler med sin polare. Jag tycker det är lättare att illustrera SoC med ett diagram.
