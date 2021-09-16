# levelo-Marseille-2020

Html-css-js website made to use the self-service bikes in Marseille. You can navigate on the map and book a bike at any station in Marseille. You have 20 min to come and get the bike at the station you book it. The datas you see are real and collected thanks to an API but the reservation you make is fictional. I completed this project on April 18, 2020.

You can try the website by cloning this repo, then `cd source_code` and opening the file `index.html` in your browser. 

The main features are :
- Display a map with all bike stations, their live datas (available bikes/stands etc) thanks to the JCDecaux API
- Book a bike (if a bike is available) at any station via a form (first name, name and signature made with the Canvas API)
- The form may be prefilled if a reservation was previously made on any station
- Once a bike is booked, all information related to the booking (name of the person who booked, which station, 20 minutes countdown) are gathered in a static kind of footer
- The booking is fake but saved on the browser and the datas are updated **on my browser** only if a booking is made/cancelled
- There can only be 1 booking at the time
- CSS animations
- Leaflet map https://leafletjs.com
- API JCDecaux https://developer.jcdecaux.com/#/opendata/vls?page=getstarted
- API Canvas https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Object-oriented programming
- Responsive of course

In this repo, you will find :
- img : folder with all images
- source_code : where all the source code is
- Prez-fr.pdf : presentation of the website in french 🥖 

The website was once hosted and online but isn't anymore 🤡

![GitHub repo size](https://img.shields.io/github/repo-size/amontaut/levelo-Marseille-2020)
