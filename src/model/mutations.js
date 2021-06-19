import isEmpty from 'lodash-es/isEmpty';

import { setFlatEarthCoordinateSystemOrigin } from '~/actions/map-origin';
import { updateFeatureCoordinatesByIds } from '~/features/map-features/slice';
import { moveOutdoorShowOriginByMapCoordinateDelta } from '~/features/show/actions';
import { toDegrees } from '~/utils/math';

import { createFeatureFromOpenLayers } from './features';

import {
  globalIdToAreaId,
  globalIdToFeatureId,
  globalIdToOriginId,
  MAP_ORIGIN_ID,
  CONVEX_HULL_AREA_ID,
} from './identifiers';

/**
 * Handles the cases when some of the features are updated in OpenLayers and
 * propagates the updates back to the Redux store.
 *
 * This function must be called whenever OpenLayers indicates (via events) that
 * some of the features were modified.
 *
 * @param  {Array<ol.Feature>}  features  the array of features that were updated
 * @param  {function}  dispatch  the Redux store dispatcher function
 * @param  {string}  type  the type of the modification; may be one of 'modify'
 *         (general modification of the feature, including adding / removing / updating
 *         individual vertices) or 'transform" (moving or rotating the entire
 *         feature)
 */
export function handleFeatureUpdatesInOpenLayers(
  features,
  dispatch,
  { event, type } = {}
) {
  const updatedUserFeatures = {};

  for (const feature of features) {
    const globalId = feature.getId();

    // Is this feature a user-defined feature? If so, we update it directly
    // in the Redux store.
    const userFeatureId = globalIdToFeatureId(globalId);
    if (userFeatureId) {
      // Feature is a user-defined feature so update it in the Redux store
      updatedUserFeatures[userFeatureId] =
        createFeatureFromOpenLayers(feature).points;

      continue;
    }

    // Does this feature represent the origin of a coordinate system?
    const originFeatureId = globalIdToOriginId(globalId);
    if (originFeatureId) {
      if (originFeatureId === MAP_ORIGIN_ID) {
        // Feature is the origin of the flat Earth coordinate system
        const featureObject = createFeatureFromOpenLayers(feature);
        const coords = feature.getGeometry().getCoordinates();
        dispatch(
          setFlatEarthCoordinateSystemOrigin(
            featureObject.points[0],
            90 -
              toDegrees(
                Math.atan2(
                  // Don't use featureObject.points here because they are already
                  // in lat-lon so they cannot be used to calculate an angle
                  coords[1][1] - coords[0][1],
                  coords[1][0] - coords[0][0]
                )
              )
          )
        );
      } else {
        // Some other origin (e.g., show origin). We don't handle it yet,
        // maybe later?
      }

      continue;
    }

    // Is this feature an area such as the convex hull of the show?
    const areaId = globalIdToAreaId(globalId);
    if (
      areaId === CONVEX_HULL_AREA_ID &&
      type === 'transform' &&
      event.subType === 'move' &&
      event.delta
    ) {
      dispatch(moveOutdoorShowOriginByMapCoordinateDelta(event.delta));
    }
  }

  if (!isEmpty(updatedUserFeatures)) {
    dispatch(updateFeatureCoordinatesByIds(updatedUserFeatures));
  }
}
