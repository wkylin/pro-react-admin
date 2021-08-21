const delay = async (time) => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
module.exports = delay
