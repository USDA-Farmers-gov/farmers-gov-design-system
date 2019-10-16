export default class Step {

  constructor(step, stepper){
    this.data = { ...step }
    this.results = [];
    this.domElement = '';
    this.stepTypes = {
      'checkbox': {
        make: (stepObj) => {
          const checkboxMarkup = (selection, width = 'medium-4') => {
            return `
              <div class="${width}">
                <label class="checkbox-card-label with-image" for="${selection.name}" tabindex="0">
                  <div class="cb-img-card-top">
                    <h2>${selection.text}</h2>
                  </div>
                  <div class="cb-img-card-bottom">
                    <input class="checkbox-card-input" id="${selection.name}" type="checkbox">
                    <span class="cb-icon"></span>
                  </div>
                </label>
              </div>
            `;
          }

          return stepObj.selections.map( item => checkboxMarkup(item, stepObj.selection_width_class) ).join(',').split(',').join('');
        },
        checkboxNext: (stepObj) => {
          let div = document.createElement('div');
          let btn = document.createElement('button');
          let tmp = document.createElement('span');
          div.classList.add('next-btn');
          btn.classList.add('btn');
          btn.innerText = 'Next';
          btn.addEventListener('click', this.stepComplete());
          div.appendChild(btn);
          tmp.appendChild(div);

          return div;
        }
      },
      'radio': {
        make: (stepObj) => {
          const radioMarkup = (selection, width = 'medium-3') => {
            return `
              <div class="${width}">
                <label tabindex="0" for="${selection.id}" class="radio-card-label with-image">
                  <div class="radio-img-card-top">
                    <h2>${selection.text}</h2>
                  </div>
                  <div class="radio-img-card-bottom">
                    <input type="radio" id="${selection.id}" class="radio-card-input" name="${selection.name}" title="Card Radio" tabindex="0">
                    <span class="radio-icon"></span>
                  </div>
                </label>
              </div>
            `;
          }

          return stepObj.selections.map( item => radioMarkup(item, stepObj.selection_width_class) ).join(',').split(',').join('');
        }
      },
      'select': {
        make: (stepObj) => {
          const selectMarkup = (selection, width = 'medium-3') => {
            return `
              <div class="${width}">
                <label for="${ selection.id }" style="font-size:1.6rem;line-height:2.4rem;height:2.4rem;">${ stepObj.label_text }</label>
                <select id="${ selection.id }" name="${ selection.name }">
                  <option></option>
                  ${ selection.options.map( opt => {
                    return '<option value='+opt.value+'>'+ opt.text || opt.value +'</option>'
                  })}
                </select>
              </div>
            `;
          }

          return stepObj.selections.map( item => selectMarkup(item, stepObj.selection_width_class) ).join(',').split(',').join('');
        }
      },
      'final': {
        make: (stepObj) => {
          const finishMarkup = (selection, width = 'medium-3') => {
            return `
              <div class="${width}">
                <button class="btn">${selection.text}</button>
              </div>
            `;
          }

          return stepObj.selections.map( item => finishMarkup(item, stepObj.selection_width_class) ).join(',').split(',').join('');
        }
      }
    }
    this.stepper = stepper;
  }

  stepComplete(thing){

  }

  rebuildDomElement(){
    if (!!this.stepTypes[this.data.type]) {
      let html =  `
      <div ${ this.data.type == 'radio' ? 'role="radiogroup"': 'role="group"'} aria-label="step-${this.data.step}" class="vertical-step">
        <div class="vertical-step-left">
          <span class="step-icon">${ this.data.icon ? this.data.icon : this.data.step }</span>
        </div>
        <div class="vertical-step-content">
          <div class="vertical-step-header">
            <h2>${ this.data.title }</h2>
            ${ this.data.subtitle ? '<p>'+this.data.subtitle+'</p>': ''}
          </div>
          <div class="vertical-step-selections">
          ${ this.stepTypes[this.data.type].make(this.data) }
          </div>
        </div>
      </div>
      `;

      let template = document.createElement('template');
      template.innerHTML = html.trim();
      if (this.data.type == 'checkbox') {
        template.content.firstChild.querySelector('.vertical-step-content:last-child')
        .appendChild(this.stepTypes[this.data.type].checkboxNext(this.data))
      }
      if (this.data.type == 'select') {
        let tmp = template.content.firstChild.querySelector('.vertical-step-content:last-child')
        tmp.querySelector('select').addEventListener('change', this.data.changeHandler)
      }
      template.content.firstChild.addEventListener('click', this.data.stepClick);
      this.domElement = template.content.firstChild;
      this.domElement.addEventListener('click', this.data.clickHandler)
      return template.content.firstChild;
    }
  }

  markup(){
    if (this.domElement) {
      return this.domElement;
    } else {
      if (!!this.stepTypes[this.data.type]) {

        let html =  `
        <div ${ this.data.type == 'radio' ? 'role="radiogroup"': 'role="group"'} aria-label="step-${this.data.step}" class="vertical-step ${this.data.step == this.stepper.steps.length ? 'last-step': ''}">
          <div class="vertical-step-left">
            <span class="step-icon">${ this.data.icon ? this.data.icon : this.data.step }</span>
          </div>
          <div class="vertical-step-content">
            <div class="vertical-step-header">
              <h2>${ this.data.title }</h2>
              <p>${ this.data.subtitle }</p>
            </div>
            <div class="vertical-step-selections">
            ${ this.stepTypes[this.data.type].make(this.data) }
            </div>
          </div>
        </div>
        `;

        let template = document.createElement('template');
        template.innerHTML = html.trim();
        if (this.data.type == 'checkbox') {
          template.content.firstChild.querySelector('.vertical-step-content:last-child')
          .appendChild(this.stepTypes[this.data.type].checkboxNext(this.data))
        }
        if (this.data.type == 'select') {
          let tmp = template.content.firstChild.querySelector('.vertical-step-content:last-child')
          tmp.querySelector('select').addEventListener('change', this.data.changeHandler)
        }
        template.content.firstChild.addEventListener('click', this.data.stepClick);
        this.domElement = template.content.firstChild;
        this.domElement.addEventListener('click', this.data.clickHandler)
        return template.content.firstChild;
      }
    }
  }

}
