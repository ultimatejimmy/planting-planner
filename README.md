# Spring Planting Planner

Using data from [*One Yard Revolution*](https://www.youtube.com/channel/UCv9ITE5nuShQ37Xd-NVkdcg) on YouTube, this app tells you when to start seeds indoors and plant outside based on your average last frost date. 

If you know your last frost date or zip code, you can enter it.  Otherwise the app uses the Geolocation API, [Geocoding API](https://geocode.maps.co/docs/) along with the [Frost Date API](https://apis.joelgrant.dev/).  This is based on 30% probability of hitting 32 degrees F.

It also uses Cloudflare workers as a CORS Proxy using [Clouflare CORS Anywhere](https://github.com/Zibri/cloudflare-cors-anywhere) and to store API keys.

You can view the app here: https://jimmypautz.com/plants/