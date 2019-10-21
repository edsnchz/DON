 class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on('text-change', this.update.bind(this));
    this.update();
  }

  calculate() {
    let text = this.quill.getText();
    return (text.length)-1;
  }
  
  update() {
    var length = this.calculate();
    var label = this.options.unit;
    this.container.innerText = (length < 200)?(length + label):(length + " Caracteres");
  }
}

Quill.register('modules/counter', Counter);

 var toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link']
  ]
}

var quillCrear;
var quillEditar;

function crearEditorCrear(divID){
  quillCrear = new Quill('#'+divID, {
    modules: {
      "toolbar": toolbarOptions,
      counter: {
        container: '#counterCrear',
        unit: ' caract. (Minino 200)'
      }
    },
    placeholder: '',
    theme: 'snow',
  });  
}

function crearEditorEditar(divID){
  quillEditar = new Quill('#'+divID, {
    modules: {
      "toolbar": toolbarOptions,
      counter: {
        container: '#counterEditar',
        unit: ' caract. (Minino 200)'
      }
    },
    placeholder: '',
    theme: 'snow',
  });  
}

