export class Render{
  constructor(){
    this.boxesElement = document.getElementById('boxes');
    this.wordsElement = document.getElementById('words');
    this.answer = '';
  }

  writeWordsPerId(words,id){
    this.answer = words;
    this.wordsElement.innerHTML = '';
    let array = this.shuffleWords(words);
    for(let i = 0; i < array.length; i++){
      this.createWords(array[i]);
    }
    this.drawBoxesPerId(array.length);
  }
  
  drawBoxesPerId(arrayLength){
    this.boxesElement.innerHTML = '';
    for (let i = 0; i < arrayLength; i++){
      this.createBox();
    }
  }

  shuffleWords(words){
    let array = words.split(' ');
        array = array.sort(_=>Math.random()-0.5);   
        return array;
  }

  createBox(){ //D R O P P A B L E
    const BOX = document.createElement('div');
    // BOX.classList.add("card","border-dark", "mb-3", "box", "droppable");
    BOX.classList.add("border-dark", "mb-3", "box", "droppable");

    this.boxesElement.appendChild(BOX);
    const BOX_BODY = document.createElement('div');
    BOX_BODY.classList.add("card-body");
    BOX.appendChild(BOX_BODY);
    
  }

  createWords(words){ // D R A G G A B L E
    const WORDS = document.createElement('div');
    // WORDS.classList.add("card", "text-white", "bg-info", "mb-3", "word", "draggable");
    WORDS.classList.add("mb-3", "word", "draggable");
    WORDS.setAttribute("draggable","true");
    WORDS.setAttribute("data-draggable-id", words);
    

    this.wordsElement.appendChild(WORDS);
    const WORDS_BODY = document.createElement('div');
    WORDS_BODY.classList.add("card-body");
    WORDS_BODY.style.padding = '5px';
    WORDS.appendChild(WORDS_BODY);

    const WORD = document.createElement('h4');
    WORD.classList.add("card-title", "display-4");
    WORD.textContent = words;

    WORDS_BODY.appendChild(WORD);
  }

  checkAnswer(words, isLast){
    if(isLast){
      //disable button
      console.log('disbale button');
      let button = document.getElementById('nextBtn');
      button.disabled = true;
    }
  }
  
}
// drag and drop class

export class Draggable {
  constructor(){
    this.dragElement = document.querySelectorAll('.draggable');
    this.dropElement = document.querySelectorAll('.droppable');
    this.dragElement.forEach(element => {
      element.addEventListener('dragStart', this.dragStart);
      element.addEventListener('dragEnd', this.dragEnd);
    });
    this.dropElement.forEach(element => {
      element.addEventListener('dragEnter', this.dragEnter);
      element.addEventListener('dragOver', this.dragOver);
      element.addEventListener('dragLeave', this.dragLeave);
      element.addEventListener('dragDrop', this.dragDrop);
    });
    
  }
  dragStart(e){
    e.dataTansfer.setData('text', e.target.id);
  }
  dragEnd(){
    
  }
  dragOver(e){
    if(!e.target.classList.contains('dropped')){
      e.preventDefault();
    }
  }
  dragEnter(e){
    if(!e.target.classList.contains('dropped')){
      e.target.classList.add("droppable-hover");
    }
  }
  dragLeave(){
    e.target.classList.remove("droppable-hover");
  }
  dragDrop(e){
    e.preventDefault();
    const tar = e.target;
    tar.classList.remove("droppable-hover");
    const draggableElementData = e.dataTransfer.getData('text');
    const droppableElementData = tar.getAttribute('data-draggable-id');

    // if(draggableElementData === droppableElementData){
      
      tar.classList.add('dropped');
      const draggableElement = document.getElementById(draggableElementData);
      tar.style.backgroundColor = draggableElement.style.color;

      draggableElement.classList.add('dragged');
      draggableElement.setAttribute('draggable', 'false');
      console.log(draggableElement.id);
      tar.innerHTML = '';
      tar.innerHTML += `<i class="fas fa-${draggableElement.id} draggable" draggable="true" style= "justify-content: center; color: white;" id="cat"></i>`;
    // }
  }
}