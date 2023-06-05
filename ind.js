for (let i = 0; i < 5; i++) {
    let data3pm = weatherdata.list[1+(i*8)];
    let data9am = (i*8)-3>0?weatherdata.list[(i*8)-3]:weatherdata.list[0];
    let variable=10
    let independent = {
      location: weatherdata.city.name,
      mintemp: Math.min(data3pm.main.temp_min,data9am.main.temp_min),
      maxtemp:  Math.min(data3pm.main.temp_max,data9am.main.temp_max),
      rainfall: variable,
      evaporation: variable,
      sunshine: variable,
      windgustdir: variable,
      windgustspeed: variable,
      winddir9am: variable,
      winddir3pm: variable,
      windspeed9am: data9am.wind.speed,
      windspeed3pm: data3pm.wind.speed,
      humidity9am: data9am.main.himidity,
      humidity3pm: data3pm.main.himidity,
      pressure9am: data9am.main.pressure,
      pressure3pm: data3pm.main.pressure,
      cloud9am: data9am.clouds.all,
      cloud3pm: data3pm.clouds.all,
      temp9am: data9am.main.temp,
      temp3pm: data9am.main.temp,
      raintoday: data3pm.weather[0].main=='rainy',
      day: data3pm.dt_txt.split(" ")[0].split("-")[2],
      month: data3pm.dt_txt.split(" ")[0].split("-")[1],
    };
}