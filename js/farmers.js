let checkbox_label;
let for_value;
let checkbox_name;

checkbox_label = document.querySelectorAll('.checkbox');
checked_labels = document.querySelectorAll('.checkbox:checked');

for ( var i = 0; i < checkbox_label.length; i++ ) (function(i){ 
  checkbox_label[i].onclick = function() {
    for_value = this.getAttribute('for');
    checkbox_name = document.querySelector('input[name="' + for_value + '"]').checked = 'checked';
    this.setAttribute('checked', 'checked');
  }
  // checkbox_label[i].checked.onclick = function() {
  //   for_value = this.getAttribute('for');
  //   checkbox_name = document.querySelector('input[name="' + for_value + '"]').checked = false;    
  // }
})(i);

// for ( var x = 0; x < checked_labels.length; x++ ) (function(i){ 
//   checked_labels[x].onclick = function() {
//     for_value = this.getAttribute('for');
//     checkbox_name = document.querySelector('input[name="' + for_value + '"]').checked = false;
//     checkbox_name.removeAttribute = 'checked'
//     console.log(checkbox_name);
//   }
// })(x);