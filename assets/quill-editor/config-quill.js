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

var Size = Quill.import('attributors/style/size');
Size.whitelist = ['19px', '23px'];
Quill.register(Size, true);
Quill.register('modules/counter', Counter);

var toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'size': [false, '19px', '23px'] }],
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
        unit: ' Caracteres (Mínimo 200)'
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
        unit: ' Caracteres (Mínimo 200)'
      }
    },
    placeholder: '',
    theme: 'snow',
  });  
}

