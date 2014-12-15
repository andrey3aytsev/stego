/*  Инициализация канваса и параметров
======================================= */

$(document).ready(function($) {

    // При загрузке изображения
    $(window).on('load', function(event) {

        // Исходное изображение
        src_img        = $('#src-img')[0];

        // Запоминаем его габариты
        src_img_width  =  $('#src-img').width();
        src_img_height =  $('#src-img').height();

        // Канвас для чтения изображения
        canvas_src = $('#canvas-src-image')[0];
        cxt_src    = canvas_src.getContext('2d');

        // Канвас для записи модифицированного изображения
        canvas_mod = $('#canvas-mod-image')[0];
        cxt_mod    = canvas_mod.getContext('2d');

        // Присваиваем канвасам габариты исходной картинк
        canvas_src.width  = canvas_mod.width  = src_img_width;
        canvas_src.height  = canvas_mod.height = src_img_height;

    });




});
