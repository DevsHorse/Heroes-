export const filteringCards = () => {
  const filmsList = document.querySelector('.films-list');
  const cards = document.querySelectorAll('.card');
  const message = document.querySelector('.empty-message');

  const disableCheckbox = target => {
    filmsList.querySelectorAll('label').forEach(item => {

      if (target.textContent !== item.textContent && target.tagName !== 'LI' && target.tagName !== 'UL') {

        const filmNo = document.querySelector('label[for="filmNo"]');
        const cards = document.querySelectorAll('.card');
        const input = document.getElementById(item.getAttribute('for'));
        let сount = 0;
  
        item.classList.add('disabled');
        input.setAttribute('disabled', 'true');

          cards.forEach(card => {
            if (card.style.display === 'block') {
              const films = card.querySelectorAll('.movies-item');

              films.forEach(film => { if ( item.textContent === film.textContent ) сount++ });

              if (!card.querySelector('.card-after') && item === filmNo) {
                item.classList.remove('disabled');
                input.removeAttribute('disabled');
              } 
            }
          });

          if (сount > 0) {
            item.classList.remove('disabled');
            input.removeAttribute('disabled');
          };  
      }
    });
  };

  /**
  *  	@param {arr[]} container_for_filtering_values
  */
  let arr = [];

  filmsList.addEventListener('click', event => {
    const target = event.target;

    if (target.type === 'checkbox') {
      const text = target.nextElementSibling.textContent;

      if (target.checked === true) {
        arr.push(text);
      } else {
        arr = arr.filter(item => item !== text);
      }

      cards.forEach(card => {
        if (!card.querySelector('.card-after')) {

          if (arr.length) {
            let counter = 0;

            arr.forEach(item => {
              if (item === 'Doesn\'t have movies*' && arr.length === 1) {
                counter++;
              }
            });

            if (counter > 0) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }

          } else {
            card.style.display = 'block';
          }

        } else {

          if (arr.length) {
            const filmsLi = card.querySelectorAll('.movies-item');
            let counter = 0;

            filmsLi.forEach(li => {
              arr.forEach(check => {
                if (check === li.textContent) {
                  counter++;
                }
              });
            });

            if (counter === arr.length) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }

          } else {
            card.style.display = 'block';
          }
        }
      });
    }

    // If main block is empty, then display message
    let count = 0;
    cards.forEach(card => {
      if (card.style.display === 'block') {
        count++;
      }
    });

    if (count !== 0) {
      message.style.display = 'none';
    } else {
      message.style.display = 'block';
    }

    // Checkbox disable
    disableCheckbox(target);
  });
};