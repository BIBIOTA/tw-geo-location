/*
  @params
  [Longitude, Latitude]

  @response
  type GeoDistrictTypes
*/
import { geoDistrict } from '../src/index';

/*
  Make ramdom geo location package
  https://www.npmjs.com/package/geojson-random
  
  example usage:
  random.position(bbox?)

  @optional bbox
  parameter should be an array of numbers representing a bbox in WSEN order, and if given, the position will reside within its bounds.

  @response
  [Longitude, Latitude]
*/
import random from 'geojson-random';

/*
  geoNamesApi is get geo location's county info
  send ramdomPoint() and response county info

  @params
  [Longitude, Latitude]

  @response
  {"languages": string, "distance": number, "countryCode": string, "countryName": string}
*/
import { geoNamesApi } from '../src/geoNamesApi/index';

describe('geoDistrict', () => {

  const success = expect.objectContaining({
    county: expect.any(String),
    district: expect.any(String),
  });

  const fail = false;

  describe('test success and faill by static value', () => {
    it('test success', () => {
      expect(geoDistrict([121.5036095, 25.1354249])).toEqual(expect.objectContaining({
        county: expect.any(String),
        district: expect.any(String),
      }));
    });
    it('test fail', () => {
      expect(geoDistrict([0, 0])).toEqual(false);
    });
  });

  describe('test by ramdom place and api', () => {

    const testCount = 10;

    for(let i = 1; i <= testCount; i++) {
      
      const [Longitude, Latitude] = random.position();

      it (`Test count: ${i}, Longtitude: ${Longitude}, Latitude: ${Latitude}`, async () => {
      
        const getGeoNamesApi = await geoNamesApi(Longitude, Latitude);
      
        if (getGeoNamesApi.countryCode) {
          let result;
          switch (getGeoNamesApi.countryCode) {
            case 'TW':
              result = success;
              break;
            default:
              result = fail;
              break;
          }

          expect(geoDistrict([Longitude, Latitude])).toEqual(result);
        }
      });
    }
  });
});
