import { getData } from '/src/modules/utils'

// Constants
import {
  TARIEFDEEL,
  SPECIFICATIES_PARKEERGEBIED,
  GEO_PARKEERGARAGES,
} from './constants'

export default async function cleanData() {
  const [tariefData, geoData, specsData] = await getData([
    TARIEFDEEL,
    GEO_PARKEERGARAGES,
    SPECIFICATIES_PARKEERGEBIED,
  ])

  const mergedData = geoData
    .map(location => {
      // Merge specs and geo based on areaID
      const spec = specsData.find(spec => location.areaid === spec.areaid)
      return { ...location, ...spec }
    })

    .map(entry => {
      const tarief = tariefData.find(tarief => entry.areamanagerid === tarief.areamanagerid)
      return { ...entry, ...tarief }
    })
    .map(entry => ({
      ...entry,
      wheelchairAccessible: Boolean(+entry.disabledaccess),
      parkingCapacity: +entry.capacity,
      chargingPointCapacity: +entry.chargingpointcapacity,

      // Cost of parking for one hour.
      hourlyCost: (entry.amountfarepart / entry.stepsizefarepart) * 60,

      // The area ID of the parking zone.
      areaManagerId: +entry.areamanagerid,
      areaId: entry.areaid,
      description: entry.areadesc,

      location: {
        latitude: +entry.location.latitude,
        longitude: +entry.location.longitude,
        humanReadableAdress: JSON.parse(entry.location.human_address || '{}'),
      }
    }))
  return mergedData
}