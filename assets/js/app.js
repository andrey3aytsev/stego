/*  Описание работы приложения
=============================== */


$(document).ready(function($) {

    // Создаём глобальный обьект = исходная картинка
    image = {
        src_colors: [],
        mod_colors: [],
        stego_key : [],
        lsb       : []
    };


    // При полной загрузке окна
    $(window).on('load', function(event) {

        // Читаем изображение и кладём цвета в массив
        canvas_read_image(image);

    });


    // При нажатии "закодировать"
    $('#encript').click(function(event) {

        // Скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-msg-input'));
    });


    // При нажатии "раскодировать"
    $('#decript').click(function(event) {

        // Скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-decript-methods'));
    });


    // При клике на кропке "Метод QUANT"
    $('#quant-encript').click(function(event) {

        // Находим разницы цветов
        quant_color_diffs(image);

        // Находим массив Тетта функций
        quant_tetta_function(image);

        // Генерируем шкалу от -255 до 255
        quant_generate_scale(image);

        // Модифицируем массив разниц
        quant_modify_diffs(image, get_msg_from_field());


        // Находим новые цвета для отрисовки
        quant_modify_collors(image);

        // Рисуем канвас видоизменённых пикслелей
        canvas_draw_image(image.mod_colors);

        // Рисуем изображение пикселями
        pixel_draw_image(image.mod_colors);

        // Показываем блоки
        show_blocks($('.block-pixels'), $('.block-mod-img'), $('.block-key'));
    });


    /// При клике на кропке "Метод LSB"
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


    // При нажатии "раскодировать"
    $('#decript').click(function(event) {
        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-init-buttons'));
        show_blocks($('.block-decript-methods'));
    });


    // При нажатии "lsb раскодировать"
    $('#lsb-decript').click(function(event) {

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
    $('#quant-decript-start').click(function(event) {

        // Получаем ключ из поля
        get_stego_key();

        // Расишфровываем сообщение
        quant_read_message(image);


        // Показываем скрываем кнопки и показываем форму
        hide_blocks($('.block-key-field'));
        show_blocks($('.block-code'));
    });



});