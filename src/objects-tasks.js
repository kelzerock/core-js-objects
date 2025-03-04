/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const result = {};
  return Object.assign(result, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  const result = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key in result) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    });
  });
  return result;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const copyObj = obj;
  keys.forEach((key) => {
    delete copyObj[key];
  });
  return obj;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  return Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const arraysLetters = Object.entries(lettersObject);
  const maxNum = Math.max(
    ...arraysLetters.flat(Infinity).filter((el) => typeof el === 'number')
  );
  const result = [];
  for (let i = 0; i <= maxNum; i += 1) {
    arraysLetters.forEach((array) => {
      if (array[1].includes(i)) {
        result.push(array[0]);
      }
    });
  }
  return result.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const addMoneyToBank = (amoun, bank) => {
    bank.push(amoun);
    bank.sort((a, b) => b - a);
  };

  const costTicket = 25;
  let sellerBank = [];
  let check = true;
  queue.forEach((el) => {
    if (el === costTicket) {
      addMoneyToBank(el, sellerBank);
    } else {
      let change = 0;
      const needChange = el - costTicket;
      const changeIndexes = [];
      sellerBank.forEach((item, ind) => {
        if (item <= needChange && item + change <= needChange) {
          change += item;
          changeIndexes.push(ind);
        }
      });
      if (change !== needChange) {
        check = false;
      }
      sellerBank = sellerBank.filter((_, ind) => !changeIndexes.includes(ind));
      addMoneyToBank(el, sellerBank);
    }
  });
  return check;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const rectangle = {};
  rectangle.width = width;
  rectangle.height = height;
  rectangle.getArea = () => rectangle.width * rectangle.height;
  return rectangle;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  let result = '';
  const convert = (el) => {
    if (typeof el === 'number') return el;
    if (typeof el === 'string') return `"${el}"`;
    return el;
  };

  if (Array.isArray(obj)) {
    result += '[';
    obj.forEach((el, index) => {
      const lastEl = index === obj.length - 1 ? '' : ',';
      result += convert(el) + lastEl;
    });
    result += ']';
  } else if (typeof obj === 'object') {
    const arrObj = Object.entries(obj);
    result += '{';
    arrObj.forEach(([key, value], index) => {
      const lastEl = index === arrObj.length - 1 ? '' : ',';
      result += `${convert(key)}:${convert(value)}${lastEl}`;
    });
    result += '}';
  }
  return result;
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const result = {};
  const arrInfo = json.slice(1, json.length - 1);
  arrInfo.split(',').forEach((el) => {
    const elem = el.trim().split(':');
    const key = elem[0].slice(1, elem[0].length - 1);
    const value = +elem[1];
    result[key] = value;
  });
  const NewClass = proto.constructor;
  return new NewClass(...Object.values(result));
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    if (a.country > b.country) return 1;
    if (a.country < b.country) return -1;
    if (a.country === b.country) {
      if (a.city > b.city) return 1;
    }
    return -1;
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const result = new Map();
  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);
    if (result.has(key)) {
      result.get(key).push(value);
    } else {
      result.set(key, [value]);
    }
  });
  return result;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */
const orderError =
  'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
const elementError =
  'Element, id and pseudo-element should not occur more then one time inside the selector';

const handleError = (cond, message) => {
  if (cond) throw new Error(message);
};

const cssSelectorBuilder = {
  element(value) {
    handleError(this.checkElement, elementError);
    handleError(this.order, orderError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `${value}`;
    obj.checkElement = true;
    obj.order = 1;
    return obj;
  },

  id(value) {
    handleError(this.checkID, elementError);
    handleError(this.order && this.order > 2, orderError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `#${value}`;
    obj.checkID = true;
    obj.order = 2;
    return obj;
  },

  class(value) {
    handleError(this.order && this.order > 3, orderError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `.${value}`;
    obj.order = 3;
    return obj;
  },

  attr(value) {
    handleError(this.order && this.order > 4, orderError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `[${value}]`;
    obj.order = 4;
    return obj;
  },

  pseudoClass(value) {
    handleError(this.order && this.order > 5, orderError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `:${value}`;
    obj.order = 5;
    return obj;
  },

  pseudoElement(value) {
    handleError(this.checkPseudoElement, elementError);
    const obj = Object.create(this);
    obj.result = this.result || '';
    obj.result += `::${value}`;
    obj.checkPseudoElement = true;
    obj.order = 6;
    return obj;
  },

  combine(selector1, combinator, selector2) {
    const combinedResult = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    const obj = Object.create(this);
    obj.result = combinedResult;
    return obj;
  },

  stringify() {
    return this.result;
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
