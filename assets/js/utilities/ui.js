/*  UI обработчики и функции
============================ */

$(document).ready(function($) {

      // Инициализируем фаундейшн
      $(document).foundation();

      // Открыть загрузку файла на клик
      $("#dropzone").click(function() {
        if ( !$(this).hasClass('loaded') ) { $("#file-input").click(); }
      });

      $("#key_upload_button").click(function() { $("#key_upload_file").click(); });

      $("#dropzone").hover(function() {
        $(this).addClass('mouseover');
      }, function() {
        $(this).removeClass('mouseover');
      });

      // При загрузке файла
      $('#file-input').change(function() {

        // Проверем расширение
        var ext = $(this).val().split(".").last();
        var size =  document.getElementById($(this).attr('id')).files[0].size / Math.pow(2, 20);

        if ( $.inArray(ext, ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"]) < 0 )
          { alert("Неправильный формат файла."); return; }

        if ( size > 10 )
          { alert("Файл слишком большой, загрузите файл меньше 2MB."); return; }

        PreviewImage();
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


      // Сохраняем канвас на клик как файл png
      $('#image-mod-download').click(function(e) {

          if (blobUrl !== null) { window.URL.revokeObjectURL(blobUrl); }

          var blob = b64toBlob(image.mod_code.split(",").last(), image.type);
          var blobUrl = URL.createObjectURL(blob);

          $(this).attr({
            'href': blobUrl,
            'download': image.name + "." + image.extension
          });

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
                var reader = new FileReader();
                reader.index = i;
                reader.file = file;
                reader.addEventListener("loadend", dropApp.buildImageListItem, false);
                reader.readAsDataURL(file);
              }
              if(file.size < 2097152*5) {
                if(file.type != "image/jpeg") {
                  if(file.type != "image/png") {
                    alert("Неправильный формат файла");
                  } else { readItems(); }
                }
                else {
                  readItems();
                }

              } else {
                alert("Файл слишком большой, загрузите файл меньше 2MB.");
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

});

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


// Конвертируем в БЛОБ
function b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


