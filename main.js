'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');        
    const inputVertical = document.getElementById('input-vertical');
    const inputGorizont = document.getElementById('input-gorizont');
    const btnElse = document.getElementById('btn-else');
    const container = document.getElementById('container');
    let array = [];
    let src;
    let vertical;
    let gorizont;
    for (let k = 0; k < 51; k++) {
        src = k+'.png';
        array.push(src);  
    }

    
    form.addEventListener('submit',  function(e) {
        e.preventDefault();
        let div;
        let imgFront;
        let imgBack;
        let newArray;
        let fullArray;
        let counter = document.getElementById("counter");
        let my_timer;

        function countdown() {
            let secs = 60;
            function tick() {
                secs--;
                counter.innerHTML = "0:" + (secs < 10 ? "0" : "") + String(secs);
                if( secs > 0 ) {
                    my_timer = setTimeout(tick, 1000);
                } else {
                    alert("время вышло");
                    clearInterval(my_timer);
                    counter.innerHTML = '1:00';
                }
            }
            tick();
        }
        countdown(60);

        vertical = parseInt(inputVertical.value);
        gorizont = parseInt(inputGorizont.value);
        if (vertical < 2 || vertical > 10 || vertical % 2 == 1) {
            vertical = 4;
        }
        if (gorizont < 2 || gorizont > 10 || gorizont % 2 == 1) {
            gorizont = 4;
        }
        
        if (vertical*gorizont/2 < array.length) {
            newArray = array.slice(array.length - (vertical*gorizont/2));
            fullArray = newArray.concat(newArray);     
        }

        function shuffle(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
          
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
          
            return array;
          }
          shuffle(fullArray);
          console.log(fullArray);
        

        for (let i = 0; i < fullArray.length; i++) {
            
            div = document.createElement('div');
            imgFront = document.createElement('img');
            imgBack = document.createElement('img');
            imgBack.classList.add('back');
            imgBack.src = fullArray[i]; 
            
            imgFront.classList.add('front');
            imgFront.src = 'https://magiyagadaniya.ru/wp-content/themes/magiyagadaniya/images/karti/0.svg';
            div.classList.add('couples'); 
            div.style.flex = `0 1 calc(100% / ${gorizont} - 15px)`;
            container.appendChild(div);
            div.appendChild(imgBack);
            div.appendChild(imgFront);
            div.dataset.number = fullArray[i];
            
        }

        const cards = document.querySelectorAll('.couples');
        let hasFlippedCard = false;
        let firstCard, secondCard;
        let lockBoard = false;

        function flipCard() {
            if (lockBoard) return;
            this.classList.add('flip');

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                return;
            }

            secondCard = this;
            hasFlippedCard = false;

            checkForMatch();
        }

        function checkForMatch() {
            if (firstCard.dataset.number == secondCard.dataset.number) {
                disableCards();
                return;
            }

            unflipCards();
        }

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                lockBoard = false;
            }, 1500);
        }
    
        cards.forEach(card => card.addEventListener('click', flipCard));
        const cardsFinish = document.getElementsByClassName('couples flip');
        cards.forEach(card => card.addEventListener('click', function() {
            if (cardsFinish.length == fullArray.length) {
                alert('Вы выиграли');
                clearInterval(my_timer);
                counter.innerHTML = '1:00';
            }
            
        }));
        
        function reloadGame () {
            cards.forEach(function(card){
                card.remove()
            })
        }

        btnElse.addEventListener('click', reloadGame);
        btnElse.addEventListener('click', function(){
            clearInterval(my_timer);
            counter.innerHTML = '1:00';
        });

    })

        

})