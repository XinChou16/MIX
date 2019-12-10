
requirejs.config({
    baseUrl: 'http://localhost:8000/compatiable',
    paths: {
      src: 'src'
    }
  });
  
requirejs(['src/m1'], function(data) {
    console.log(data);
});
