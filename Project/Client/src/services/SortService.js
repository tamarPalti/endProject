// הפעלת הפונקציה: היא מקבלת בתור שתי פרמטרים ראשונים LAT LNG
// זה הפונקצה שממיינת לפי קירבה

class GeolocationService {

    Deg2Rad(deg) {
        return deg * Math.PI / 180;
    }
    PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        let lat1Temp = this.Deg2Rad(lat1);
        let lat2Temp = this.Deg2Rad(lat2);
        let lon1Temp = this.Deg2Rad(lon1);
        let lon2Temp = this.Deg2Rad(lon2);

        let R = 6371; // km
        let x = (lon2Temp - lon1Temp) * Math.cos((lat1Temp + lat2Temp) / 2);
        let y = (lat2Temp - lat1Temp);
        let d = Math.sqrt(x * x + y * y) * R;
        return d;
    }
    sortAlpha(copyCity) {
        const breweries = [...copyCity].sort((a, b) => {
            if (a.dif < b.dif) return -1;
            if (a.dif > b.dif) return 1;
            return 0;
        });
        console.log(breweries);

        return breweries;
    }

    async beginSort(latitude, longitude, cities) {
        let minDif = 99999;
        let copyCity = [];
        for (let index = 0; index < cities.length; ++index) {

            let dif
            if (cities[index].results[0].geometry !== undefined) {
                dif = await this.PythagorasEquirectangular(latitude, longitude, cities[index].results[0].geometry.location.lat, cities[index].results[0].geometry.location.lng);
            }
            if (dif < minDif) {
                minDif = dif;
            }
            copyCity[index] = { "dif": dif, "index": index }
        }
        console.log(copyCity);
        return this.sortAlpha(copyCity);
    }
}

export default new GeolocationService()