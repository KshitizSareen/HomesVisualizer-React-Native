export const initialMapState ={
    zoom: 3.5,
    minLat: 0,
    maxLat: 0,
    minLong: 0,
    maxLong: 0
}

export default function MapReducer(state, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      // Do something here based on the different types of actions
      case 'changeMapState': {
        return {
            ...state,
            zoom: action.zoom,
            minLat: action.minLat,
            maxLat: action.maxLat,
            minLong: action.minLong,
            maxLong: action.maxLong
        }
      }

      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }