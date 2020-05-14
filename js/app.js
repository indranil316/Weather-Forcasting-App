const form=document.querySelector('form');
const img=document.querySelector('#forcast .img');
const report=document.querySelector('#forcast .report');
const forcast=document.querySelector('#forcast');
forcast.style.display='none';

const updateUI = (data) =>{
    const cityKey=data.cityKey;
    const cityName=form.location.value.toUpperCase();
    form.reset();
    const weather=data.weather;
    const date=weather[0].LocalObservationDateTime.substring(0,10);
    const time=weather[0].LocalObservationDateTime.substring(11,16);
    const IsDayTime=weather[0].IsDayTime;
    const weatherText=weather[0].WeatherText;
    const temperature=weather[0].Temperature.Metric.Value;
    report.innerHTML=` <h2><span>${cityName}</span><br>Weather Condition : ${weatherText}<br><span>Temperature : ${temperature}C</span></h2>`;
    forcast.style.display='flex';
    if(IsDayTime==true)
    {
        img.style.background="url('../images/condition/day.jpg')";
        img.innerHTML=`<p>DAY Date : ${date} Time : ${time}</p>`;
        document.querySelector('#forcast .img p').style.color='black';
    }
    else{
        img.style.background="url('../images/condition/night.jpg')";
        img.innerHTML=`<p>NIGHT Date : ${date} Time : ${time}</p>`;
        document.querySelector('#forcast .img p').style.color='white';
    }
}

const updateCity = async (city) =>{
    const cityKey= await getCity(city);
    const weather= await getWeather(cityKey);
    return {cityKey,weather}
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city=form.location.value.trim();
    updateCity(city)
        .then(data=>updateUI(data))
        .catch(err=>console.log(err))
})