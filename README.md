### tw-geo-location 開發中

透過geolocation取得所在的位置縣市、鄉鎮區 (Taiwan only)

引入套件:

```
  import { geoDistrict } from 'tw-geo-location';
```

接受參數:

[Longitude: number, Latitude: number]

回傳參數:

當傳送的地理位置位於臺灣時回傳資訊，不在臺灣時回傳false
{ county: string, district: string } || false

使用:

```
geoDistrict([Longitude, Latitude]);
```

範例:

```
  // success
  const data = geoDistrict([121.5036095, 25.1354249]);
  console.log(data); // { county: '臺北市', district: '北投區' }

  // fail
  const data = geoDistrict([0, 0]);
  console.log(data); // false
```

此套件所使用的資源:

turf - 使用boolean-point-in-polygon計算鄉鎮區界線
<a href="https://www.npmjs.com/package/@turf/boolean-point-in-polygon">npm</a>

jest - unit test
<a href="https://www.npmjs.com/package/jest">npm</a>

geojson-random - unit test 產生隨機位置
<a href="https://www.npmjs.com/package/geojson-random">npm</a>


geonames api - call api in unit test 取得隨機位置的地理資訊
<a href="https://www.geonames.org/about.html">about</a>

axios - call api in unit test
<a href="https://www.npmjs.com/package/axios">npm</a>

臺灣鄉鎮市區行政區域界線geoJson:
<a href="https://sheethub.com/ronnywang/%E9%84%89%E9%8E%AE%E5%B8%82%E5%8D%80%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E7%95%8C%E7%B7%9A">sheethub</a>
