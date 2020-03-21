// https://gist.github.com/c7x43t/38afee87bb7391efb9ac27a3c282e5ed
// deep copy:
// String, Number, undefined, null, Set, Map, typed Array,
// Object, Boolean, RegExp, Date, ArrayBuffer
// Functions, Properties of types: (Primitive, Symbol)
// shallow copy (by reference):
// WeakMap, WeakSet, Symbol
function deepCopy(o) {
  // fast obj/null test
  if ((typeof o !== 'object' || o === null) &&
  !(o instanceof Function)) return o;
  let n; let keys;
  const C = o.constructor;
  if (o[Symbol.iterator] instanceof Function) { // fast array test
    // Map and Set have no length property so they will be correctly constructed
    const l = o.length;
    n = (new C(l));
    switch (C) {
      case Set:
        for (const e of o) n.add(deepCopy(e));
        break;
      case Map:
        for (const [key, value] of o) n.set(key, deepCopy(value));
        break;
    }
    for (const i of Object.keys(o)) n[i] = deepCopy(o[i]);
  } else {
    if (C !== Object) {
      switch (C) {
        case Function:
          const str = o.toString();
          if (/ \[native code\] /.exec(str) === null) {
            const args=/^.*?\((.*?)\)/.exec(str)[1];// .split(/,/);
            const func=/^.*?{(.*)}/.exec(str)[1];
            n=new C(args, func);
          } else {
            n=o;
          }
          break;
        case RegExp:
          n = new C(o.valueOf());
          break;
        case Date:
          n = new C(o);
          break;
        case ArrayBuffer:
          n = new C((new Int8Array(o)).length);
          break;
        default:
          n = o;
      }
      keys = Object.keys(o);
    } else {
      n = {};
      keys = Object.getOwnPropertyNames(o);
    }
    for (const i of keys) n[i] = deepCopy(o[i]);
  }
  for (const i of Object.getOwnPropertySymbols(o)) n[i] = deepCopy(o[i]);
  return n;
}

export {deepCopy};
