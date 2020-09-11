let buTTon = document.querySelector('.Button')
let inPut = document.querySelector('.search-box')
let City = document.querySelector('.city')
let teMp = document.querySelector('.temp')
let weaTher = document.querySelector('.weather')

const API_KEY = 'd24ca916782303cca406141013c65bfd'


buTTon.addEventListener('click', ()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inPut.value}&units=metric&appid=${API_KEY}`)
  .then(response=>response.json())
  .then(data=>{
    let nameValue = data['name'];
    let tempValue = data['main']['temp'];
    let weatherValue = data['weather'][0]['description'];

    
    
    City.innerHTML = nameValue;
    teMp.innerHTML = tempValue + '°c';
    weaTher.innerHTML = weatherValue;

  })
  
  //  .catch(error=>alert('You have entered wrong city'));

})