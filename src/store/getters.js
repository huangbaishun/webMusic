export const palying = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const currentPlayIndex = state => state.currentPlayIndex
export const mode = state => state.mode
export const currentSong = (state) => {
  return state.playList[state.currentPlayIndex] || {}
}