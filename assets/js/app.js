/*  Описание работы приложения
=============================== */


$(document).ready(function($) {

    // Создаём глобальный обьект = исходная картинка
    image = {
        src_colors     : [],
        mod_colors     : [],
        stego_key      : [],
        lsb            : [],
        image_diff     : [],
        sub_arrays     : [],
        dct    : [],

        stats          : {
            largest_diff          :  0,
            average_diff          :  0,
            average_error         :  0,
            signal_to_noise       :  0,
            image_fidelity        :  0,
            correlation_quality   :  0,
            structural_content    :  0,
        }
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

        // Рисуем канвас видоизменённых пикслелей
        canvas_draw_image(image.mod_colors);

        // Рисуем изображение пикселями
        // pixel_draw_image(image.mod_colors);

        // Выврлим статистику в консоль
        get_image_stats(image);

        // Показываем блоки
        show_blocks($('.block-mod-img'), $('.block-mod-key'));
    });


    /// При клике на кропке "Метод LSB"
    $('#lsb-encript').click(function(event) {


        // Изменяем значения в массиве цветов
        lsb_modify_array(image, get_msg_from_field());


        // Рисуем канвас видоизменённых пикслелей
        canvas_draw_image(image.mod_colors);


        // Выврлим статистику в консоль
        get_image_stats(image);

        // Показываем блоки пикселей и готовую картинку
        show_blocks($('.block-mod-img'));

    });


    /// При клике на кропке "Метод LSB"
    $('#dct-encript').click(function(event) {


        dct_function(image);

        // Показываем блоки пикселей и готовую картинку
        show_blocks($('.block-mod-img'));

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