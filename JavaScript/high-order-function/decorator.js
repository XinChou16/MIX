function doSomething(name) {
  console.log('Hello %s', name);
}

function loggedDecorator(func) {
  return function () {
    console.log('Start wrapped...');
    const result = func.apply(this, arguments);
    console.log('End wrapped.');
    return result;
  };
}

var wrapped = loggedDecorator(doSomething);

// Hello Evan
doSomething('Evan');

// Start Wrapped
// Hello Evan
// End wrapped.
wrapped('Evan');
