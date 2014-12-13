// Определяем канвас
var canvas = document.getElementById('canvas-pixels'),
       ctx = canvas.getContext('2d');


document.getElementById('btn-download').addEventListener('click', download_canvas, false);

// Текст аски
var text_bin = "101010100101010101010101010010101010101";
var text_index = 0;

// Определяем картинку
var source_img = document.getElementById('mona');

// Получения габаритов изображения
var source_img_width  = source_img.clientWidth;
var source_img_height = source_img.clientHeight;

// Расчет ширины 'пикселя'
var pix_wid = ( 1 / source_img_width ) * 100;


// Иничиализация обьекта растер
var raster = new Raster('mona');

// Контейнеры
var colors_cont = $('#bin');
var pix_block = $('#pix_block');

// Массив цветов
var pixels_colors = [];


// Функция растер при окночании загрузки
raster.on('load', function() {

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

            var red_bin_modified    = red_bin;
            var green_bin_modified  = green_bin;
            var blue_bin_modified   = blue_bin;

            // Записываем значения его каналов в общий массив
            pixels_colors.push( [ red_bin, green_bin, blue_bin ] );

            if ( text_index <= text_bin.length ) {
                red_bin_modified   = red_bin.substring( 0, red_bin.length - 1) + text_bin[ text_index ];
                color.red   = red_bin_modified;
            }

            if ( text_index + 1 <= text_bin.length ) {
                green_bin_modified = green_bin.substring(0, green_bin.length - 1) + text_bin[ text_index + 1 ];
                color.green = green_bin_modified;
            }

            if ( text_index + 2 <= text_bin.length ) {
                blue_bin_modified = blue_bin.substring(0, blue_bin.length - 1) + text_bin[ text_index + 2 ];
                color.blue = blue_bin_modified;
            }

            // Наращиваем индекс
            text_index += 3;


            /* Код отрисовки картинок
            ============================ */

            // Рисуем этот пиксель на экране
            pix_block.append
                (
                    '<span style="'

                        + 'width: ' + pix_wid + '%; '
                        + 'padding-bottom: ' + pix_wid + '%; '

                        + 'background: rgb('
                        + parseInt( red_bin_modified, 2 ) + ','
                        + parseInt( green_bin_modified, 2 ) + ','
                        + parseInt( blue_bin_modified, 2 )  +

                    ')"></span>'
                )

            // Создаем 1 пиксель в канвасе
            var rectangle = new Rectangle({
                center: new Point(x, y),
                radius: [1, 1]
            });

            // Задаём цвет этому пикселю
            rectangle.fillColor = color;

        }    // Конец внутреннего цикла
    }    // Конец внешнего цикла


    // the created paths in it appear centered.
    project.activeLayer.position = view.center;

}); // Конец функции растер

// Move the active layer to the center of the view:
project.activeLayer.position = view.center;


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