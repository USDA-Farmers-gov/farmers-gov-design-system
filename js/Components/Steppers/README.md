```javascript
let stepsArray = [
  //
  //   .g8"""bgd `7MMF'  `7MMF'`7MM"""YMM    .g8"""bgd `7MMF' `YMM' `7MM"""Yp,   .g8""8q.`YMM'   `MP' `7MM"""YMM   .M"""bgd
  // .dP'     `M   MM      MM    MM    `7  .dP'     `M   MM   .M'     MM    Yb .dP'    `YM.VMb.  ,P     MM    `7  ,MI    "Y
  // dM'       `   MM      MM    MM   d    dM'       `   MM .d"       MM    dP dM'      `MM `MM.M'      MM   d    `MMb.    
  // MM            MMmmmmmmMM    MMmmMM    MM            MMMMM.       MM"""bg. MM        MM   MMb       MMmmMM      `YMMNq.
  // MM.           MM      MM    MM   Y  , MM.           MM  VMA      MM    `Y MM.      ,MP ,M'`Mb.     MM   Y  , .     `MM
  // `Mb.     ,'   MM      MM    MM     ,M `Mb.     ,'   MM   `MM.    MM    ,9 `Mb.    ,dP',P   `MM.    MM     ,M Mb     dM
  //   `"bmmmd'  .JMML.  .JMML..JMMmmmmMMM   `"bmmmd'  .JMML.   MMb..JMMmmmd9    `"bmmd"'.MM:.  .:MMa..JMMmmmmMMM P"Ybmmd"
  //
  //

  { // This is the format the stepper currently expects for the 'Checkbox' step type.
    type: 'checkbox', // The type of step needed (required)
    step: 1,  // The order of this step (required)
    title: 'Example question 1', // Step title h2 tag
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
  // `7MM"""Mq.        db      `7MM"""Yb. `7MMF' .g8""8q.    .M"""bgd
  //   MM   `MM.      ;MM:       MM    `Yb. MM .dP'    `YM. ,MI    "Y
  //   MM   ,M9      ,V^MM.      MM     `Mb MM dM'      `MM `MMb.    
  //   MMmmdM9      ,M  `MM      MM      MM MM MM        MM   `YMMNq.
  //   MM  YM.      AbmmmqMA     MM     ,MP MM MM.      ,MP .     `MM
  //   MM   `Mb.   A'     VML    MM    ,dP' MM `Mb.    ,dP' Mb     dM
  // .JMML. .JMM..AMA.   .AMMA..JMMmmmdP' .JMML. `"bmmd"'   P"Ybmmd"
  //

  { // This is the format the stepper currently expects for the 'Radio' step type.
    type: 'radio',  // The type of step needed (required)
    step: 2,  // The order of this step (required)
    title: 'Example question 2',  // Step title h2 tag
    subtitle: '',  // Step subtitle p tag
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




  //
  //                                                                                  AW                                                                                                                  
  //  .M"""bgd `7MM"""YMM  `7MMF'      `7MM"""YMM    .g8"""bgd MMP""MM""YMM          ,M'     `7MM"""Yb. `7MM"""Mq.   .g8""8q. `7MM"""Mq.`7MM"""Yb.     .g8""8q.`7MMF'     A     `7MF'`7MN.   `7MF'.M"""bgd
  // ,MI    "Y   MM    `7    MM          MM    `7  .dP'     `M P'   MM   `7          MV        MM    `Yb. MM   `MM..dP'    `YM. MM   `MM. MM    `Yb. .dP'    `YM.`MA     ,MA     ,V    MMN.    M ,MI    "Y
  // `MMb.       MM   d      MM          MM   d    dM'       `      MM              AW         MM     `Mb MM   ,M9 dM'      `MM MM   ,M9  MM     `Mb dM'      `MM VM:   ,VVM:   ,V     M YMb   M `MMb.    
  //   `YMMNq.   MMmmMM      MM          MMmmMM    MM               MM             ,M'         MM      MM MMmmdM9  MM        MM MMmmdM9   MM      MM MM        MM  MM.  M' MM.  M'     M  `MN. M   `YMMNq.
  // .     `MM   MM   Y  ,   MM      ,   MM   Y  , MM.              MM             MV          MM     ,MP MM  YM.  MM.      ,MP MM        MM     ,MP MM.      ,MP  `MM A'  `MM A'      M   `MM.M .     `MM
  // Mb     dM   MM     ,M   MM     ,M   MM     ,M `Mb.     ,'      MM            AW           MM    ,dP' MM   `Mb.`Mb.    ,dP' MM        MM    ,dP' `Mb.    ,dP'   :MM;    :MM;       M     YMM Mb     dM
  // P"Ybmmd"  .JMMmmmmMMM .JMMmmmmMMM .JMMmmmmMMM   `"bmmmd'     .JMML.         ,M'         .JMMmmmdP' .JMML. .JMM. `"bmmd"' .JMML.    .JMMmmmdP'     `"bmmd"'      VF      VF      .JML.    YM P"Ybmmd"
  //                                                                             MV                                                                                                                       
  //                                                                            AW                                                                                                                        

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
  // `7MM"""YMM `7MMF'`7MN.   `7MF'     db      `7MMF'           .M"""bgd MMP""MM""YMM `7MM"""YMM  `7MM"""Mq.
  //   MM    `7   MM    MMN.    M      ;MM:       MM            ,MI    "Y P'   MM   `7   MM    `7    MM   `MM.
  //   MM   d     MM    M YMb   M     ,V^MM.      MM            `MMb.          MM        MM   d      MM   ,M9
  //   MM""MM     MM    M  `MN. M    ,M  `MM      MM              `YMMNq.      MM        MMmmMM      MMmmdM9  
  //   MM   Y     MM    M   `MM.M    AbmmmqMA     MM      ,     .     `MM      MM        MM   Y  ,   MM       
  //   MM         MM    M     YMM   A'     VML    MM     ,M     Mb     dM      MM        MM     ,M   MM       
  // .JMML.     .JMML..JML.    YM .AMA.   .AMMA..JMMmmmmMMM     P"Ybmmd"     .JMML.    .JMMmmmmMMM .JMML.     
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
      console.log(stepper.formData);
    }
  }
];




//
//  .M"""bgd MMP""MM""YMM `7MM"""YMM  `7MM"""Mq.`7MM"""Mq.`7MM"""YMM  `7MM"""Mq.      `7MMM.     ,MMF'`7MM"""YMM MMP""MM""YMM `7MMF'  `7MMF' .g8""8q. `7MM"""Yb.    .M"""bgd
// ,MI    "Y P'   MM   `7   MM    `7    MM   `MM. MM   `MM. MM    `7    MM   `MM.       MMMb    dPMM    MM    `7 P'   MM   `7   MM      MM .dP'    `YM. MM    `Yb. ,MI    "Y
// `MMb.          MM        MM   d      MM   ,M9  MM   ,M9  MM   d      MM   ,M9        M YM   ,M MM    MM   d        MM        MM      MM dM'      `MM MM     `Mb `MMb.    
//   `YMMNq.      MM        MMmmMM      MMmmdM9   MMmmdM9   MMmmMM      MMmmdM9         M  Mb  M' MM    MMmmMM        MM        MMmmmmmmMM MM        MM MM      MM   `YMMNq.
// .     `MM      MM        MM   Y  ,   MM        MM        MM   Y  ,   MM  YM.         M  YM.P'  MM    MM   Y  ,     MM        MM      MM MM.      ,MP MM     ,MP .     `MM
// Mb     dM      MM        MM     ,M   MM        MM        MM     ,M   MM   `Mb.       M  `YM'   MM    MM     ,M     MM        MM      MM `Mb.    ,dP' MM    ,dP' Mb     dM
// P"Ybmmd"     .JMML.    .JMMmmmmMMM .JMML.    .JMML.    .JMMmmmmMMM .JMML. .JMM.    .JML. `'  .JMML..JMMmmmmMMM   .JMML.    .JMML.  .JMML. `"bmmd"' .JMMmmmdP'   P"Ybmmd"
//

let rootElement = '#stepper-root'; // The stepper expects a query string, like one that is used with the document.querySelector() function.
let formName = 'myStepper'; // This will be the name attribute of the form generated by the stepper.

const myStepper = new Stepper(rootElement, formName, stepsArray) // instantiate new Stepper, passing in required arguments.
myStepper.render(); // This Stepper method appends the stepper form to the root element provided.
myStepper.nextStep( {step: 1} ) // This method requires an object with a 'step' key value pair as an argument.
console.log(myStepper.formData); // The 'formData' property of the stepper is an array of stepper form inputs that have a value.

```
