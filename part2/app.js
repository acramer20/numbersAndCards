let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1. 
axios
    .get(`${baseURL}/new/draw/`)
    .then(c1 => {
        let {suit, value} = c1.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })

// 2. 

let firstCard = null;
axios
    .get(`${baseURL}/new/draw/`)
    .then(c1 => {
        firstCard = c1.data.cards[0];
        let deck_Id = c1.data.deck_id;
        return axios.get(`${baseURL}/${deck_Id}/draw/`);
    })
    .then(c2 => {
        let secondCard = c2.data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(
              `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
          });
    });

// 3. 

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

axios
    .get(`${baseURL}/new/shuffle/`)
    .then(c1 => {deckId = c1.data.deck_id; $btn.show();
});

$btn.on('click', function() {
  axios
    .get(`${baseURL}/${deckId}/draw/`)
    .then(c1 => {
    let cardSrc = c1.data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (c1.data.remaining === 0) $btn.remove();
  });
});