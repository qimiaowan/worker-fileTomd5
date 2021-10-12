
self.importScripts('./node_modules/spark-md5/spark-md5.js')

self.onmessage = function(e) {
  getFileMd5(e.data)
}

function getFileMd5(file) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 1024 * 1024 * 5
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()

  fileReader.onload = function(e) {
    spark.append(e.target.result)
    currentChunk++
    if (currentChunk < chunks) {
      loadNext()
    } else {
      postMessage(spark.end())
    }
  }

  fileReader.onerror = function(error) {
    console.error(error)
    postMessage()
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }
  loadNext()
}