import Step from './Step';

export default class Stepper {

  constructor(rootElement, name, stepsArray) {
    this.sRoot = document.querySelector(rootElement);
    this.steps = stepsArray.map( step => {
      return new Step(step, this);
    });
    this.$form = document.createElement('form');
    this.$form.setAttribute('id', name);
    this.$form.addEventListener('submit', (e) => { e.preventDefault() });
    this.currentStep = this.steps[0].data.step;
    this.renderedSteps = [this.steps[0]];
  }

  nextStep(opt){
    this.currentStep = opt.step + 1;
    let nextRenderedStep = this.steps.filter( step => {
      return step.data.step == this.currentStep
    })[0]

    if (nextRenderedStep) {
      nextRenderedStep.rebuildDomElement();
      this.renderedSteps.push(nextRenderedStep);
      this.renderedSteps = this.renderedSteps.filter( stp => stp.data.step <= nextRenderedStep.data.step);
      this.render();
    } else {
      // TODO: Handle no next step object
    }
  }

  render() {
    let temp = document.createElement('div');
    this.$form.innerHTML = '';
    this.renderedSteps.map( step => {
      return step.markup();
    })
    .map( markup => {
      if (!!markup) {
        this.$form.appendChild(markup);
      }
    })

    this.sRoot.innerHTML = '';
    this.sRoot.appendChild(this.$form);
    if (this.renderedSteps.length > 1) {
      this.sRoot.querySelector('.vertical-step:last-child').scrollIntoView({behavior: "smooth"});
    }
    return this.sRoot;
  }

  get formData(){
    return [ ...this.$form.elements ].filter( el => 'checked' in el ? el.checked : el.value );
  }

  get formDataJson(){
    let preJson = this.formData.map( el => {

      let getStepElement = (element) => {
        return element.classList.contains('vertical-step') ?
                                                   element :
                     getStepElement(element.parentElement) ;
      }

      let stepElement = {
        stuff: getStepElement(el.labels[0].parentElement)
      };

      if (!!Object.keys(stepElement).length) {
        return {
          step: stepElement.stuff.getAttribute('aria-label'),
          inputs: { name: el.id || el.name, val: el.checked || el.value}
        }
      }
    })

    let mem = {};
    preJson.map( obj => {
                     obj.step in mem ?
      mem[obj.step].push(obj.inputs) :
      mem[obj.step] = [ obj.inputs ] ;
    });

    preJson = JSON.stringify(mem);

    return preJson;
  }

}
