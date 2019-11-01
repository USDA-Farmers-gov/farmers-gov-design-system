

# Vertical Stepper

The following javascript snippet can be copied and pasted into a javascript file or in a `<script>` tag in an HTML file.
In order for this example to work you'll need to have an element with an ID of `stepper-root` in your HTML, otherwise you can change the value of the `rootElement` variable to a different **valid css selector** in the _Setup_ section below.

```javascript
let stepsArray = [
//   ______  __    __   _______   ______  __  ___ .______     ______   ___   ___  _______     _______.
//  /      ||  |  |  | |   ____| /      ||  |/  / |   _  \   /  __  \  \  \ /  / |   ____|   /       |
// |  ,----'|  |__|  | |  |__   |  ,----'|  '  /  |  |_)  | |  |  |  |  \  V  /  |  |__     |   (----`
// |  |     |   __   | |   __|  |  |     |    <   |   _  <  |  |  |  |   >   <   |   __|     \   \    
// |  `----.|  |  |  | |  |____ |  `----.|  .  \  |  |_)  | |  `--'  |  /  .  \  |  |____.----)   |   
//  \______||__|  |__| |_______| \______||__|\__\ |______/   \______/  /__/ \__\ |_______|_______/    


  { // This is the format the stepper currently expects for the 'Checkbox' step type.
    type: 'checkbox', // The type of step needed (required)
    step: 1,  // The order of this step (required)
    title: 'Example question 1', // Step title h2 tag
    selection_width_class: 'medium-4', // Set the width class of selections (default is 'medium-4')
    subtitle: 'This is supporting text for the question.', // Step subtitle p tag
    selections: [ // Array of objects representing checkboxes
      {
        text: 'Yes', // Label text (required)
        name: 'cb-ex-yes' // Checkbox input name (required)
      }
    ],
    clickHandler: (event) => { // Click event handler function for this step
      /*  Example code....
        if (event.target.classList.contains('btn')) {
          stepper.nextStep({step: 1});
        }
      */
    }
  },


  //
  // .______          ___       _______   __    ______        _______.
  // |   _  \        /   \     |       \ |  |  /  __  \      /       |
  // |  |_)  |      /  ^  \    |  .--.  ||  | |  |  |  |    |   (----`
  // |      /      /  /_\  \   |  |  |  ||  | |  |  |  |     \   \    
  // |  |\  \----./  _____  \  |  '--'  ||  | |  `--'  | .----)   |   
  // | _| `._____/__/     \__\ |_______/ |__|  \______/  |_______/    
  //

  { // This is the format the stepper currently expects for the 'Radio' step type.
    type: 'radio',  // The type of step needed (required)
    step: 2,  // The order of this step (required)
    title: 'Example question 2',  // Step title h2 tag
    subtitle: '',  // Step subtitle p tag
    selection_width_class: 'medium-4', // Set the width class of selections (default is 'medium-3')
    selections: [  // Array of objects representing radios
      {
        text: 'Yes Radio', // Label text (required)
        id: 'radio-ex-yes', // Radio input name (required)
        name: 'radio-step-example' // Name for radio group (required)
      }
    ],
    clickHandler: (event) => {
      /* Example code...
      if (event.target.getAttribute('name') == 'radio-step-example') {
        stepper.nextStep({step: 2})
      }
      */
    }
  },


//      _______. _______  __       _______   ______ .___________.                                            
//     /       ||   ____||  |     |   ____| /      ||           |     ___                                    
//    |   (----`|  |__   |  |     |  |__   |  ,----'`---|  |----`    ( _ )                                   
//     \   \    |   __|  |  |     |   __|  |  |         |  |         / _ \/\                                 
// .----)   |   |  |____ |  `----.|  |____ |  `----.    |  |        | (_>  <                                 
// |_______/    |_______||_______||_______| \______|    |__|         \___/\/                                 
//
//  _______  .______        ______   .______    _______   ______   ____    __    ____ .__   __.      _______.
// |       \ |   _  \      /  __  \  |   _  \  |       \ /  __  \  \   \  /  \  /   / |  \ |  |     /       |
// |  .--.  ||  |_)  |    |  |  |  | |  |_)  | |  .--.  |  |  |  |  \   \/    \/   /  |   \|  |    |   (----`
// |  |  |  ||      /     |  |  |  | |   ___/  |  |  |  |  |  |  |   \            /   |  . `  |     \   \    
// |  '--'  ||  |\  \----.|  `--'  | |  |      |  '--'  |  `--'  |    \    /\    /    |  |\   | .----)   |   
// |_______/ | _| `._____| \______/  | _|      |_______/ \______/      \__/  \__/     |__| \__| |_______/    


  {  // This is the format the stepper currently expects for the 'Select' step type.
    type: 'select', // The type of step needed (required)
    step: 3, // The order of this step (required)
    title: 'Example question 3', // Step title h2 tag
    subtitle: "", // Step subtitle p tag
    label_text: 'Dropdown Label', // Label for select / dropdown
    selections: [ // Array is used here to preserve uniformity (Even though there should only be one object, representing the select input).
      {
        id: 'form-select-one', // 'id' attribute for the select input
        name: 'form-select', // Select input name
        options: [ // Array of options for this select input
          {
            value: '1', // Set the 'value' attribute of this option
            text: 'Option 1' // Set the 'innerText' of this option
          }
        ]
      }
    ],
    changeHandler: (event) => {  // Change event handler function for this select input (clickHandler is available also)
      /*  Example code...
        let isAnswred = document.querySelector('#form-select-one').value
        if (isAnswred) {
          stepper.nextStep({step: 4})
        }
      */
    }
  },


 //
 //  _______  __  .__   __.      ___       __              _______.___________. _______ .______   
 // |   ____||  | |  \ |  |     /   \     |  |            /       |           ||   ____||   _  \  
 // |  |__   |  | |   \|  |    /  ^  \    |  |           |   (----`---|  |----`|  |__   |  |_)  |
 // |   __|  |  | |  . `  |   /  /_\  \   |  |            \   \       |  |     |   __|  |   ___/  
 // |  |     |  | |  |\   |  /  _____  \  |  `----.   .----)   |      |  |     |  |____ |  |      
 // |__|     |__| |__| \__| /__/     \__\ |_______|   |_______/       |__|     |_______|| _|      
 //

  {
    type: 'final',
    step: 5,
    icon: '<img src="./img/Stepper Doc Icon.svg" />', // Stepper expects HTML element as a string
    title: 'Last step with a call-to-action',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    selections: [ // The stepper only expects one selection
      {
        text: 'BUTTON' // Stepper expects only button text
      }
    ],
    clickHandler: (evt) => {
      console.log(myStepper.formData);
    }
  }
];


//
//      _______. _______ .___________. __    __  .______   
//     /       ||   ____||           ||  |  |  | |   _  \  
//    |   (----`|  |__   `---|  |----`|  |  |  | |  |_)  |
//     \   \    |   __|      |  |     |  |  |  | |   ___/  
// .----)   |   |  |____     |  |     |  `--'  | |  |      
// |_______/    |_______|    |__|      \______/  | _|      
//

let rootElement = '#stepper-root'; // The stepper expects a query string, like one that is used with the document.querySelector() function.
let formName = 'myStepper'; // This will be the name attribute of the form generated by the stepper.

const myStepper = new Stepper(rootElement, formName, stepsArray) // instantiate new Stepper, passing in required arguments.


//
// .___  ___.  _______ .___________. __    __    ______    _______       _______.
// |   \/   | |   ____||           ||  |  |  |  /  __  \  |       \     /       |
// |  \  /  | |  |__   `---|  |----`|  |__|  | |  |  |  | |  .--.  |   |   (----`
// |  |\/|  | |   __|      |  |     |   __   | |  |  |  | |  |  |  |    \   \    
// |  |  |  | |  |____     |  |     |  |  |  | |  `--'  | |  '--'  |.----)   |   
// |__|  |__| |_______|    |__|     |__|  |__|  \______/  |_______/ |_______/    
//

myStepper.render(); // This Stepper method appends the stepper form to the root element provided.
myStepper.nextStep( {step: 1} ) // This method requires an object with a 'step' key value pair as an argument.
console.log(myStepper.formData); // The 'formData' property of the stepper is an array of stepper form inputs that have a value.
console.log(myStepper.formDataJson); // This gets the stepper results as a JSON obj 

```
