// https://github.com/rahuulmiishra/trendyAwait/blob/main/runPromise.js

const runPromise = async (fn) => {
  try {
    const d = await fn()
    return [d, null]
  } catch (e) {
    return [null, e]
  }
}

const promise = () =>
  new Promise((res) => {
    setTimeout(() => {
      console.log('1')
      res('promise')
    }, 3000)
  })

async function test() {
  const [res] = await runPromise(promise)
  console.log('23', res)
}

test()

// Demonstration of using params.
const fetchDataFromServer = (params) => () =>
  new Promise((res) => {
    setTimeout(() => {
      res(`Received Data' ${params}`)
    }, 3000)
  })

async function main() {
  const [res1, error1] = await runPromise(fetchDataFromServer('123'))
  const [res2, error2] = await runPromise(fetchDataFromServer())
  console.log('res1', res1)
  console.log('error1', error1)
  console.log('res2', res2)
  console.log('error2', error2)
}

main()
