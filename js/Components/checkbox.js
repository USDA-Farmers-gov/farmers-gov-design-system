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
