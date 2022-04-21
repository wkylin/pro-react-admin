const delay = async (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
module.exports = delay
