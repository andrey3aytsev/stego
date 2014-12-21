/*  UI обработчики и функции
============================ */

$(document).ready(function($) {

      // Сохраняем канвас на клик как файл png
      $('#image-mod-download').click(function() {
          var dt = canvas_mod.toDataURL("image/png");
          this.href = dt;
      });






      // Разрешаем ввод только в английской раскладке
      $("#input").keypress(function(event){
          var ew = event.which;
          if(1 <= ew && ew <= 122)
              return true;
          return false;
      });

});

// Сохраняем стеганоключ из поля
function get_stego_key () {
    image.stego_key = $('#quant-key-field').val().split(",");
}


// Получаем сообщение из поля на клик
function get_msg_from_field () {
  console.log(ABC.toBinary( $('#input').val() ));
  return ABC.toBinary( $('#input').val() );
}

// Показать блок(и)
function show_blocks() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].slideDown();
    }
}

// Скрыть блоки(и)
function hide_blocks() {
    for (var i = 0; i < arguments.length; i++) {
        arguments[i].hide();
    }
}