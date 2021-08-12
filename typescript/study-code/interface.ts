// import Vuex, { Getter } from 'vuex'

type Computed = () => any;

type Dictionary<T> = {
  [key: string]: T;
};

interface GetTruthy {
  (map: string): boolean;
}

interface Mapper<R> {
  (map: string[]): Dictionary<R>;
  (map: Dictionary<string>): Dictionary<R>;
}

interface FunctionMapper<F, R> {
  (map: Dictionary<
    (this: typeof Vue, fn: F, ...args: any[]) => any
  >): Dictionary<R>
}


// usage
const obj1: Dictionary<number> = {
  a: 1,
  b: 2,
};

let myFunc: GetTruthy = (map) => true;
myFunc('12');

var mapState1: Mapper<number> = (map) => {
  console.log(map);
  return {
    a: 1,
  };
};
var mapState2: Mapper<number> = (mapObj) => ({
  a: '1',
});
var mapState3: Mapper<Computed> = () => ({
  b: () => 1,
  c: 2,
});
