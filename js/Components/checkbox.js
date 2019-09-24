window.addEventListener('load', function(){

  document.addEventListener('click', evt => {
    let cb_labels = [...document.querySelectorAll('label.checkbox-card-label')];

    cb_labels.map( el => {

      let target = evt.target;
      target.parentElement.classList.contains('checkbox-card-label') ?
      target = target.parentElement :
      !! target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('checkbox-card-label') ?
      target = target.parentElement.parentElement : '';

      if (target === el) {

        if (!target.classList.contains('disabled')) {
          if (target.control.checked) {
            target.classList.add('checked')
          } else {
            target.classList.remove('checked')
          }
        }

      }
    })
  })

  document.addEventListener('keydown', evt => {

    let cb_labels = [...document.querySelectorAll('label.checkbox-card-label, label.checkbox-label')];

    cb_labels.map( el => {

      let target = evt.target;
      target.parentElement.classList.contains('checkbox-card-label') ?
      target = target.parentElement :
      !! target.parentElement.parentElement && target.parentElement.parentElement.classList.contains('checkbox-card-label') ?
      target = target.parentElement.parentElement : '';

      if (el === target) {
        var key = evt.which.toString();
        if (key.match(/32|13/)) {
          evt.preventDefault();
          target.click();
        }
      }
    })

  })

})
