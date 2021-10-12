const wk = new Worker('./work.js')

wk.onmessage = function(e) {
  console.log(e.data);
}

 fl.onchange = function(e){
   wk.postMessage(e.target.files[0])
 }