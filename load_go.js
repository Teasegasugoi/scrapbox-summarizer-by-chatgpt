const go = new Go();

WebAssembly.instantiateStreaming(fetch("format.wasm"), go.importObject).then((result) => {
  go.run(result.instance);
});