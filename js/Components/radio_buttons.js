window.addEventListener('load', function(){
  let radio_labels = [...document.querySelectorAll('label.radio-card-label')];

  radio_labels.map( el => {
    if (el.classList.contains('disabled')) {
      el.control.disabled = true;
    }
    el.querySelector('.radio-card-input').addEventListener('change', evt => {
      let radio_name = evt.target.name;
      let rel_radios = [...document.querySelectorAll(`input.radio-card-input[name=${radio_name}]`)];

      rel_radios.map( item => {
        [...item.labels].map( label => {
          if (item.checked) {
            label.classList.add('checked')
          } else {
            label.classList.remove('checked')
          }
        })
      })
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
