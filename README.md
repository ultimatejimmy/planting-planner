# Spring Planting Planner

Using data from [*One Yard Revolution*](https://www.youtube.com/channel/UCv9ITE5nuShQ37Xd-NVkdcg) on YouTube, this app tells you when to start seeds/plant outside based on your average last frost date. 

If you know your last frost date, you can enter it.  Otherwise the app uses the Geolocation API along with the [Farmsense API](http://www.farmsense.net/) and the [yacdn.org](https://ovsoinc.github.io/yacdn.org/) CORS proxy to get your local last frost date.  This is based on 30% probability of hitting 36 degrees F (the highest frost temp).

You can view the app here: https://jimmypautz.com/plants/