import * as types from './mutation_types'
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singerdDetailed = Object.assign({}, singer)
  }
}
export default mutations