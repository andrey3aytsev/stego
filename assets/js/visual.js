// Функции для просчета количественных характеристик алгоритма

function get_image_stats (image) {

  // Обнуляем суммы
  var diff_summ                = 0;
  var error_summ               = 0;

  var C_summ = S_summ          = 0;
  var C_summ_sq = S_summ_sq    = 0;
  var C_S_summ                 = 0;


  for (var i = 0; i < image.size; i++) {

    // разницa
    var diff =   Math.abs(image.mod_colors[i][0] - image.src_colors[i][0])
               + Math.abs(image.mod_colors[i][1] - image.src_colors[i][1])
               + Math.abs(image.mod_colors[i][2] - image.src_colors[i][2]);

    // Запоминаем наибольшую
    image.stats.largest_diff = (image.stats.largest_diff < diff) ? diff : image.stats.largest_diff;

    // Наращиваем суммы
    C_summ        +=   image.src_colors[i][0] + image.src_colors[i][1] + image.src_colors[i][2];
    C_summ_sq     +=   Math.pow( C_summ, 2 );
    S_summ        +=   image.mod_colors[i][0] + image.mod_colors[i][1] + image.mod_colors[i][2];
    S_summ_sq     +=   Math.pow( S_summ, 2 );
    C_S_summ      +=   C_summ * S_summ;
    diff_summ     +=   diff;
    error_summ    +=   Math.pow( diff, 2 );
  }


  image.stats.average_diff           = diff_summ / image.size;
  image.stats.average_error          = error_summ / image.size;
  image.stats.signal_to_noise        = C_summ_sq / error_summ;
  image.stats.image_fidelity         = 1 - ( error_summ / C_summ_sq );
  image.stats.correlation_quality    = C_S_summ / C_summ;
  image.stats.structural_content     = C_summ_sq / S_summ_sq;

  // Вывод в консоль
  console.log("Максимальная разность: ",           image.stats.largest_diff);
  console.log("Средняя абсолютная разность : ",    image.stats.average_diff);
  console.log("Среднеквадратическая ошибка: ",     image.stats.average_error);
  console.log("Отношение «сигнал/шум»: ",          image.stats.signal_to_noise);
  console.log("Качество изображение: ",            image.stats.image_fidelity);
  console.log("Качество корреляции: ",             image.stats.correlation_quality);
  console.log("Структурное содержание: ",          image.stats.structural_content);

}