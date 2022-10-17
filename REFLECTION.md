
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


 
 
