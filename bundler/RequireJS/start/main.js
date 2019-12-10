
requirejs.config({
  baseUrl: 'libs',
  paths: {
    app: '../app'
  }
});

requirejs(['app/main'], function(data) {
  console.log(data);
});
