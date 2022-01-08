import { Feature, MultiPolygon } from 'geojson';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { FeatureCollection } from 'geojson';
import _twGeoJson from '../../twGeo.json';

/*
  interface response data types
*/
interface Properties {
    county: string,
    district: string,
}

/*
  set response types
*/
type GeoDistrictTypes = Properties | false;

/*
  get data from Properties

  @params
  type Feature

  @response
  type Properties | false
*/
function getProperties(result: Feature): Properties {
    const { C_Name, T_Name } = result.properties;
    return {
        county: C_Name,
        district: T_Name,
    }
}

/*
  Taiwan GeoJson data from:
  https://sheethub.com/ronnywang/%E9%84%89%E9%8E%AE%E5%B8%82%E5%8D%80%E8%A1%8C%E6%94%BF%E5%8D%80%E5%9F%9F%E7%95%8C%E7%B7%9A
*/
export const twGeoJson = _twGeoJson as FeatureCollection;

/*
  @params
  [Longitude, Latitude]

  @response
  type GeoDistrictTypes
*/
export function geoDistrict(point: [number, number]): GeoDistrictTypes {

    const result = twGeoJson.features.find((feature: Feature) => {

        const geometry = feature.geometry as MultiPolygon;

        if (booleanPointInPolygon(point, geometry)) {
            return feature;
        }

    });

    if (result) return getProperties(result);

    return false;
}