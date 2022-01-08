import * as dotenv from "dotenv";
dotenv.config();
import axios from 'axios';

/*
  geoNamesApi is get geo location's county info
  required regist!!
  20'000 credits daily limit per application (identified by the parameter 'username')
  https://www.geonames.org/about.html

  using for unit test

  @params
  [Longitude, Latitude]

  @response
  success:
  {"languages": string, "distance": number, "countryCode": string, "countryName": string}
  fail:
  { status: { message: 'no country code found', value: 15 } }
*/
export async function geoNamesApi(lng: number, lat: number): Promise<any> {
  return axios.get('http://api.geonames.org/countryCodeJSON', {
    params: {
      lng,
      lat,
      username: process.env.geoNamesApiUser,
    }
  })
  .then((res) => {
    if (res.data.value === 15) new Error(res.data.message); return res.data;
  })
  .catch((err) => new Error(err))
}
