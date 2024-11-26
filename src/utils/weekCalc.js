const getWeekNum = date => {
  const currentDate = date ? new Date(date) : new Date();
  // obtengo la fecha para el 1/1 del año en curso
  const jan1st = new Date(currentDate.getFullYear(), 0, 1);
  // Asumiendo que la semana empieza el lunes, necesito saber qué tan lejos del primer lunes estuvo el 1 de enero (ya que la primera semana del año comenzaría en realidad el primer lunes y no el primer día)
  const daysToFirstMonday =
    jan1st.getDay() === 1 ? 0 : (7 - jan1st.getDay()) % 7;
  const firstMonday = new Date(
    currentDate.getFullYear(),
    0,
    jan1st.getDate() + daysToFirstMonday
  );

  return currentDate < firstMonday
    ? 52
    : Math.floor((currentDate - firstMonday) / (24 * 3600 * 1000) / 7) + 1;
  // el numerador da el tiempo en ms entre la fecha ingresada y el primer lunes del año
  // el denominador lo convierte a días
  // se divide por 7 para obtener la cantidad de semanas
  // se redondea para abajo y se suma 1 para que la semana 1 incluya al primer lunes del año
  // los días anteriores al primer lunes del año son considerados parte de la semana 52 del anterior
};

// Sin argumentos, la función hace el cálculo para el día de la fecha. De lo contrario, acepta la fecha como string en formato ISO 8601 (YYYY-MM-DD), y en formato americano separado por guiones o barras (MM-DD-YYYY o MM/DD/YYYY)
// console.log(getWeekNum());
// console.log(getWeekNum('02/01/2024'));
// console.log(getWeekNum(new Date(2024, 0, 2)));
// console.log(getWeekNum(new Date(2025, 0, 1)));
