// fetch
// https://segmentfault.com/a/1190000018668190
// https://github.com/github/fetch/blob/master/fetch.js
// https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
function myFetch(input, init) {
  return new Promise((resolve, reject) => {
    const { url, headers, data } = new Request(input, init)
    const xhr = new XMLHttpRequest()
    const { status, statusText } = xhr

    xhr.onload = () => {
      const options = {
        status,
        statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders())
      }
    }

  })
}


// usage
let url = 'https://www.v2ex.com/api/topics/hot.json'
let options = {
  method: 'GET',
  // headers: {
  //   'Content-Type': 'image/jpeg'
  // },
  // mode: 'cors',
  // cache: 'default'
}
fetch(url, options)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
