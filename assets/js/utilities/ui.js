/*  UI обработчики и функции
============================ */

$(document).ready(function($) {

      // Инициализируем фаундейшн
      $(document).foundation();


      // Открыть загрузку файла на клик
      $("#dropzone").click(function() {
        $("#file-input").click();
      });


      // Показать предпросмотр картики
      function PreviewImage() {
          var oFReader = new FileReader();
          oFReader.readAsDataURL(document.getElementById("file-input").files[0]);

          oFReader.onload = function (oFREvent) {

            $("#dropzone").addClass('loaded');
            $(".block-init-buttons").slideDown();
            $("#src-img, #src-img-view").attr('src', oFREvent.target.result);
          };
      };

      $('#file-input').change(function(event) {
        PreviewImage();
      });


      // Сохраняем канвас на клик как файл png
      $('#image-mod-download').click(function(e) {
        var img = document.getElementById('encripted-pic');
        var a = $("<a>").attr("href", img.src).attr("download", image.name + "." + image.extension).appendTo("body");
        a[0].click();
        a.remove();
      });


      // Разрешаем ввод только в английской раскладке
      $("#input").keypress(function(event){
          var ew = event.which;
          if(1 <= ew && ew <= 122)
              return true;
          return false;
      });


      // Изменяем значение  DCT порога через слайдер
      $('#porog').on('change.fndtn.slider', function(){
        image.dct_P = $(this).attr('data-slider');
      });

      // Изменяем значение  LSB шага через слайдер
      $('#lsb_step').on('change.fndtn.slider', function(){
        image.lsb_step = $(this).attr('data-slider');
      });

      // Выбирание координат DCT
      var index_left = 0;
      $('body').on('click', '.pix_n:not(.selected)', function(event) {
        if (index_left <= 1) {
          $(this).addClass('selected');
          image.coof_num[index_left] = $('.pix_n').index(this);
          if (index_left == 1) {
            $('#dct-encript-start').fadeIn();
          }
        }
        index_left++;
      });


      // Меняем выходной формат на JPEG
      $('#jpegSwitchLabel').click(function(event) {
        if (!$('#jpegSwitch').prop('checked')) {
          image.type = "image/jpeg";
          image.extension = "jpg";
        } else {
          image.type = "image/png";
          image.extension = "png";
        }
      });


      // Drag and drop

        var dropApp = dropApp || {};

        (function(){
          var dropContainer;

          dropApp.setup = function () {
            dropContainer = document.getElementById("dropzone");

            dropContainer.addEventListener("dragenter", function(event){
              event.stopPropagation();
              event.preventDefault();
            }, false);
            dropContainer.addEventListener("dragover", function(event){
              event.stopPropagation();
              event.preventDefault();
            }, false);
            dropContainer.addEventListener("drop", dropApp.handleDrop, false);
          };

          dropApp.handleDrop = function (event) {
            var dt = event.dataTransfer,
              files = dt.files;

            event.stopPropagation();
            event.preventDefault();

            $.each(files, function(i, file){
              function readItems(){
                console.log((file.size/1000000) + "+ MB")
                console.log(file.type)
                var reader = new FileReader();
                reader.index = i;
                reader.file = file;
                reader.addEventListener("loadend", dropApp.buildImageListItem, false);
                reader.readAsDataURL(file);
              }
              if(file.size < 2097152) {
                if(file.type != "image/jpeg") {
                  if(file.type != "image/png") {
                    alert("Incorrect file type");
                  }

                  else {
                    readItems();
                  }
                }
                else {
                  readItems();
                }

              } else {
                alert("File is too large, needs to be below 2MB.");
              }
            });
          };

          dropApp.buildImageListItem = function(event) {
            var data = event.target.result,
              file = event.target.file,
              getBinaryDataReader = new FileReader();

            $('#src-img, #src-img-view').attr('src', data);
            $("#dropzone").addClass('loaded');
            $(".block-init-buttons").slideDown();

            getBinaryDataReader.readAsBinaryString(file);
          };

          window.addEventListener("load", dropApp.setup, false);
        })();

        $(document).on("click", ".options",function(){
          $(this).parent().remove();
        });
});

// Сохраняем стеганоключ из поля
function get_stego_key () {
    image.stego_key = $('#quant-key-field').val().split(",");
}


// Получаем сообщение из поля на клик
function get_msg_from_field () {
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

// Генерация значений координат
function cord_gen(element) {
  if (!$(element).hasClass('filled')) {
    for (var i = 1; i <= 64; i++) {
        $(element).append('<li><div class="pix_n">' + i + '</div></li>');
    }
    $(element).addClass('filled');
  }
}
