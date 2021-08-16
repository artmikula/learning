const createHTML = function () { //Creating divs
    let mainCont = document.getElementById('mainCont');
    let titleTop = document.createElement('div');
    let inputArea = document.createElement('form');
    let provideInput = document.createElement('input');
    let weatherArea = document.createElement('div');
    let middleWeather = document.createElement ('div');
    let nextDays = document.createElement ('div');
    let todayWeather = document.createElement ('div');
    titleTop.id = 'titleTop';
    inputArea.id = 'inputArea';
    provideInput.id = 'provideInput';
    provideInput.type = 'text';
    provideInput.name = 'provideInput';
    provideInput.placeholder = " Enter a city : ";
    weatherArea.id = 'weatherArea';
    middleWeather.id = 'middleWeather';
    nextDays.id = 'nextDays';
    todayWeather.id = 'todayWeather';
    titleTop.textContent = "WEATHER.KR";
    mainCont.appendChild(titleTop);
    mainCont.appendChild(inputArea);
    inputArea.appendChild(provideInput);
    mainCont.appendChild(weatherArea);
    weatherArea.appendChild(middleWeather);
    weatherArea.appendChild(nextDays);
    middleWeather.appendChild(todayWeather);  // next 4 days divs created with a loop
    for (i=0; i<4; i++) {
        let fourDays = document.createElement('div');
        fourDays.id = 'day'+[i];
        fourDays.className = 'fourDays';
        nextDays.appendChild(fourDays);
    }
}
createHTML();

const daysArray = [];  //converting day numbers to names
for (i=0; i<5; i++) {
    switch (new Date().getDay()+i) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        case 7: // if today plus 4 days goes over 7
          day = "Sunday";
          break;
        case 8:
          day = "Monday";
          break;
        case 9:
          day = "Tuesday";
          break;
        case 10:
          day = "Wednesday";                             
      }
    daysArray.push(day);
}
console.log(daysArray);

//other way to do it , I couldn't make it work with a loop
//  var options = { weekday: 'long'};   
//  days.push = (new Intl.DateTimeFormat('en-US', options).format(today));}
//  console.log(days);

var getCityName = function() { // taking user input and loading data
    let input = document.getElementById('provideInput');
    input.addEventListener('keypress', function(e){
        if(e.key === 'Enter') {
            e.preventDefault();   //stuck here for 4 hours lol
            var link = "http://api.openweathermap.org/data/2.5/forecast?q=" + e.target.value + "&units=metric&appid=3a6db61ccae0f26e0883affe7aaa929e";
            console.log(link);
            var xhr = new XMLHttpRequest();
            xhr.open ('GET', link);
            xhr.send(null);
            xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            // clearing data to load the next city
            let clearToday = document.getElementById('todayWeather');
            clearToday.innerHTML = '';
            let clearNext = document.querySelectorAll('.fourDays')   //clearing before re-loading the next city
            for (i=0; i<clearNext.length; i++) {
                clearNext[i].innerHTML = ''};
            // temperature for 5 days
            var fiveDaysTemp = [];
            for (i=0; i<33; i++) {
                fiveDaysTemp.push(response.list[i].main.temp);}
            console.log(fiveDaysTemp);
            // loading new content
            let nameOfCity = document.createElement('h1');
            let todayDay = document.createElement('h2');
            let todayTemp = document.createElement('h1');
            let cloudySunny = document.createElement('h2');
            let bottomArea = document.createElement('div');
            let leftBottom = document.createElement('div');
            let rightBottom = document.createElement('div');
            let wind = document.createElement('h3');
            let humidity = document.createElement('h3');
            let pressure = document.createElement('h3');
            let cloudyness = document.createElement('h3');
            let body = document.getElementsByTagName('body')[0];
            var todayIcon = response.list[0].weather[0].icon;
            if (todayIcon==='01d') {    // background color based on the icon
              body.style.backgroundImage = 'url(../Weather/sunny.jpg)';
              body.style.color = 'black';
            } else if (todayIcon==='02d') {
              body.style.backgroundImage = 'url(../Weather/partlycloudy.png)';
              body.style.color = 'black';
            } else if (todayIcon==='03d') {
              body.style.backgroundImage = 'url(../Weather/scattered.png)';
              body.style.color = 'black';
            } else if (todayIcon==='04d') {
              body.style.backgroundImage = 'url(../Weather/clouds.jpeg)';
              body.style.color = 'black';
            } else if (todayIcon==='09d') {
              body.style.backgroundImage = 'url(../Weather/rain2.png)';
              body.style.color = 'black';
            } else if (todayIcon==='10d') {
              body.style.backgroundImage = 'url(../Weather/rain3.jpeg)';
              body.style.color = 'white';
            } else if (todayIcon==='11d') {
              body.style.backgroundImage = 'url(../Weather/thunder.jpg)';
              body.style.color = 'white';
            } else if (todayIcon==='13d') {
              body.style.backgroundImage = 'url(../Weather/snow.jpg)';
              body.style.color = 'black';
            } else {
              body.style.backgroundImage = 'url(../Weather/night.png)';
              body.style.color = 'white';
            }
            var linkToIcon = "http://openweathermap.org/img/wn/" + todayIcon + "@2x.png";   //fetching icons from open weather
            let icon = document.createElement('img');
            icon.setAttribute = ("name", "icon");
            icon.setAttribute = ("alt", "icon");
            icon.src = linkToIcon;
            nameOfCity.textContent = response.city.name;
            todayDay.textContent = daysArray[0];
            todayTemp.textContent = response.list[0].main.temp + '°';
            cloudySunny.textContent = response.list[0].weather[0].main;
            bottomArea.id = 'bottomArea';
            leftBottom.class = 'bottomBottom';
            rightBottom.class = 'bottomBottom';
            wind.textContent = 'Wind: ' + response.list[0].wind.speed + ' m/s';
            humidity.textContent = 'Humidity: ' + response.list[0].main.humidity + ' %';
            pressure.textContent = 'Pressure: ' + response.list[0].main.pressure + ' hPa';
            cloudyness.textContent = 'Cloudiness: ' + response.list[0].clouds.all + ' %';
            todayWeather.appendChild(nameOfCity);
            todayWeather.appendChild(todayDay);
            todayWeather.appendChild(todayTemp);
            todayWeather.appendChild(icon);
            todayWeather.appendChild(cloudySunny);
            todayWeather.appendChild(bottomArea);
            bottomArea.appendChild(leftBottom);
            bottomArea.appendChild(rightBottom);
            leftBottom.appendChild(wind);
            leftBottom.appendChild(humidity);
            rightBottom.appendChild(pressure);
            rightBottom.appendChild(cloudyness);
            // filling next 4 days, arrays for temperature and overcast
            var tempArray = [];
            var cloudySunnyArray = [];
            for (let i=8; i<=32; i +=8) {  // data for the next 4 days temperature
                tempArray.push(response.list[i].main.temp + '°');
                cloudySunnyArray.push(response.list[i].weather[0].main);
            }
            for (i=0; i<4; i++) {        // filling data for next 4 days
                let fourDays = document.querySelectorAll('.fourDays');
                let dayOfWeek = document.createElement('h3');
                let temp = document.createElement('h2');
                let overcast = document.createElement('h3');
                var linkToIcon = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
                let icon = document.createElement('img');
                icon.setAttribute = ("name", "icon");
                icon.setAttribute = ("alt", "icon");
                icon.src = linkToIcon;
                temp.textContent = tempArray[i];
                overcast.textContent = cloudySunnyArray[i];
                dayOfWeek.textContent = daysArray[i+1];
                fourDays[i].appendChild(dayOfWeek);
                fourDays[i].appendChild(temp);
                fourDays[i].appendChild(icon);
                fourDays[i].appendChild(overcast);
            }
            weatherArea.style.visibility = 'visible';  //showing bottom part after loading city
            } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status != 200) {alert("ERROR\nUnable to find city");}  // in case of error alert
        })}})}
getCityName();