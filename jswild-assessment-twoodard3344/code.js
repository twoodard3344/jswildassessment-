const backUpLocation = {latitude:41.9028,longitude:12.4964}
//41.9028° N, 12.4964° E
//34.0522° N, 118.2437° W
let photoArr = [];
let photoIndexNow = 0;
let photocontainer = document.getElementById("photo-container")
let img = document.createElement(`img`);
let options = {
  enableHighAccuracy: true,
  maximumAge: 0
}

const button = document.getElementById("next");

button.addEventListener("click",function(){
  photoIndexNow += 1;
  if(photoIndexNow === photoArr.length)
  {
    photoIndexNow = 0;
  }

  img.src = ImgSrcURL (photoArr[photoIndexNow])
})

function ImgSrcURL(photoObj){
  return `https://farm${photoObj.farm}.staticflickr.com/` +
  `${photoObj.server}/` +
 `${photoObj.id}_${photoObj.secret}.jpg`;
}

function displayPhotoObject(photoObj){
  console.log(photoObj.photos.photo)
    photoArr = photoObj.photos.photo
    img.src = ImgSrcURL(photoArr[photoIndexNow])
    photocontainer.innerHTML = ''
    photocontainer.append(img)
}

function processResponse (response) {
	let responsePromise = response.json()
	responsePromise.then(displayPhotoObject)
}

//Request Photos From Position
//using backup
function requestPhotos (location) {
	console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

	let myApiKey = "98da06343036e3f21827707e3c0f373f"
	let url = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=' +"109c783077ad22142b8c1e379a0ec3ab"+ '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat='+location.latitude +'&lon='+ location.longitude +'&text=food'

	let fetchPromise = fetch(url)
	fetchPromise.then(processResponse)
}

//Get current Position
function useCurrentLocation (position) {
	console.log("Getting location")
	console.log(position)
	requestPhotos(position.coords)
}
//Use backup positon
function useFallbackLocation () {
	console.log("Using fallback location")
	requestPhotos(backUpLocation)
}


navigator.geolocation.getCurrentPosition(useFallbackLocation,useCurrentLocation, options)



// function getLocation() {
// navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position.coords.latitude, position.coords.longitude);
//   });
// }


  

// //Step 2
// //Constructing the query

// function imgRequest(location)
// {
//     console.log(`Requesting photos near ${location.latitude}, ${location.longitude}`)
//     const apiKey = "109c783077ad22142b8c1e379a0ec3ab";
//     const lastPartOfUrl = `&format=json&nojsoncallback=1`+ `&method=flickr.photos.search`+`&safe_search=1`+
//     `&per_page=5`+ `$lat=${location.latitude}`+ `&lon=${location.longitude}`+ `&text=nature`;
//     const shroudMtnUrl = `https://shrouded-mountain-15003.herokuapp.com/`
//     const flickrUrl = `https://flickr.com/services/rest/?api_key=`

//     const finalUrl = shroudMtnUrl + flickrUrl + apiKey + lastPartOfUrl;
//     fetch(finalUrl);
// }

// 

//

// navigator.geolocation.getCurrentPosition(getNWSPointData);


// function getNWSPointData (position)
// {
//     console.log(position.coords.latitude, position.coords.longitude);

//     const url = `https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`;
//     fetch (url, headers)
//     .then (response => response.json())
    
// }