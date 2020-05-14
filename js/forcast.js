const key ='5zpMmT31kM9vpZkEPRosw0uu390TGcth';

const getWeather = async (id) =>{
    const baseURL='http://dataservice.accuweather.com/currentconditions/v1/';
    const query=`${id}?apikey=${key}`;
    const response = await fetch(baseURL+query);
    const data = await response.json();
    return data;
};

const getCity = async (city)=>{
    const baseURL='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query=`?apikey=${key}&q=${city}`;
    const response=await fetch(baseURL+query);
    const data= await response.json();
    return data[0].Key;
};

