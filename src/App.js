import React from "react";
import Header from "./Components/Header";
import { ButtonDiv, ButtonStl } from "./Components/Button/styles";

const cardsNumber = 0;

//função add img na div
function convertExib (cardImg) {
  

  return (`
 
  <img src="img/${cardImg}" class="imgStyle"  /> 
      
  
      
  `); 
}
//função add txt na div
function convertExibTxt (title, message) {
  

  return (`
    <br><hr>
    <h2>${title}</h2>
    <p>${message}</p>
      
  
      
  `); 
};






function App() {  







  


return (
    <div>
     <Header />
     <hr></hr>
     <ButtonDiv>
     <ButtonStl onClick= {fetchData}> ME DE CARTAS </ButtonStl>
     </ButtonDiv>
     
     <div className="cardsDisplay">
     
      <div id="container"></div>
      <div id="containerTxt"></div>
     
     </div>
     
    </div>
  );

  

async function fetchData() {
    
  const totalCards = cardsNumber + 1;
  
  await fetch(`https://apitarot-agpucinelli.vercel.app/api`, {
  method: "GET",  
    
  }).then((response) => response.json())
    .then((data) => { 

    
       //sortreia as cartas
       function selectDistinctItems(data, n) {
        if (n > data.length) {
          // Se n for maior do que o tamanho do array, retorne null ou lide com isso de alguma forma
          return null;
        }
      
        const result = [];
        const usedIndexes = new Set();
      
        while (result.length < n) {
          const randomIndex = Math.floor(Math.random() * data.length);
      
          if (!usedIndexes.has(randomIndex)) {
            result.push(data[randomIndex]);
            usedIndexes.add(randomIndex);
          }
        }
      
        return result;
      }
      
      // Selecionar 1 itens distintos aleatoriamente
      const selectedItems = selectDistinctItems(data, 1);
      
      console.log(selectedItems);


       //
      



        //Inserindo imagens na div
    selectedItems.map((dataItems) => {
    try {      
      
      const ResultsLopp = document.getElementById('container')        
      const cardImg = String(dataItems.img);
      const convertedContent = convertExib(cardImg);
      ResultsLopp.innerHTML = convertedContent + ResultsLopp.innerHTML;       
  
    }catch (error) {
      console.error(`Erro ao processar o item ${dataItems}: ${error}`);

      }
    });
        //Inserindo descrição texto abaixo
    selectedItems.map((dataItems) => {
      try {                
        const ResultsLoppTxt = document.getElementById('containerTxt')
        const title = String(dataItems.title);
        const message = String(dataItems.message);          
        const convertedContent = convertExibTxt(title, message);
        ResultsLoppTxt.innerHTML = convertedContent + ResultsLoppTxt.innerHTML;       
    
      }catch (error) {
        console.error(`Erro ao processar o item ${dataItems}: ${error}`);

        }
      });


  })
}
  fetchData();


}
export default App;
