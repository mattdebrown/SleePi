# Weather Service

Uses weatherapi.com to get geolocation and weather services.  

User will need to get an account to aquire an API key from https://www.weatherapi.com/ 

API key and location need to be entered in credentials.json


### current weather

{
  location: {
    name: 'Regina',
    region: 'Saskatchewan',
    country: 'Canada',
    lat: 50.45,
    lon: -104.62,
    tz_id: 'America/Regina',
    localtime_epoch: 1695249248,
    localtime: '2023-09-20 16:34'
  },
  current: {
    last_updated_epoch: 1695249000,
    last_updated: '2023-09-20 16:30',
    temp_c: 21,
    temp_f: 69.8,
    is_day: 1,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',     <--- tested and confirmed swapping out 64 for 128 works
      code: 1003
    },
    wind_mph: 8.1,
    wind_kph: 13,
    wind_degree: 80,
    wind_dir: 'E',
    pressure_mb: 1015,
    pressure_in: 29.98,
    precip_mm: 0,
    precip_in: 0,
    humidity: 26,
    cloud: 75,
    feelslike_c: 21,
    feelslike_f: 69.8,
    vis_km: 24,
    vis_miles: 14,
    uv: 6,
    gust_mph: 7,
    gust_kph: 11.2
  }
}