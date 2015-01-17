/*  Вспомогательные функции
============================ */


// Обьект для работы с сиволами
ABC = {

  win1251 : ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','10','11','12','13','14','15','16','17','18','19','1a','1b','1c','1d','1e','1f','20','21','22','23','24','25','26','27','28','29','2a','2b','2c','2d','2e','2f','30','31','32','33','34','35','36','37','38','39','3a','3b','3c','3d','3e','3f','40','41','42','43','44','45','46','47','48','49','4a','4b','4c','4d','4e','4f','50','51','52','53','54','55','56','57','58','59','5a','5b','5c','5d','5e','5f','60','61','62','63','64','65','66','67','68','69','6a','6b','6c','6d','6e','6f','70','71','72','73','74','75','76','77','78','79','7a','7b','7c','7d','7e','7f','402','403','201a','453','201e','2026','2020','2021','20ac','2030','409','2039','40a','40c','40b','40f','452','2018','2019','201c','201d','2022','2013','2014','2122','459','203a','45a','45c','45b','45f','a0','40e','45e','408','a4','490','a6','a7','401','a9','404','ab','ac','ad','ae','407','b0','b1','406','456','491','b5','b6','b7','451','2116','454','bb','458','405','455','457','410','411','412','413','414','415','416','417','418','419','41a','41b','41c','41d','41e','41f','420','421','422','423','424','425','426','427','428','429','42a','42b','42c','42d','42e','42f','430','431','432','433','434','435','436','437','438','439','43a','43b','43c','43d','43e','43f','440','441','442','443','444','445','446','447','448','449','44a','44b','44c','44d','44e','44f'],

  // Бинарную строку в символы
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      var index = String.fromCharCode(parseInt(ABC.win1251[parseInt(bin, 2)],16));
      index = index || String.fromCharCode(Math.floor((Math.random() * 128) + 1));
      return index;
    })
  },

  // Строку в бинарный вид
  toBinary: function(str) {
    return String(str).replace(/[\s\S]/g, function(str) {
        return ABC.toOctet(ABC.win1251.indexOf(str.charCodeAt().toString(16)).toString(2));
      })
  },

  // к 8-ми значному виду
  toOctet: function(num) {
    return "00000000".slice(String(num).length) + num;
  },

  // Число в бинарный вид
  dec2Bin: function(num) { return ABC.toOctet(num.toString(2)); }
}



// Создание текстового файла
makeTextFile = function (text) {

  // Создаем обьект Blob
  var data = new Blob([text], {type: 'text/plain'});
  if (textFile !== null) { window.URL.revokeObjectURL(textFile); }

  return window.URL.createObjectURL(data);
}


// Чтение текстового файла
function readText(filePath) {
  // Проверем расширение
  var ext = $("#key_upload_file").val().split(".").last();
  var size =  document.getElementById($("#key_upload_file").attr('id')).files[0].size / Math.pow(2, 9);

  if ( ext != "txt" )
    { alert("Неправильный формат файла."); return; }

  if ( size > 10 )
    { alert("Файл слишком большой, загрузите файл меньше 2MB."); return; }

  reader = new FileReader();
  var output = ""; //placeholder for text output
  if(filePath.files && filePath.files[0]) {
      reader.onload = function (e) {
          output = e.target.result;
          displayContents(output);
      };//end onload()
      reader.readAsText(filePath.files[0]);
  }//end if html5 filelist support
  return true;
}

function displayContents(txt) {
  image.stego_key =  txt.split(',');
  $('#key_upload_button')
    .css('background', '#5bbd72')
    .find('span').text('Ключ загружен')
    .siblings('i').removeClass('fi-upload').addClass('fi-check');
  $('.quant-decript-wrap.is-hidden').slideDown();
}



// Метод выборки последнего элемента для массивов
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};










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



/*  Инициализация канваса и параметров
======================================= */

function canvas_init() {

    // Исходное изображение
    src_img        =  $('#src-img')[0];

    // Запоминаем его габариты
    src_img_width  =  $('#src-img').width();
    src_img_height =  $('#src-img').height();

    src_img_width   -= src_img_width % 8;
    src_img_height  -= src_img_height % 8;

    image.size = src_img_height * src_img_width;

    // Канвас для чтения изображения
    canvas_src     =  $('#canvas-src-image')[0];
    cxt_src        =  canvas_src.getContext('2d');

    // Канвас для записи модифицированного изображения
    canvas_mod     =  $('#canvas-mod-image')[0];
    cxt_mod        =  canvas_mod.getContext('2d');

    // Присваиваем канвасам габариты исходной картинк
    canvas_src.width  = canvas_mod.width  = src_img_width;
    canvas_src.height  = canvas_mod.height = src_img_height;

}
/*  Попиксельное чтение изображение
    и сохранение значений каналов массив
======================================== */

function canvas_read_image(image) {

    // Инициализируем канвас
    canvas_init();

    // Отображаем в канвасе исходное изображение
    cxt_src.drawImage(src_img, 0, 0, src_img_width, src_img_height);

    // Поллучаем массив с информацией по цветам
    var myGetImageData = cxt_src.getImageData(0,0, src_img_width, src_img_height);
    var sourceBuffer32 = new Uint32Array(myGetImageData.data.buffer);

    // Проходим по всем пикселям и забираем цвета
    for ( var i = 0 ; i < src_img_width * src_img_height ; i++ ) {

        var value = sourceBuffer32[i];

        // Запоминаем значения текущего пикселя
        var hexString = value.toString(16);

        if ( hexString == 0 ) {
            r_channel = g_channel = b_channel = 255;
        } else {
            var b_channel = parseInt(hexString.slice(2,4), 16);
            var g_channel = parseInt(hexString.slice(4,6), 16);
            var r_channel = parseInt(hexString.slice(6,8), 16);
        }

        // Записываем эти значения в массив в десятичном виде
        image.src_colors.push([r_channel, g_channel, b_channel ]);

    }
}

/*  Функция отрисовки изображения в канвас
    на основе массива цветов пикселей
=========================================== */

function canvas_draw_image (array) {

    // Счетчик
    var i = 0;

    // По всем пикселям проходим
    for ( var y = 0 ; y < src_img_height ; y++ ) {
        for ( var x = 0 ; x < src_img_width ; x++ ) {

            cxt_mod.fillStyle = "rgb(" +
                + array[i][0] + ','
                + array[i][1] + ','
                + array[i][2] + ')';

            cxt_mod.fillRect(x, y, 1, 1);

            i++;

        }
    }

    image.mod_code = canvas_mod.toDataURL(image.type, 1);
    $("#encripted-pic").attr('src', image.mod_code);


}
/*  Функции для работы с LSB
=============================== */


// Создание массива последних битов
function lsb_create_array (image) {

    // Временные переменные
    var array1 = image.src_colors;
    var array2 = [];

    // По всем пикселям проходим
    for (var i = 0; i < image.size; i++) {

        if ( i % image.lsb_step == 0 ) {
            var r_channel = ABC.dec2Bin(array1[i][2]);
            array2.push( r_channel[7] );

        }
    }

    image.lsb = array2;
}


// Изменение последних битов массива цветов
function lsb_modify_array(image, string) {


    var array1 = image.src_colors;
    var array2 = array1;

    var ct = 0;
    // По всем пикселям проходим
    for (var i = 0; i < image.size; i++) {
        var r_channel = ABC.dec2Bin(array1[i][0]);
        var g_channel = ABC.dec2Bin(array1[i][1]);
        var b_channel = ABC.dec2Bin(array1[i][2]);

        if ( (i % image.lsb_step == 0) && (ct < string.length ) ) {
            b_channel = b_channel.substring(0, 7) + string[ct];
            ct++;
        }

        image.mod_colors.push([
            parseInt(r_channel, 2),
            parseInt(g_channel, 2),
            parseInt(b_channel, 2)
        ]);

    }

}


// Функция вывода лсб в текст
function lsb_2_ascii(image) {

    var lsb = image.lsb;

    // Контейнер для выходного текста
    var output_text = $("#output-text");

    // Вывод LSB в цикле
    for ( var i = 0; i < lsb.length - 8 ; i = i + 8) {

        var string = '';

        // Внутренний цикл по битам
        for ( var j = i; j - 8 < i; j++ ) {
            string += lsb[j];
        }

        var output = ABC.toAscii(string);

        // Выводим букву
        $(output_text).append( output );
    }
}





/*  Функции для работы с алгоритмом квантования
================================================= */


// Функция находит разницу цветов соседних пикселей
function quant_color_diffs (image) {

  // Массив разниц цветов соседних пикселей
  image.quant_diffs = [];

  // По всем пикселям
  for (var i = 0; i < image.size - 1; i++) {

    var tmp = image.src_colors[i+1][2] - image.src_colors[i][2];
    image.quant_diffs.push(tmp);
  }

}


// Фyнкция находит значения тетта для каждой строки
function quant_tetta_function (image) {

  image.quant_tetta = [];

  // Сколько единиц добавить в строку
  var added = Math.floor( src_img_width / 3 );

  // По всем строкам
  for (var i = 0; i < src_img_height; i++) {

    var output = 0;

    // По элементам строки
    for (var j = 0; j < src_img_width; j++) {
      output += image.src_colors[ i*src_img_width + j ][2]
    }

    output = (output + added) % 2;

    // Добавляем результат функции как элемент массива
    image.quant_tetta.push(output);
  }

  var count = 0;

  while (image.quant_tetta.length < 511 ) {

    // Дублируем массив
    image.quant_tetta.push(image.quant_tetta[count]);
    count++;
  }

  textFile = null;
  $('#key-download').attr('href', makeTextFile(image.quant_tetta.toString()) );
}

// Функция генерации шкалы возможных разниц
function quant_generate_scale (image) {

  image.quant_scale = [];

  // Все возможные варианты разниц
  for (var i = -255; i <= 255; i++) {
    image.quant_scale.push(i)
  };

}


// Функция внедрения сообщения в массив разниц
function quant_modify_diffs(image, string) {

  for (var i = 0; i < image.size; i++) {
    image.mod_colors.push([
      function_return(image.src_colors[i][0]),
      function_return(image.src_colors[i][1]),
      function_return(image.src_colors[i][2])
    ]);
  };

  for (var i = 0; i < string.length; i++) {

    // Текущий бит строки
    var current_bit = parseInt(string[i]);

    // Текущее значение разницы
    var current_diff = image.quant_diffs[i*5];

    // Позиция текущего значения на шкале
    var position = image.quant_scale.indexOf(current_diff);
    var old_position = position;

    var shift = 0, power = -1;

    // Ищем индекс до тех пор пока не совпадёт
    while ( image.quant_tetta[ position ] != current_bit ) {
      shift++; power *= -1;
      position = position + ( shift * power);
    }

    // Присваиваем новое значение
    var move = position - old_position; // Сдвиг в стеганоключе
    var shifted = image.mod_colors[i*5+1][2] + move; // Сдвинутое значение

    // Изменяем следующий пиксель (или предудыщий если нет места)
    if ( shifted > 255 || shifted < 0 ) {
      image.mod_colors[i*5][2] += -1 * move;
    } else {
      image.mod_colors[i*5+1][2] += move;
    }

  }

}


// Функция модификации массива цветов на основе массива разниц

function function_return (argument) {
  return argument*1;
}


// Функция получения исходного сообщения
function quant_read_message(image) {

    // Контейнер для выходного текста
    var output_text = $("#output-text");

    var result = [];

    for (var i = 0; i < image.quant_diffs.length; i++) {
      if ( i % 5 == 0 ) {
        result.push(
            image.stego_key[ image.quant_scale.indexOf( image.quant_diffs[i] ) ]
        )
      }
    }

    for ( var i = 0; i < result.length - 8 ; i = i + 8) {

        var string = '';

        // Внутренний цикл по битам
        for ( var j = i; j - 8 < i; j++ ) {
            string += result[j];
        }

        var output = ABC.toAscii(string);

        // Выводим букву
        $(output_text).append( output );
    }

}




// Сигма функция Зайцева
function dct_sigma(argument) {
    argument == 0 ? ( argument = (1 / Math.sqrt(2))) : (argument = 1);
    return argument;
}

// Функция кодирования бита сообщения
function dct_encript_bit (bit, val1, val2) {

    // Порог
    P_opposite = image.dct_P * -1;

    var gap = Math.abs(val1) - Math.abs(val2);

    if ( bit == '0' ) {

        if ( gap < image.dct_P ) {

            diff = (image.dct_P - gap) / 2;

            // Если оба положительные
            if ( (val1 >= 0) && (val2 >= 0) ) {
                val1 += diff;
                if ( val2 > diff ) { val2 -= diff }
                else { val1 += diff - val2; val2 = 0; }
            }

            // Если первое положительное
            if ( (val1 >= 0) && (val2 < 0) ) {
                val1 += diff;
                if ( val2 < -diff ) { val2 += diff }
                else { val1 += diff + val2; val2 = 0; }
            }

            // Если второе положительное
            if ( (val1 < 0) && (val2 >= 0) ) {
                val1 -= diff;
                if ( val2 > diff ) { val2 -= diff }
                else { val1 -= diff - val2; val2 = 0; }
            }

            // Если оба отрицательные
            if ( (val1 < 0) && (val2 < 0) ) {
                val1 -= diff;
                if ( val2 < -diff ) { val2 += diff }
                else { val1 -= diff + val2; val2 = 0; }
            }
        }
    }


    if ( bit == '1' ) {

        if ( gap > P_opposite ) {

            diff = Math.abs((P_opposite - gap) / 2);

            // Если оба положительные
            if ( (val1 >= 0) && (val2 >= 0) ) {
                val2 += diff;
                if ( val1 > diff ) { val1 -= diff }
                else { val2 += diff - val1; val1 = 0; }
            }

            // Если первое положительное
            if ( (val1 >= 0) && (val2 < 0) ) {
                val2 -= diff;
                if ( val1 > diff ) { val1 -= diff }
                else { val2 -= diff - val1; val1 = 0; }
            }

            // Если второе положительное
            if ( (val1 < 0) && (val2 >= 0) ) {
                val2 += diff;
                if ( val1 < -diff ) { val1 += diff }
                else { val2 += diff + val1; val1 = 0; }
            }

            // Если оба отрицательные
            if ( (val1 < 0) && (val2 < 0) ) {
                val2 -= diff;
                if ( val1 < -diff ) { val1 += diff }
                else { val2 -= diff + val1; val1 = 0; }
            }
        }
    }

    return [val1, val2];
}




// Дискретное преобразование для элементов 1 блока
function dct_direct (u, v, array) {

    var prod = dct_sigma(u) * dct_sigma(v) / 4,
        summ = 0;

    for (var m = 0; m < 8; m++) {
      for (var l = 0; l < 8; l++) {

        summ += 1
          * array[ m * 8 + l ][2]
          * Math.cos( (Math.PI * u * (2*m + 1)) / 16 )
          * Math.cos( (Math.PI * v * (2*l + 1)) / 16 )
      }
    }

    return prod * summ;
}

// Дискретное преобразование для элементов 1 блока
function dct_reverse(u, v, dct_array) {

    var prod = 1 / 4,
        summ = 0;

    for (var m = 0; m < 8; m++) {
      for (var l = 0; l < 8; l++) {

        summ += 1
          * dct_sigma(m) * dct_sigma(l)
          * dct_array[ m * 8 + l ]
          * Math.cos( (Math.PI * m * (2*u + 1)) / 16 )
          * Math.cos( (Math.PI * l * (2*v + 1)) / 16 )
      }
    }

    var res = prod * summ;

    if (res > 255) { res = 255 };
    if (res < 0)   { res = 0 };

    return Math.round(res);
}


function dct_direct_for_block(array) {

  ddd = [];

  // По 64 пикселям
  for (var m = 0; m < 8; m++) {
    for (var l = 0; l < 8; l++) {
        var ooo = dct_direct(m, l, array);
        ddd.push(ooo);
    }
  }

  return ddd;
}


function dct_reverse_for_block(array) {

  ccc = [];

  // По 64 пикселям
  for (var m = 0; m < 8; m++) {
    for (var l = 0; l < 8; l++) {
        var aaa = dct_reverse(m, l, array)
        ccc.push(aaa);
    }
  }

  return ccc;
}


// Функция создания глобального массива ДКТ
function dct_create_function (image) {

    // Количество блоков 8х8 в картинке
    image_bloks_number = src_img_height * src_img_width / 64 ;
    row_bloks_number = src_img_width/8;
    col_bloks_number = src_img_height/8;

    // Создаем матрицу исходных цветов
    var tmp_appay = []
    for ( var i = 0; i < src_img_height ; i++ ) {
        var tmp_appay2 = []
        // Двойной цикл по пикселям блока 8х8
        for ( var u = 0 ; u < src_img_width ; u++ ) {
          tmp_appay2.push(image.src_colors[i*src_img_width + u])
        }
        tmp_appay.push(tmp_appay2);
    }

    // Создаём матрицу массивов 8х8
    for ( var y = 0; y < col_bloks_number ; y++ ) {
        for ( var x = 0; x < row_bloks_number ; x++ ) {

          array = [];

          // Двойной цикл по пикселям блока 8х8
          for ( var u = 0 ; u < 8 ; u++ ) {
              for ( var v = 0 ; v < 8 ; v++ ) {

                // Запоминаем значения текущего пикселя
                var pixelData = tmp_appay[y*8+u][x*8+v];

                // Записываем эти значения в массив в десятичном виде
                array.push([ pixelData[0], pixelData[1],  pixelData[2] ]);

              }
          }

          image.sub_arrays.push(array);

        }
    }

    // Создаем массив коэффициентов
    for (var i = 0; i < image_bloks_number ; i++) {
      var tmp = dct_direct_for_block( image.sub_arrays[i] )
      image.dct.push(tmp);
    }
}


// Функция внедрения сообщения в коэффициенты
function dct_modify_array(image, string) {

    for (var i = 0; i < string.length ; i++) {

      var result =
      dct_encript_bit( string[i], image.dct[i][image.coof_num[0]], image.dct[i][image.coof_num[1]] )

      image.dct[i][image.coof_num[0]] = result[0];
      image.dct[i][image.coof_num[1]] = result[1];
    }
}




// Функция генерации цветов из коэффициентов
function dct_colors_from_coofs (image) {


  var result = result_linear = [];

  // Проходим по блокам коэффициентов и получаем блоки цветов
  for (var i = 0; i < image_bloks_number ; i++) {
    var tmp = dct_reverse_for_block( image.dct[i] );
    result.push(tmp);
  }

  var c = 0;

  // Леагизируем массив цветов
  for (var k = 0; k < col_bloks_number ; k++) {
    for (var j = 0; j < 8 ; j++) {
      for (var i = 0; i < row_bloks_number ; i++) {
        for (var h = 0; h < 8 ; h++) {
          image.mod_colors.push([
            image.src_colors[c][0],
            image.src_colors[c][1],
            result[ k * row_bloks_number + i ][ j * 8 + h ]
          ])
          c++;
        }
      }
    }
  }

}


// Расшифровка сообщения по коэффициентам
function dct_decript(image) {

    var result = [], output_text = $("#output-text");

    // Проходим по всем блокам 8х8
    for (var i = 0; i < image_bloks_number ; i++) {

      // Находим разницу между коэффициентами
      var diff = Math.abs(image.dct[i][image.coof_num[0]]) - Math.abs(image.dct[i][image.coof_num[1]]);

      if ( diff >=  0 ) { result.push('0') } else
      if ( diff <= 0  ) { result.push('1') }
    }


    for ( var i = 0; i < result.length - 8 ; i = i + 8) {

        var string = '';

        // Внутренний цикл по битам
        for ( var j = i; j - 8 < i; j++ ) {
            string += result[j];
        }

        var output = ABC.toAscii(string);

        // Выводим букву
        $(output_text).append( output );
    }

}







/*  Описание работы приложения
=============================== */


$(document).ready(function($) {

    // Создаём глобальный обьект = исходная картинка
    image = {
        type           : "image/png",
        name           : "example",
        extension      : "png",
        src_colors     : [],
        mod_colors     : [],
        stego_key      : [],
        lsb            : [],
        lsb_step       : 5,
        image_diff     : [],
        sub_arrays     : [],
        dct            : [],
        coof_num       : [14, 29],
        dct_P          : 25,

        stats          : {
            largest_diff          :  0,
            smallest_diff         :  255,
            average_diff          :  0,
            average_error         :  0,
            signal_to_noise       :  0,
            image_fidelity        :  0,
            correlation_quality   :  0,
            structural_content    :  0,
        }
    };


    // При нажатии "закодировать"
    $('#encript').click(function(event) {

        // Читаем изображение и кладём цвета в массив
        canvas_read_image(image);

        // Скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-msg-input'));
    });


    // При нажатии "раскодировать"
    $('#decript').click(function(event) {

        // Читаем изображение и кладём цвета в массив
        canvas_read_image(image);

        // Скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-decript-methods'));
    });


    // При клике на кропке "Метод QUANT"
    $('#quant-encript').click(function(event) {

        $('.spinner').fadeIn();

        setTimeout(function(){

            // Задаём имя  выходного изображения
            image.name = 'quant-encripted';

            // Находим разницы цветов
            quant_color_diffs(image);

            // Находим массив Тетта функций
            quant_tetta_function(image);

            // Генерируем шкалу от -255 до 255
            quant_generate_scale(image);

            // Модифицируем массив разниц
            quant_modify_diffs(image, get_msg_from_field());

            // Рисуем канвас видоизменённых пикслелей
            canvas_draw_image(image.mod_colors);

            // Показываем блоки
            show_blocks( $('.block-mod-key'));

            // Выврлим статистику в консоль
            get_image_stats(image);

            $('.spinner').fadeOut(300, function(){
                setTimeout(function(){
                    $('.img-mod-cont').fadeIn();
                }, 300)
            });

        }, 500)

    });


    /// При клике на кропке "Метод LSB"
    $('#lsb-encript').click(function(event) {

        // Задаём имя  выходного изображения
        image.name = 'lsb-encripted';

        // Показываем блок для выбора шага
        $('#lsb-encript-start').show();
        $('.block-step-field').removeClass('ui-hidden');
    });


    /// При клике на кропке "Метод LSB"
    $('#lsb-encript-start').click(function(event) {

        // Показываем блоки пикселей и готовую картинку
        $('.spinner').fadeIn();

        setTimeout(function(){

            // Изменяем значения в массиве цветов
            lsb_modify_array(image, get_msg_from_field());

            // Рисуем канвас видоизменённых пикслелей
            canvas_draw_image(image.mod_colors);

            // Выврлим статистику в консоль
            get_image_stats(image);

            $('.spinner').fadeOut(300, function(){
                setTimeout(function(){
                    $('.img-mod-cont').fadeIn();
                }, 300)
            });

        }, 500)

    });


    /// При клике на кропке "Метод DCT"
    $('#dct-encript').click(function(event) {

        // Задаём имя  выходного изображения
        image.name = 'dct-encripted';

        // Генерируем координаты
        cord_gen($('#x_y_cord_enc'));

        // Показываем блоки пикселей и готовую картинку
        $('.block-porog-field').removeClass('ui-hidden');
    });


    /// При клике на кропке "Закодировать DCT"
    $('#dct-encript-start').click(function(event) {

        // Показываем блоки пикселей и готовую картинку
        $('.spinner').fadeIn();

        setTimeout(function(){
            // Считаем ДКТ коэффициенты
            dct_create_function(image);

            // Внедряем сообщение в коэффциценты
            dct_modify_array(image, get_msg_from_field());

            // Считаем цвета из коэффицентов
            dct_colors_from_coofs(image);

            // Рисуем канвас видоизменённых пикслелей
            canvas_draw_image(image.mod_colors);

            // Выврлим статистику в консоль
            get_image_stats(image);

            // Показываем
            $('.spinner').fadeOut(300, function(){
                setTimeout(function(){
                    $('.img-mod-cont').fadeIn();
                }, 300)
            });

        }, 500)

    });


    // При нажатии "раскодировать"
    $('#decript').click(function(event) {
        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-decript-methods'));
    });


    // При нажатии "lsb раскодировать"
    $('#lsb-decript').click(function(event) {

        // Показываем блок для выбора шага
        $('#lsb-decript-start').show();
        $('.block-step-field').removeClass('ui-hidden');
    });


    $('#lsb-decript-start').click(function(event) {

        // Читаем массив цветов и создаём lsb массив
        lsb_create_array(image);

        // Выводим текст закодированного сообщения
        lsb_2_ascii(image);

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-decript-methods'));
        show_blocks($('.block-code'));
    });


    // При нажатии "quant раскодировать"
    $('#quant-decript').click(function(event) {

        // Находим разницы цветов
        quant_color_diffs(image);

        // Генерируем шкалу от -255 до 255
        quant_generate_scale(image);

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-decript-methods'));
        show_blocks($('.block-key-field'));
    });


    // При нажатии "quant раскодировать"
    $('#dct-decript').click(function(event) {

        // Генерируем координаты
        cord_gen($('#x_y_cord_dec'));

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-decript-methods'));
        show_blocks($('.block-select-coords'));
    });


    // При нажатии "quant раскодировать"
    $('#dct-decript-start').click(function(event) {

        // Считаем ДКТ коэффициенты
        dct_create_function(image);

        // Находим зашифрованный текст
        dct_decript(image);

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-select-coords'), $('.block-porog-field'));
        show_blocks($('.block-code'));

    });


    // При нажатии "quant раскодировать"
    $('#quant-decript-start').click(function(event) {

        // Расишфровываем сообщение
        quant_read_message(image);

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-key-field'));
        show_blocks($('.block-code'));
    });


    // Скрываем поле вводы при выборе закодирования
    $('#dct-encript, #quant-encript, #lsb-encript').click(function(event) {

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-msg-input'));
    });

    // Скрываем поле вводы при начале закодирования
    $('#dct-encript-start, #lsb-encript-start').click(function(event) {

        // Показываем скрываем кнопки и показываем форму
        $('.block-step-field, .block-porog-field').addClass('ui-hidden');
    });

    // Перезагрузка страницы
    $('#refresh').click(function(event) {
        location.reload();
    });

});
// Функции для просчета количественных характеристик алгоритма

function get_image_stats (image) {

  // Обнуляем суммы
  var diff_summ                = 0;
  var diff_summ_sq             = 0;

  var C_summ = S_summ          = 0;
  var C_summ_sq = S_summ_sq    = 0;
  var C_S_summ                 = 0;
  var Lapl_C_summ              = 0;
  var Lapl_diff_summ           = 0;
  var C_max                    = 0;
  var CS_summ                  = 0;

  function check_if_exist (index, array) {
    if ( (index < image.size) && (index > 0) ) {
      return array[index][2];
    } else {
      return 0;
    }
  }

  for (var i = 0; i < image.size; i++) {

    var S_x_y = image.src_colors[i][2];
    var C_x_y = image.mod_colors[i][2];

    var C_x_plus_1   =  check_if_exist(i + 1, image.mod_colors);
    var C_x_minus_1  =  check_if_exist(i - 1, image.mod_colors);
    var C_y_plus_1   =  check_if_exist(i + src_img_width, image.mod_colors);
    var C_y_minus_1  =  check_if_exist(i - src_img_width, image.mod_colors);

    var S_x_plus_1   =  check_if_exist(i + 1, image.src_colors);
    var S_x_minus_1  =  check_if_exist(i - 1, image.src_colors);
    var S_y_plus_1   =  check_if_exist(i + src_img_width, image.src_colors);
    var S_y_minus_1  =  check_if_exist(i - src_img_width, image.src_colors);

    var C_lapl = C_x_plus_1 + C_x_minus_1 + C_y_plus_1 + C_y_minus_1 - 4 * C_x_y;
    var S_lapl = S_x_plus_1 + S_x_minus_1 + S_y_plus_1 + S_y_minus_1 - 4 * S_x_y;

    var lapl_diff = C_lapl - S_lapl;

    C_max = ( C_x_y > C_max ) ? C_x_y : C_max;


    // разницa
    var diff =  Math.abs(C_x_y - S_x_y);

    // Запоминаем наибольшую
    image.stats.largest_diff = (image.stats.largest_diff < diff) ? diff : image.stats.largest_diff;
    image.stats.smallest_diff = (image.stats.largest_diff > diff) ? diff : image.stats.largest_diff;

    // Наращиваем суммы
    diff_summ          +=   diff;
    Lapl_diff_summ     +=   Math.pow( lapl_diff, 2 );
    Lapl_C_summ        +=   Math.pow( C_lapl, 2 );
    diff_summ_sq       +=   Math.pow( diff, 2 );
    C_summ             +=   C_x_y;
    S_summ_sq          +=   Math.pow( C_x_y, 2 );
    C_summ_sq          +=   Math.pow( S_x_y, 2 );
    CS_summ            +=   S_x_y * C_x_y;
  }


  image.stats.average_diff           =   diff_summ / image.size;
  image.stats.norm_average_diff      =   (diff_summ / C_summ).toFixed(20);
  image.stats.average_error          =   diff_summ_sq / image.size;
  image.stats.norm_average_error     =   (diff_summ_sq / C_summ_sq).toFixed(20);
  image.stats.lapl_average_error     =   Lapl_diff_summ / Lapl_C_summ;
  image.stats.max_signal_2_noise     =   image.size * Math.pow( C_max, 2 ) / C_summ_sq ;
  image.stats.norm_vzaim_correl      =   CS_summ / C_summ_sq ;
  image.stats.correl_quality         =   CS_summ / C_summ ;
  image.stats.structur_quality       =   (C_summ_sq / S_summ_sq).toFixed(20) ;

  // Вывод в консоль
  console.log(" *** Разностные показатели искажения *** ");
  console.log("Максимальна разность цветов (MXD): ",    image.stats.largest_diff);
  console.log("Минимальная разность цветов (MND): ",    image.stats.smallest_diff);
  console.log("Средняя абсолютная разность (AAD): ",    image.stats.average_diff);
  console.log("Норм. ср. абсолют. разность (NAD): ",    image.stats.norm_average_diff);
  console.log("Среднеквадратическая ошибка (MSE): ",    image.stats.average_error);
  console.log("Норм. среднеквадр.  ошибка (NMSE): ",    image.stats.norm_average_error);
  console.log("Лапласова среднекв. ошибка (LSME): ",    image.stats.lapl_average_error);
  console.log("     Отношение «сигнал/шум» (SNR): ",    Math.pow( image.stats.norm_average_error, -1 ));
  console.log("Макс отношение «сигнал/шум» (PSR): ",    image.stats.max_signal_2_noise);
  console.log("        Качество изображения (IF): ",    1 - image.stats.norm_average_error);

  console.log(" ");
  console.log(" *** Корреляционные показатели *** ");
  console.log(" Нормированная взаимная корреляция (NC)", image.stats.norm_vzaim_correl);
  console.log(" Качесво корреляции (CQ)",                image.stats.correl_quality);
  console.log(" ");

  console.log(" *** Другие показатели *** ");
  console.log(" Структурное содержание (SC)",            image.stats.structur_quality);

}