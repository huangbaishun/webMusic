import { palyMode } from '../utils/config'
const state = {
  singerdDetailed: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: palyMode.sequence,
  currentPlayIndex: -1
}
export default state