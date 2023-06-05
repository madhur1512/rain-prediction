const cities = {
  24: "Adelaide",
  7: "Albany",
  30: "Albury",
  46: "Alice Springs",
  33: "Badgerys Creek",
  14: "Ballarat",
  36: "Bendigo",
  21: "Brisbane",
  2: "Cairns",
  43: "Cobar",
  9: "Coffs Harbour",
  4: "Dartmoor",
  11: "Darwin",
  15: "Gold Coast",
  17: "Hobart",
  45: "Katherine",
  23: "Launceston",
  28: "Melbourne",
  25: "Melbourne",
  44: "Mildura",
  42: "Moree",
  5: "Mount Gambier",
  12: "Mount Ginini",
  19: "Newcastle",
  47: "Nhil",
  13: "Norah Head",
  6: "Norfolk Island",
  32: "Nuriootpa",
  40: "Pearce RAAF",
  31: "Penrith",
  26: "Perth",
  35: "Perth",
  1: "Portland",
  37: "Richmond",
  27: "Sale",
  41: "Salmon",
  10: "Sydney",
  16: "Sydney",
  39: "Townsville",
  34: "Tuggeranong",
  49: "Uluru",
  38: "Wagga Wagga",
  3: "Walpole",
  18: "Watsonia",
  22: "William",
  8: "Witchcliffe",
  20: "Wollongong",
  48: "Woomera",
};

const windDirection={
"1" :[325, 345],
"0" :[305, 325],
"3" :[285, 305],
"4"  :[245, 285],
"6" :[225, 245],
"9" :[215, 225],
"7" :[195, 215],
"8" :[165, 195],
"12" :[145, 165],
"10" :[115, 145],
"15" :[105, 115],
"14" :[75, 105],
"13" :[55, 75],
"11" :[35, 55],
"5" :[15, 35],
"2" :[345, 15]
}
function getDirection(dir){
    for(const [k,i] of Object.entries(windDirection)){
        if(dir<=i[1]&&dir>i[0])
        return k;
    }
    return null;
}

async function GetInfo() {
  var newName = document.getElementById("location");
    if(newName.value=="Select Location")
    {
        alert("Select a city please")
        return
    }
  let weatherprom = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cities[newName.value]}&appid=32ba0bfed592484379e51106cef3f204`
  );
  document.querySelector(".predictions").style.display='flex'
  let weatherdata = await weatherprom.json();
  console.log(weatherdata, "Here");

  const cards=document.querySelectorAll(".card")
  for (let i = 0; i < 5; i++) {
      let data3pm = weatherdata.list[1 + i * 8];
      console.log(data3pm.rain);
    let data9am =
      i * 8 - 3 > 0 ? weatherdata.list[i * 8 - 3] : weatherdata.list[0];
    let independent = {
      'location':newName.value,
      'mintemp': Math.min(data3pm.main.temp_min, data9am.main.temp_min)-273.15,
      'maxtemp': Math.min(data3pm.main.temp_max, data9am.main.temp_max)-273.15,
      'rainfall': data3pm.rain?Object.values(data3pm.rain)[0]:0,
      'evaporation': 0.5,
      'sunshine': 4.3,
      'windgustdir': getDirection(data3pm.wind.deg),
      'windgustspeed': data3pm.wind.gust,
      'winddir9am': getDirection(data3pm.wind.deg),
      'winddir3pm': getDirection(data9am.wind.deg),
      'windspeed9am': data9am.wind.speed,
      'windspeed3pm': data3pm.wind.speed,
      'humidity9am': data9am.main.humidity,
      'humidity3pm': data3pm.main.humidity,
      'pressure9am': data9am.main.pressure,
      'pressure3pm': data3pm.main.pressure,
      'cloud9am': data9am.clouds.all,
      'cloud3pm': data3pm.clouds.all,
      'temp9am': data9am.main.temp-273.15,
      'temp3pm': data9am.main.temp-273.15,
      'raintoday': data3pm.weather[0].main == "rainy",
      'day': data3pm.dt_txt.split(" ")[0].split("-")[2],
      'month': data3pm.dt_txt.split(" ")[0].split("-")[1],
    };
    let response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(independent),
      origin: null,
    });
    let data = await response.json();
    cards[i].children[0].innerHTML=`Temp:${(data3pm.main.temp-273.15).toFixed(2)}° C`
    cards[i].children[1].innerHTML=data3pm.dt_txt.split(" ")[0]
    cards[i].children[2].src=data.rain?"./rain.png":"./norain.png"
    cards[i].children[3].innerHTML=`Prediction: ${data.rain?"Will Rain":"Will Not Rain"}`
    cards[i].children[4].innerHTML=`API Data: ${data3pm.rain?"Will Rain":"Will Not Rain"}`
  }
}