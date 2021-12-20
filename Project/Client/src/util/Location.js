import Geocode from "react-geocode";
import GeolocationService from '../services/SortService';

export const FromAddress = (address) => {
  return Geocode.fromAddress(address);
}



export const SortllBusiness = async (allBusiness, saveall,setCircularProgresStateFunc) => {

  Geocode.setApiKey("AIzaSyC42dZGLkeXWn1ofLJhRrWcVBxFY1-tf2Q");

  const places = [];
  let place = {};
  let sorted = [];
  let loc = null;

  await navigator.geolocation.getCurrentPosition(async (arr) => {

    place = arr;


    // await FromAddress("").then(succ => loc = succ);


    for (let index = 0; index < allBusiness.length; index++) {
      await console.log(allBusiness[index]);

      await FromAddress(allBusiness[index].adress).then(Address => places.push(Address))
        .catch(error => console.log("לא נמצא כתובת " + allBusiness[index].adress));
    }

    let arrSort = await GeolocationService.beginSort(
      loc ? loc.results[0].geometry.location.lat : place.coords.latitude,
      loc ? loc.results[0].geometry.location.lng : place.coords.longitude,
      places
    );

    sorted = await arrSort.map((location) => {
      return allBusiness[location.index];
    });

    saveall(sorted);
    setCircularProgresStateFunc(false);
  }
  );
  // return sorted;
}