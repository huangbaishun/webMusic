function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function randomArr(arr) {
  // arr = JSON.parse(JSON.stringify(arr))
  arr = arr.slice()
  for (let i = 0; i < arr.length; i++) {
    let index = randomIndex(0, i)
    let tmp = arr[index]
    arr[index] = arr[i]
    arr[i] = tmp
    // [arr[i], arr[tmp]] = [arr[tmp], arr[i]]
  }
  return arr
}