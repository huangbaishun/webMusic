// 一个渲染过程中，如果出现多个mutations, 则可以封装成一个 actions
import * as type from './mutation_types'
import song1 from '@/assets/1.flac'
import song2 from '@/assets/2.mp3'
import { randomArr } from '@/utils/common'
import { palyMode } from '@/utils/config'
function addSong(list, other) {
  let obj = {
    1: song1,
    2: song2
  }
  return list.map((item, index) => {
    return item = {
      ...item,
      title: other.name,
      img: other.img,
      songurl: index % 2 == 0 ? obj[1] : obj[2],
      alltime: index % 2 == 0 ? '257' : '226',
    }
  })
}
export const selectPlay = ({ commit, state }, { list, index, other }) => {
  let arr = addSong(list, other)
  commit(type.SET_SEQUNCE_LIST, arr)
  commit(type.SET_PLAYLIST, arr)
  commit(type.SET_CURRENT_PLAYINDEX, index)
  commit(type.SET_FULLSCREEN, true)
  commit(type.SET_PLAYSTATUS, true)
}
export const selectPlayRandom = ({ commit }, { list, other }) => {
  list = addSong(list, other)
  commit(type.SET_PLAYMODE, palyMode.random)
  commit(type.SET_SEQUNCE_LIST, list)
  let arr = randomArr(list)
  commit(type.SET_PLAYLIST, arr)
  commit(type.SET_CURRENT_PLAYINDEX, 0)
  commit(type.SET_FULLSCREEN, true)
  commit(type.SET_PLAYSTATUS, true)
}