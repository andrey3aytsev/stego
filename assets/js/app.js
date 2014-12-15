/*  Описание работы приложения
=============================== */


$(document).ready(function($) {

    // Создаём глобальный обьект = исходная картинка
    image = {
        src_colors: [],
        mod_colors: [],
        lsb       : []
    };


    // При полной загрузке окна
    $(window).on('load', function(event) {

        // Читаем изображение и кладём цвета в массив
        canvas_read_image(image);
    });


    // При нажатии "закодировать"
    $('#lets-encript').click(function(event) {

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.init-buttons'), $('.block-init-buttons'));
        show_blocks($('.block-msg-input'));
    });


    // При нажатии "раскодировать"
    $('#lets-decript').click(function(event) {

        // Читаем массив цветов и создаём lsb массив
        lsb_create_array(image);

        // Выводим текст закодированного сообщения
        lsb_2_ascii(image);

        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.init-buttons'), $('.block-init-buttons'));
        show_blocks($('.block-code'));
    });


    // При клике на кропке "внедрить"
    $('#lsb-encript').click(function(event) {

        // Изменяем значения в массиве цветов
        lsb_modify_array(image, get_msg_from_field());

        // Рисуем канвас видоизменённых пикслелей
        canvas_draw_image(image.mod_colors);


        // Рисуем изображение пикселями
        pixel_draw_image(image.mod_colors);

        // Показываем блоки пикселей и готовую картинку
        show_blocks($('.block-pixels'), $('.block-mod-img'));
    });


});