process.on('message', (msg) => {
  console.log('msg from parent', msg);
});

setTimeout(() => {
  process.send('from child');
}, 3000);
