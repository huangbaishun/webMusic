import * as types from './mutation_types'
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singerdDetailed = Object.assign({}, singer)
  },
  [types.SET_SEQUNCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_PLAYINDEX] (state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_FULLSCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYSTATUS] (state, flag) {
    state.playing = flag
  },
}
export default mutations