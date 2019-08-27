// window.addEventListener('load', function(){
//   let checkbox_label;
//   let checked_labels;
//   let for_value;
//   let checkbox_name;
//   let checkbox_card;
//   let checkbox_wrap;
//   let checkbox_card_checked;
//
//   checkbox_wrap = document.querySelectorAll('.checkbox-wrap');
//   checked_labels = document.querySelectorAll('.checkbox:checked');
//   checkbox_card = document.querySelectorAll('.checkbox-card label');
//   checkbox_card_checked = document.querySelectorAll('.checkbox-card:checked');
//
//   function checkBoxes() {
//     this.classList.toggle('checked');
//     for_value = this.getAttribute('for');
//
//     if(this.classList.contains('checked')) {
//       checkbox_name = document.querySelector('input[name="' + for_value + '"]').checked = 'checked';
//       checkbox_name.toggle('checked');
//     } else {
//       checkbox_name = document.querySelector('input[name="' + for_value + '"]').checked = false;
//       checkbox_name.toggle('checked');
//     }
//   }
//
//   for (var i = 0; i < checkbox_wrap.length; i++) {
//     checkbox_wrap[i].addEventListener('click', checkBoxes, false);
//   }
//
//   function checkCards() {
//     this.classList.toggle('checked');
//     checkbox_card_wrap = this.parentNode;
//
//     if(this.classList.contains('checked')) {
//       checkbox_card_wrap.classList.toggle('checked');
//       checkbox_card_wrap.querySelector('input[type="checkbox"]').setAttribute('checked', 'checked');
//       for_value = this.getAttribute('for');
//       checkbox_name = checkbox_card_wrap.querySelector('input[name="' + for_value + '"]').checked = 'checked';
//     } else {
//       checkbox_card_wrap.classList.toggle('checked');
//       checkbox_card_wrap.querySelector('input[type="checkbox"]').checked = false;
//       for_value = this.getAttribute('for');
//       checkbox_name = checkbox_card_wrap.querySelector('input[name="' + for_value + '"]').checked = false;
//     }
//   }
//
//   for (var i = 0; i < checkbox_card.length; i++) {
//     checkbox_card[i].addEventListener('click', checkCards, false);
//   }
// })











window.addEventListener('load', function(){
  let cb_labels = [...document.querySelectorAll('label.checkbox-card-label')];

  cb_labels.map( el => {
      el.addEventListener('click', evt => {
        let target = evt.target;
        target.parentElement.classList.contains('checkbox-card-label') ?
        target = target.parentElement :
        target.parentElement.parentElement.classList.contains('checkbox-card-label') ?
        target = target.parentElement.parentElement : '';

        if (!target.classList.contains('disabled')) {
          if (target.control.checked) {
            target.classList.toggle('checked')
          }
        }
      })

      el.addEventListener('keydown', evt => {
        var target = evt.target;
        var key = evt.which.toString();
        if (key.match(/32|13/)) {
          evt.preventDefault();
          el.click();
        }
      })
  })

})
