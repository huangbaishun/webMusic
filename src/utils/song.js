export default class Song {
  constructor({ id, name, uid, image, arr}) {
    this.id = id;
    this.name = name;
    this.uid = uid;
    this.image = image
    this.arr = arr
  }
}

export function createSong(data) {
  return new Song({
    id: data.uid,
    name: data.name,
    uid: data.uid,
    image: data.img,
    arr: data.arr
  })
}