// import { Child, Parent } from "./module.js";
import { JSONFile} from "./module.js";
import { Render } from "./render.js";

const JSONFILE = new JSONFile();
const RENDER = new Render();

let x = 0;
let arrayLength = 0;

const NEXTBTN = document.getElementById('nextBtn');
NEXTBTN.addEventListener('click', (event) =>{
  event.preventDefault();
    if(x !== (arrayLength-1)){ // render words
      RENDER.checkAnswer('answer', false);
      JSONFILE.fetchAsync().then((data) => {
          setWords(data[x].sentence, data[x].id);
        }
      );
      x += 1;
    }else{
      RENDER.checkAnswer('answer', true)
    }

});

//loads DOMContent
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  JSONFILE.fetchAsync().then((data) => {
    //initialize board
    setFileLength(data.length);
    setWords(data[x].sentence, data[x].id);
    x += 1;
    console.log(`initialize question with x value of : ${x}`);
    }
  );
});

function setFileLength(length) {
  arrayLength = length;
} 

function setWords(words, id){
  RENDER.writeWordsPerId(words,id);
}