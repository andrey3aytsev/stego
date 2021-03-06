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

        var d = new Date();
        var start = d.getTime();

        // Читаем изображение и кладём цвета в массив
        canvas_read_image(image);

        var f = new Date();
        var end = f.getTime();

        timetook = ( end - start ) / 1000;
        if (timetook < 0.25) { timetook = 0.25 };

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

        $('.progress .rotator').css('animation-duration', timetook * 3 + 's');

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

            $('.spinner, .progress').fadeOut(300, function(){
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

        $('.progress .rotator').css('animation-duration', timetook * 5 + 's');

        setTimeout(function(){

            // Изменяем значения в массиве цветов
            lsb_modify_array(image, get_msg_from_field());

            // Рисуем канвас видоизменённых пикслелей
            canvas_draw_image(image.mod_colors);

            // Выврлим статистику в консоль
            get_image_stats(image);

            $('.spinner, .progress').fadeOut(300, function(){
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

        $('.progress .rotator').css('animation-duration', timetook * 15 + 's');

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
            $('.spinner, .progress').fadeOut(300, function(){
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
    $('#dct-encript-start, #quant-encript, #lsb-encript-start').click(function(event) {

        // Показываем скрываем кнопки и показываем форму
        $('.block-step-field, .block-porog-field').addClass('ui-hidden');
        $('.spinner, .progress').fadeIn();
    });

    // Перезагрузка страницы
    $('#refresh').click(function(event) {
        location.reload();
    });

});