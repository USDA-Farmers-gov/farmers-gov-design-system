window.addEventListener('load', function(){

  document.addEventListener('click', evt => {

    let radio_labels = [...document.querySelectorAll('label.radio-card-label')];

    radio_labels.map( el => {

      let target = evt.target;
      target.parentElement.classList.contains('radio-card-label') ?
      target = target.parentElement :
      !! target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('radio-card-label') ?
      target = target.parentElement.parentElement : '';

      if (target === el) {
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
      }

    })

  })


  document.addEventListener('keydown', evt => {
    let radio_labels = [...document.querySelectorAll('label.radio-card-label')];

    radio_labels.map( el => {
      var target = evt.target;
      target.parentElement.classList.contains('radio-card-label') ?
      target = target.parentElement :
      !! target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('radio-card-label') ?
      target = target.parentElement.parentElement : '';

      if (target === el) {        
        var key = evt.which.toString();
        if (key.match(/32|13/)) {
          evt.preventDefault();
          el.click();
        }
      }
    })

  })

})
