// import { add } from './math';
// console.log(add(100, 2));

import('./math').then(math => {
  console.log(math.add(66, 2));
});
