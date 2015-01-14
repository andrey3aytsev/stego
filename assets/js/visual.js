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