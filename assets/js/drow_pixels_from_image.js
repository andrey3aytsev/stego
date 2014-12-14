// ABC - a generic, native JS (A)scii(B)inary(C)onverter.
var ABC = {
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      return String.fromCharCode(parseInt(bin, 2))
    })
  },
  toBinary: function(str, spaceSeparatedOctets) {
    return str.replace(/[\s\S]/g, function(str) {
      str = ABC.zeroPad(str.charCodeAt().toString(2));
      return !1 == spaceSeparatedOctets ? str : str
    })
  },
  zeroPad: function(num) {
    return "00000000".slice(String(num).length) + num
  }
};

// Определяем канвас
var canvas = document.getElementById('canvas-pixels'),
       ctx = canvas.getContext('2d');


document.getElementById('btn-download').addEventListener('click', download_canvas, false);


var pixel_shift = 500;

// Определяем картинку
var source_img = document.getElementById('mona');

// Получения габаритов изображения
var source_img_width  = source_img.clientWidth;
var source_img_height = source_img.clientHeight;

// Размер канваса
ctx.canvas.width  = source_img_width;
ctx.canvas.height = source_img_height;



// Расчет ширины 'пикселя'
var pix_wid = ( 1 / source_img_width ) * 100;


// Иничиализация обьекта растер
var raster = new Raster('mona');

// Контейнеры
var colors_cont = $('#bin');
var pix_block = $('#pix_block');

// Массив цветов
var pixels_colors = [];

// Массив последних битов
var lsb = [];

// Функция растер при окночании загрузки
$('#begin').click(function(event) {

    // Сохраняем текст из поля
    var text = $('#input').val();

    // Текст аски
    var text_bin = ABC.toBinary(text);
    var text_index = 0;


    raster.size = new Size(source_img_width, source_img_height);

    // Двойной цикл проходящий по пикселям
    for (var y = 0; y < raster.height; y++) {
        for(var x = 0; x < raster.width; x++) {

            // Узнаём цвет текущего пикселя
            var color = raster.getPixel(x, y);

            // Вычисление бинарных значений цвета
            var red_bin   = fraction_2_bin(color.red);
            var green_bin = fraction_2_bin(color.green);
            var blue_bin  = fraction_2_bin(color.blue);

            // Запись последних битов
            lsb.push( red_bin.slice(-1) );
            lsb.push( green_bin.slice(-1) );
            lsb.push( blue_bin.slice(-1) );


            var red_bin_modified    = red_bin;
            var green_bin_modified  = green_bin;
            var blue_bin_modified   = blue_bin;

            // // Записываем значения его каналов в общий массив
            // pixels_colors.push( [ red_bin, green_bin, blue_bin ] );

            // if ( text_index <= text_bin.length ) {
            //     red_bin_modified = red_bin.substring( 0, red_bin.length - 1) + text_bin[ text_index ];
            // }

            // if ( text_index + 1 <= text_bin.length ) {
            //     green_bin_modified = green_bin.substring(0, green_bin.length - 1) + text_bin[ text_index + 1 ];
            // }

            // if ( text_index + 2 <= text_bin.length ) {
            //     blue_bin_modified = blue_bin.substring(0, blue_bin.length - 1) + text_bin[ text_index + 2 ];
            // }

            // // Наращиваем индекс
            // text_index += 3;


            /* Код отрисовки картинок
            ============================ */


            // ctx.fillStyle = "rgb(" +
            //     + parseInt( red_bin_modified, 2 ) + ','
            //     + parseInt( green_bin_modified, 2 ) + ','
            //     + parseInt( blue_bin_modified, 2 )  + ');';

            // ctx.fillRect(x, y, 1, 1);


            // Рисуем этот пиксель на экране
            // pix_block.append
            //     (
            //         '<span style="'

            //             + 'width: ' + pix_wid + '%; '
            //             + 'padding-bottom: ' + pix_wid + '%; '

            //             + 'background: rgb('
            //             + parseInt( red_bin_modified, 2 ) + ','
            //             + parseInt( green_bin_modified, 2 ) + ','
            //             + parseInt( blue_bin_modified, 2 )  +

            //         ')"></span>'
            //     )

        }    // Конец внутреннего цикла
    }    // Конец внешнего цикла


    // Функция вывода лсб
    setTimeout(function () {

        var output_text = $("#output-text");

        // Вывод LSB
        for ( var i = 0; i < lsb.length - 8 ; i = i + 8) {

            var string = '';


            for ( var j = i; j - 8 < i; j++ ) {
                string += lsb[j];
            }

            $(output_text).append(ABC.toAscii(string));
        }

    }, 1000);




}); // Конец функции растер






/*  Вспомогательные функции
============================ */

// Перевод дроби в бинарный вид
function fraction_2_bin (fraction) {
    var result = Math.round(fraction * 255);
    result = add_zeros(result.toString(2), 8);
    return result;
}

// Приведение к 8-ми значному формату
function add_zeros (str, max) {
    str = str.toString();
    return str.length < max ? add_zeros("0" + str, max) : str;
}

// Функция сохранения канвас как картинку
function download_canvas() {
    var dt = canvas.toDataURL();
    this.href = dt; //this may not work in the future..
}
