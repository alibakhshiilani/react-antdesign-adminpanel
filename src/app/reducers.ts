import { combineReducers } from 'redux'
import { provinceCityReducer } from '../components/crud/components/provinceCitySelector/provinceCitySelector.reducer'
import { ProvinceCityReducerTypes } from '../components/crud/components/provinceCitySelector/provinceCitySelector.types'

const reducerApp = combineReducers({
  // privilegesReducer,
  // profileReducer,
  // rolesReducer,
  provinceCityReducer,
})

export default reducerApp

export interface DefaultRootStateTypes {
  privilegesReducer?: any
  profileReducer?: any
  rolesReducer?: any
  locationCategoriesFilterReducer?: any
  provinceCityReducer: ProvinceCityReducerTypes
}
