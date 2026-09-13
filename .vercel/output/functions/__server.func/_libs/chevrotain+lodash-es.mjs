import { $ as assign, At as isObjectLike, B as _getTag_default, C as isString, Ct as identity, D as forEach, Dt as isArray, E as every, Et as isObject, F as hasPath, G as getSymbols, H as getAllKeysIn, I as setToArray, J as getPrototype, K as arrayFilter, L as cacheHas, M as baseIteratee, Mt as Symbol, Nt as root, Ot as arrayMap, Q as keysIn, R as SetCache, S as values, St as isFunction, U as getAllKeys, V as Set, W as getSymbolsIn, Y as arrayPush, _ as some, _t as baseIndexOf, a as GAstVisitor, at as isBuffer, b as isRegExp, c as NonTerminal, d as RepetitionMandatory, dt as baseRest, et as keys, f as RepetitionMandatoryWithSeparator, g as serializeGrammar, gt as baseAssignValue, h as Terminal, ht as eq, i as isSequenceProd, it as baseUnary, k as baseEach, l as Option, lt as isIterateeCall, m as Rule, mt as assignValue, n as isBranchingProd, nt as isTypedArray, o as Alternation, ot as isArguments, p as RepetitionWithSeparator, pt as copyObject, q as Stack, r as isOptionalProd, rt as nodeUtil, s as Alternative, st as isPrototype, t as getProductionDslName, tt as baseKeys, u as Repetition, ut as isArrayLike, v as pickBy, vt as baseFindIndex, w as map, wt as toInteger, x as includes, yt as arrayEach, z as Uint8Array } from "./chevrotain__gast+lodash-es.mjs";
import { i as PRINT_WARNING, n as timer, r as PRINT_ERROR, t as toFastProperties } from "./chevrotain__utils.mjs";
import { n as RegExpParser, t as BaseRegExpVisitor } from "./chevrotain__regexp-to-ast.mjs";
//#region node_modules/lodash-es/_baseCreate.js
/** Built-in value references. */
var objectCreate = Object.create;
/**
* The base implementation of `_.create` without support for assigning
* properties to the created object.
*
* @private
* @param {Object} proto The object to inherit from.
* @returns {Object} Returns the new object.
*/
var baseCreate = function() {
	function object() {}
	return function(proto) {
		if (!isObject(proto)) return {};
		if (objectCreate) return objectCreate(proto);
		object.prototype = proto;
		var result = new object();
		object.prototype = void 0;
		return result;
	};
}();
//#endregion
//#region node_modules/lodash-es/noop.js
/**
* This method returns `undefined`.
*
* @static
* @memberOf _
* @since 2.3.0
* @category Util
* @example
*
* _.times(2, _.noop);
* // => [undefined, undefined]
*/
function noop() {}
//#endregion
//#region node_modules/lodash-es/_copyArray.js
/**
* Copies the values of `source` to `array`.
*
* @private
* @param {Array} source The array to copy values from.
* @param {Array} [array=[]] The array to copy values to.
* @returns {Array} Returns `array`.
*/
function copyArray(source, array) {
	var index = -1, length = source.length;
	array || (array = Array(length));
	while (++index < length) array[index] = source[index];
	return array;
}
//#endregion
//#region node_modules/lodash-es/_arrayIncludes.js
/**
* A specialized version of `_.includes` for arrays without support for
* specifying an index to search from.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludes(array, value) {
	return !!(array == null ? 0 : array.length) && baseIndexOf(array, value, 0) > -1;
}
//#endregion
//#region node_modules/lodash-es/_isFlattenable.js
/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
/**
* Checks if `value` is a flattenable `arguments` object or array.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
*/
function isFlattenable(value) {
	return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
//#endregion
//#region node_modules/lodash-es/_baseFlatten.js
/**
* The base implementation of `_.flatten` with support for restricting flattening.
*
* @private
* @param {Array} array The array to flatten.
* @param {number} depth The maximum recursion depth.
* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
* @param {Array} [result=[]] The initial result value.
* @returns {Array} Returns the new flattened array.
*/
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) {
			if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
			else arrayPush(result, value);
		} else if (!isStrict) result[result.length] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/flatten.js
/**
* Flattens `array` a single level deep.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to flatten.
* @returns {Array} Returns the new flattened array.
* @example
*
* _.flatten([1, [2, [3, [4]], 5]]);
* // => [1, 2, [3, [4]], 5]
*/
function flatten(array) {
	return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
}
//#endregion
//#region node_modules/lodash-es/_baseSlice.js
/**
* The base implementation of `_.slice` without an iteratee call guard.
*
* @private
* @param {Array} array The array to slice.
* @param {number} [start=0] The start position.
* @param {number} [end=array.length] The end position.
* @returns {Array} Returns the slice of `array`.
*/
function baseSlice(array, start, end) {
	var index = -1, length = array.length;
	if (start < 0) start = -start > length ? 0 : length + start;
	end = end > length ? length : end;
	if (end < 0) end += length;
	length = start > end ? 0 : end - start >>> 0;
	start >>>= 0;
	var result = Array(length);
	while (++index < length) result[index] = array[index + start];
	return result;
}
//#endregion
//#region node_modules/lodash-es/_arrayReduce.js
/**
* A specialized version of `_.reduce` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {*} [accumulator] The initial value.
* @param {boolean} [initAccum] Specify using the first element of `array` as
*  the initial value.
* @returns {*} Returns the accumulated value.
*/
function arrayReduce(array, iteratee, accumulator, initAccum) {
	var index = -1, length = array == null ? 0 : array.length;
	if (initAccum && length) accumulator = array[++index];
	while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
	return accumulator;
}
//#endregion
//#region node_modules/lodash-es/_baseAssign.js
/**
* The base implementation of `_.assign` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssign(object, source) {
	return object && copyObject(source, keys(source), object);
}
//#endregion
//#region node_modules/lodash-es/_baseAssignIn.js
/**
* The base implementation of `_.assignIn` without support for multiple sources
* or `customizer` functions.
*
* @private
* @param {Object} object The destination object.
* @param {Object} source The source object.
* @returns {Object} Returns `object`.
*/
function baseAssignIn(object, source) {
	return object && copyObject(source, keysIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_cloneBuffer.js
/** Detect free variable `exports`. */
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
/** Built-in value references. */
var Buffer = freeModule && freeModule.exports === freeExports ? root.Buffer : void 0;
var allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
/**
* Creates a clone of  `buffer`.
*
* @private
* @param {Buffer} buffer The buffer to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Buffer} Returns the cloned buffer.
*/
function cloneBuffer(buffer, isDeep) {
	if (isDeep) return buffer.slice();
	var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	buffer.copy(result);
	return result;
}
//#endregion
//#region node_modules/lodash-es/_copySymbols.js
/**
* Copies own symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbols(source, object) {
	return copyObject(source, getSymbols(source), object);
}
//#endregion
//#region node_modules/lodash-es/_copySymbolsIn.js
/**
* Copies own and inherited symbols of `source` to `object`.
*
* @private
* @param {Object} source The object to copy symbols from.
* @param {Object} [object={}] The object to copy symbols to.
* @returns {Object} Returns `object`.
*/
function copySymbolsIn(source, object) {
	return copyObject(source, getSymbolsIn(source), object);
}
//#endregion
//#region node_modules/lodash-es/_initCloneArray.js
/** Used to check objects for own properties. */
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
/**
* Initializes an array clone.
*
* @private
* @param {Array} array The array to clone.
* @returns {Array} Returns the initialized clone.
*/
function initCloneArray(array) {
	var length = array.length, result = new array.constructor(length);
	if (length && typeof array[0] == "string" && hasOwnProperty$4.call(array, "index")) {
		result.index = array.index;
		result.input = array.input;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneArrayBuffer.js
/**
* Creates a clone of `arrayBuffer`.
*
* @private
* @param {ArrayBuffer} arrayBuffer The array buffer to clone.
* @returns {ArrayBuffer} Returns the cloned array buffer.
*/
function cloneArrayBuffer(arrayBuffer) {
	var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneDataView.js
/**
* Creates a clone of `dataView`.
*
* @private
* @param {Object} dataView The data view to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned data view.
*/
function cloneDataView(dataView, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
//#endregion
//#region node_modules/lodash-es/_cloneRegExp.js
/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
* Creates a clone of `regexp`.
*
* @private
* @param {Object} regexp The regexp to clone.
* @returns {Object} Returns the cloned regexp.
*/
function cloneRegExp(regexp) {
	var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}
//#endregion
//#region node_modules/lodash-es/_cloneSymbol.js
/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
/**
* Creates a clone of the `symbol` object.
*
* @private
* @param {Object} symbol The symbol object to clone.
* @returns {Object} Returns the cloned symbol object.
*/
function cloneSymbol(symbol) {
	return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
//#endregion
//#region node_modules/lodash-es/_cloneTypedArray.js
/**
* Creates a clone of `typedArray`.
*
* @private
* @param {Object} typedArray The typed array to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the cloned typed array.
*/
function cloneTypedArray(typedArray, isDeep) {
	var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
//#endregion
//#region node_modules/lodash-es/_initCloneByTag.js
/** `Object#toString` result references. */
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var mapTag$3 = "[object Map]";
var numberTag$1 = "[object Number]";
var regexpTag$1 = "[object RegExp]";
var setTag$3 = "[object Set]";
var stringTag$1 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var float32Tag$1 = "[object Float32Array]";
var float64Tag$1 = "[object Float64Array]";
var int8Tag$1 = "[object Int8Array]";
var int16Tag$1 = "[object Int16Array]";
var int32Tag$1 = "[object Int32Array]";
var uint8Tag$1 = "[object Uint8Array]";
var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
var uint16Tag$1 = "[object Uint16Array]";
var uint32Tag$1 = "[object Uint32Array]";
/**
* Initializes an object clone based on its `toStringTag`.
*
* **Note:** This function only supports cloning values with tags of
* `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
*
* @private
* @param {Object} object The object to clone.
* @param {string} tag The `toStringTag` of the object to clone.
* @param {boolean} [isDeep] Specify a deep clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneByTag(object, tag, isDeep) {
	var Ctor = object.constructor;
	switch (tag) {
		case arrayBufferTag$1: return cloneArrayBuffer(object);
		case boolTag$1:
		case dateTag$1: return new Ctor(+object);
		case dataViewTag$1: return cloneDataView(object, isDeep);
		case float32Tag$1:
		case float64Tag$1:
		case int8Tag$1:
		case int16Tag$1:
		case int32Tag$1:
		case uint8Tag$1:
		case uint8ClampedTag$1:
		case uint16Tag$1:
		case uint32Tag$1: return cloneTypedArray(object, isDeep);
		case mapTag$3: return new Ctor();
		case numberTag$1:
		case stringTag$1: return new Ctor(object);
		case regexpTag$1: return cloneRegExp(object);
		case setTag$3: return new Ctor();
		case symbolTag$1: return cloneSymbol(object);
	}
}
//#endregion
//#region node_modules/lodash-es/_initCloneObject.js
/**
* Initializes an object clone.
*
* @private
* @param {Object} object The object to clone.
* @returns {Object} Returns the initialized clone.
*/
function initCloneObject(object) {
	return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
//#endregion
//#region node_modules/lodash-es/_baseIsMap.js
/** `Object#toString` result references. */
var mapTag$2 = "[object Map]";
/**
* The base implementation of `_.isMap` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
*/
function baseIsMap(value) {
	return isObjectLike(value) && _getTag_default(value) == mapTag$2;
}
//#endregion
//#region node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil && nodeUtil.isMap;
/**
* Checks if `value` is classified as a `Map` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a map, else `false`.
* @example
*
* _.isMap(new Map);
* // => true
*
* _.isMap(new WeakMap);
* // => false
*/
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
//#endregion
//#region node_modules/lodash-es/_baseIsSet.js
/** `Object#toString` result references. */
var setTag$2 = "[object Set]";
/**
* The base implementation of `_.isSet` without Node.js optimizations.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
*/
function baseIsSet(value) {
	return isObjectLike(value) && _getTag_default(value) == setTag$2;
}
//#endregion
//#region node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil && nodeUtil.isSet;
/**
* Checks if `value` is classified as a `Set` object.
*
* @static
* @memberOf _
* @since 4.3.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a set, else `false`.
* @example
*
* _.isSet(new Set);
* // => true
*
* _.isSet(new WeakSet);
* // => false
*/
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
//#endregion
//#region node_modules/lodash-es/_baseClone.js
/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;
/** `Object#toString` result references. */
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag$1 = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag$1 = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag$1] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
/**
* The base implementation of `_.clone` and `_.cloneDeep` which tracks
* traversed objects.
*
* @private
* @param {*} value The value to clone.
* @param {boolean} bitmask The bitmask flags.
*  1 - Deep clone
*  2 - Flatten inherited properties
*  4 - Clone symbols
* @param {Function} [customizer] The function to customize cloning.
* @param {string} [key] The key of `value`.
* @param {Object} [object] The parent object of `value`.
* @param {Object} [stack] Tracks traversed objects and their clone counterparts.
* @returns {*} Returns the cloned value.
*/
function baseClone(value, bitmask, customizer, key, object, stack) {
	var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
	if (customizer) result = object ? customizer(value, key, object, stack) : customizer(value);
	if (result !== void 0) return result;
	if (!isObject(value)) return value;
	var isArr = isArray(value);
	if (isArr) {
		result = initCloneArray(value);
		if (!isDeep) return copyArray(value, result);
	} else {
		var tag = _getTag_default(value), isFunc = tag == funcTag || tag == genTag;
		if (isBuffer(value)) return cloneBuffer(value, isDeep);
		if (tag == objectTag || tag == argsTag || isFunc && !object) {
			result = isFlat || isFunc ? {} : initCloneObject(value);
			if (!isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
		} else {
			if (!cloneableTags[tag]) return object ? value : {};
			result = initCloneByTag(value, tag, isDeep);
		}
	}
	stack || (stack = new Stack());
	var stacked = stack.get(value);
	if (stacked) return stacked;
	stack.set(value, result);
	if (isSet(value)) value.forEach(function(subValue) {
		result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	});
	else if (isMap(value)) value.forEach(function(subValue, key) {
		result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	var props = isArr ? void 0 : (isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys)(value);
	arrayEach(props || value, function(subValue, key) {
		if (props) {
			key = subValue;
			subValue = value[key];
		}
		assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/clone.js
/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;
/**
* Creates a shallow clone of `value`.
*
* **Note:** This method is loosely based on the
* [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
* and supports cloning arrays, array buffers, booleans, date objects, maps,
* numbers, `Object` objects, regexes, sets, strings, symbols, and typed
* arrays. The own enumerable properties of `arguments` objects are cloned
* as plain objects. An empty object is returned for uncloneable values such
* as error objects, functions, DOM nodes, and WeakMaps.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to clone.
* @returns {*} Returns the cloned value.
* @see _.cloneDeep
* @example
*
* var objects = [{ 'a': 1 }, { 'b': 2 }];
*
* var shallow = _.clone(objects);
* console.log(shallow[0] === objects[0]);
* // => true
*/
function clone(value) {
	return baseClone(value, CLONE_SYMBOLS_FLAG);
}
//#endregion
//#region node_modules/lodash-es/compact.js
/**
* Creates an array with all falsey values removed. The values `false`, `null`,
* `0`, `""`, `undefined`, and `NaN` are falsey.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to compact.
* @returns {Array} Returns the new array of filtered values.
* @example
*
* _.compact([0, 1, false, 2, '', 3]);
* // => [1, 2, 3]
*/
function compact(array) {
	var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
	while (++index < length) {
		var value = array[index];
		if (value) result[resIndex++] = value;
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/_arrayAggregator.js
/**
* A specialized version of `baseAggregator` for arrays.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} setter The function to set `accumulator` values.
* @param {Function} iteratee The iteratee to transform keys.
* @param {Object} accumulator The initial aggregated object.
* @returns {Function} Returns `accumulator`.
*/
function arrayAggregator(array, setter, iteratee, accumulator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) {
		var value = array[index];
		setter(accumulator, value, iteratee(value), array);
	}
	return accumulator;
}
//#endregion
//#region node_modules/lodash-es/_baseAggregator.js
/**
* Aggregates elements of `collection` on `accumulator` with keys transformed
* by `iteratee` and values set by `setter`.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} setter The function to set `accumulator` values.
* @param {Function} iteratee The iteratee to transform keys.
* @param {Object} accumulator The initial aggregated object.
* @returns {Function} Returns `accumulator`.
*/
function baseAggregator(collection, setter, iteratee, accumulator) {
	baseEach(collection, function(value, key, collection) {
		setter(accumulator, value, iteratee(value), collection);
	});
	return accumulator;
}
//#endregion
//#region node_modules/lodash-es/_createAggregator.js
/**
* Creates a function like `_.groupBy`.
*
* @private
* @param {Function} setter The function to set accumulator values.
* @param {Function} [initializer] The accumulator object initializer.
* @returns {Function} Returns the new aggregator function.
*/
function createAggregator(setter, initializer) {
	return function(collection, iteratee) {
		var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
		return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
	};
}
//#endregion
//#region node_modules/lodash-es/defaults.js
/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto.hasOwnProperty;
/**
* Assigns own and inherited enumerable string keyed properties of source
* objects to the destination object for all destination properties that
* resolve to `undefined`. Source objects are applied from left to right.
* Once a property is set, additional values of the same property are ignored.
*
* **Note:** This method mutates `object`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The destination object.
* @param {...Object} [sources] The source objects.
* @returns {Object} Returns `object`.
* @see _.defaultsDeep
* @example
*
* _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
* // => { 'a': 1, 'b': 2 }
*/
var defaults = baseRest(function(object, sources) {
	object = Object(object);
	var index = -1;
	var length = sources.length;
	var guard = length > 2 ? sources[2] : void 0;
	if (guard && isIterateeCall(sources[0], sources[1], guard)) length = 1;
	while (++index < length) {
		var source = sources[index];
		var props = keysIn(source);
		var propsIndex = -1;
		var propsLength = props.length;
		while (++propsIndex < propsLength) {
			var key = props[propsIndex];
			var value = object[key];
			if (value === void 0 || eq(value, objectProto[key]) && !hasOwnProperty$3.call(object, key)) object[key] = source[key];
		}
	}
	return object;
});
//#endregion
//#region node_modules/lodash-es/isArrayLikeObject.js
/**
* This method is like `_.isArrayLike` except that it also checks if `value`
* is an object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array-like object,
*  else `false`.
* @example
*
* _.isArrayLikeObject([1, 2, 3]);
* // => true
*
* _.isArrayLikeObject(document.body.children);
* // => true
*
* _.isArrayLikeObject('abc');
* // => false
*
* _.isArrayLikeObject(_.noop);
* // => false
*/
function isArrayLikeObject(value) {
	return isObjectLike(value) && isArrayLike(value);
}
//#endregion
//#region node_modules/lodash-es/_arrayIncludesWith.js
/**
* This function is like `arrayIncludes` except that it accepts a comparator.
*
* @private
* @param {Array} [array] The array to inspect.
* @param {*} target The value to search for.
* @param {Function} comparator The comparator invoked per element.
* @returns {boolean} Returns `true` if `target` is found, else `false`.
*/
function arrayIncludesWith(array, value, comparator) {
	var index = -1, length = array == null ? 0 : array.length;
	while (++index < length) if (comparator(value, array[index])) return true;
	return false;
}
//#endregion
//#region node_modules/lodash-es/_baseDifference.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;
/**
* The base implementation of methods like `_.difference` without support
* for excluding multiple arrays or iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Array} values The values to exclude.
* @param {Function} [iteratee] The iteratee invoked per element.
* @param {Function} [comparator] The comparator invoked per element.
* @returns {Array} Returns the new array of filtered values.
*/
function baseDifference(array, values, iteratee, comparator) {
	var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
	if (!length) return result;
	if (iteratee) values = arrayMap(values, baseUnary(iteratee));
	if (comparator) {
		includes = arrayIncludesWith;
		isCommon = false;
	} else if (values.length >= LARGE_ARRAY_SIZE$1) {
		includes = cacheHas;
		isCommon = false;
		values = new SetCache(values);
	}
	outer: while (++index < length) {
		var value = array[index], computed = iteratee == null ? value : iteratee(value);
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var valuesIndex = valuesLength;
			while (valuesIndex--) if (values[valuesIndex] === computed) continue outer;
			result.push(value);
		} else if (!includes(values, computed, comparator)) result.push(value);
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/difference.js
/**
* Creates an array of `array` values not included in the other given arrays
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons. The order and references of result values are
* determined by the first array.
*
* **Note:** Unlike `_.pullAll`, this method returns a new array.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @param {...Array} [values] The values to exclude.
* @returns {Array} Returns the new array of filtered values.
* @see _.without, _.xor
* @example
*
* _.difference([2, 1], [2, 3]);
* // => [1]
*/
var difference = baseRest(function(array, values) {
	return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
});
//#endregion
//#region node_modules/lodash-es/last.js
/**
* Gets the last element of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to query.
* @returns {*} Returns the last element of `array`.
* @example
*
* _.last([1, 2, 3]);
* // => 3
*/
function last(array) {
	var length = array == null ? 0 : array.length;
	return length ? array[length - 1] : void 0;
}
//#endregion
//#region node_modules/lodash-es/drop.js
/**
* Creates a slice of `array` with `n` elements dropped from the beginning.
*
* @static
* @memberOf _
* @since 0.5.0
* @category Array
* @param {Array} array The array to query.
* @param {number} [n=1] The number of elements to drop.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {Array} Returns the slice of `array`.
* @example
*
* _.drop([1, 2, 3]);
* // => [2, 3]
*
* _.drop([1, 2, 3], 2);
* // => [3]
*
* _.drop([1, 2, 3], 5);
* // => []
*
* _.drop([1, 2, 3], 0);
* // => [1, 2, 3]
*/
function drop(array, n, guard) {
	var length = array == null ? 0 : array.length;
	if (!length) return [];
	n = guard || n === void 0 ? 1 : toInteger(n);
	return baseSlice(array, n < 0 ? 0 : n, length);
}
//#endregion
//#region node_modules/lodash-es/dropRight.js
/**
* Creates a slice of `array` with `n` elements dropped from the end.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Array
* @param {Array} array The array to query.
* @param {number} [n=1] The number of elements to drop.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {Array} Returns the slice of `array`.
* @example
*
* _.dropRight([1, 2, 3]);
* // => [1, 2]
*
* _.dropRight([1, 2, 3], 2);
* // => [1]
*
* _.dropRight([1, 2, 3], 5);
* // => []
*
* _.dropRight([1, 2, 3], 0);
* // => [1, 2, 3]
*/
function dropRight(array, n, guard) {
	var length = array == null ? 0 : array.length;
	if (!length) return [];
	n = guard || n === void 0 ? 1 : toInteger(n);
	n = length - n;
	return baseSlice(array, 0, n < 0 ? 0 : n);
}
//#endregion
//#region node_modules/lodash-es/_baseFilter.js
/**
* The base implementation of `_.filter` without support for iteratee shorthands.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} predicate The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
*/
function baseFilter(collection, predicate) {
	var result = [];
	baseEach(collection, function(value, index, collection) {
		if (predicate(value, index, collection)) result.push(value);
	});
	return result;
}
//#endregion
//#region node_modules/lodash-es/filter.js
/**
* Iterates over elements of `collection`, returning an array of all elements
* `predicate` returns truthy for. The predicate is invoked with three
* arguments: (value, index|key, collection).
*
* **Note:** Unlike `_.remove`, this method returns a new array.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
* @see _.reject
* @example
*
* var users = [
*   { 'user': 'barney', 'age': 36, 'active': true },
*   { 'user': 'fred',   'age': 40, 'active': false }
* ];
*
* _.filter(users, function(o) { return !o.active; });
* // => objects for ['fred']
*
* // The `_.matches` iteratee shorthand.
* _.filter(users, { 'age': 36, 'active': true });
* // => objects for ['barney']
*
* // The `_.matchesProperty` iteratee shorthand.
* _.filter(users, ['active', false]);
* // => objects for ['fred']
*
* // The `_.property` iteratee shorthand.
* _.filter(users, 'active');
* // => objects for ['barney']
*
* // Combining several predicates using `_.overEvery` or `_.overSome`.
* _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
* // => objects for ['fred', 'barney']
*/
function filter(collection, predicate) {
	return (isArray(collection) ? arrayFilter : baseFilter)(collection, baseIteratee(predicate, 3));
}
//#endregion
//#region node_modules/lodash-es/_createFind.js
/**
* Creates a `_.find` or `_.findLast` function.
*
* @private
* @param {Function} findIndexFunc The function to find the collection index.
* @returns {Function} Returns the new find function.
*/
function createFind(findIndexFunc) {
	return function(collection, predicate, fromIndex) {
		var iterable = Object(collection);
		if (!isArrayLike(collection)) {
			var iteratee = baseIteratee(predicate, 3);
			collection = keys(collection);
			predicate = function(key) {
				return iteratee(iterable[key], key, iterable);
			};
		}
		var index = findIndexFunc(collection, predicate, fromIndex);
		return index > -1 ? iterable[iteratee ? collection[index] : index] : void 0;
	};
}
//#endregion
//#region node_modules/lodash-es/findIndex.js
var nativeMax$1 = Math.max;
/**
* This method is like `_.find` except that it returns the index of the first
* element `predicate` returns truthy for instead of the element itself.
*
* @static
* @memberOf _
* @since 1.1.0
* @category Array
* @param {Array} array The array to inspect.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @param {number} [fromIndex=0] The index to search from.
* @returns {number} Returns the index of the found element, else `-1`.
* @example
*
* var users = [
*   { 'user': 'barney',  'active': false },
*   { 'user': 'fred',    'active': false },
*   { 'user': 'pebbles', 'active': true }
* ];
*
* _.findIndex(users, function(o) { return o.user == 'barney'; });
* // => 0
*
* // The `_.matches` iteratee shorthand.
* _.findIndex(users, { 'user': 'fred', 'active': false });
* // => 1
*
* // The `_.matchesProperty` iteratee shorthand.
* _.findIndex(users, ['active', false]);
* // => 0
*
* // The `_.property` iteratee shorthand.
* _.findIndex(users, 'active');
* // => 2
*/
function findIndex(array, predicate, fromIndex) {
	var length = array == null ? 0 : array.length;
	if (!length) return -1;
	var index = fromIndex == null ? 0 : toInteger(fromIndex);
	if (index < 0) index = nativeMax$1(length + index, 0);
	return baseFindIndex(array, baseIteratee(predicate, 3), index);
}
//#endregion
//#region node_modules/lodash-es/find.js
/**
* Iterates over elements of `collection`, returning the first element
* `predicate` returns truthy for. The predicate is invoked with three
* arguments: (value, index|key, collection).
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to inspect.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @param {number} [fromIndex=0] The index to search from.
* @returns {*} Returns the matched element, else `undefined`.
* @example
*
* var users = [
*   { 'user': 'barney',  'age': 36, 'active': true },
*   { 'user': 'fred',    'age': 40, 'active': false },
*   { 'user': 'pebbles', 'age': 1,  'active': true }
* ];
*
* _.find(users, function(o) { return o.age < 40; });
* // => object for 'barney'
*
* // The `_.matches` iteratee shorthand.
* _.find(users, { 'age': 1, 'active': true });
* // => object for 'pebbles'
*
* // The `_.matchesProperty` iteratee shorthand.
* _.find(users, ['active', false]);
* // => object for 'fred'
*
* // The `_.property` iteratee shorthand.
* _.find(users, 'active');
* // => object for 'barney'
*/
var find = createFind(findIndex);
//#endregion
//#region node_modules/lodash-es/head.js
/**
* Gets the first element of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @alias first
* @category Array
* @param {Array} array The array to query.
* @returns {*} Returns the first element of `array`.
* @example
*
* _.head([1, 2, 3]);
* // => 1
*
* _.head([]);
* // => undefined
*/
function head(array) {
	return array && array.length ? array[0] : void 0;
}
//#endregion
//#region node_modules/lodash-es/flatMap.js
/**
* Creates a flattened array of values by running each element in `collection`
* thru `iteratee` and flattening the mapped results. The iteratee is invoked
* with three arguments: (value, index|key, collection).
*
* @static
* @memberOf _
* @since 4.0.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new flattened array.
* @example
*
* function duplicate(n) {
*   return [n, n];
* }
*
* _.flatMap([1, 2], duplicate);
* // => [1, 1, 2, 2]
*/
function flatMap(collection, iteratee) {
	return baseFlatten(map(collection, iteratee), 1);
}
//#endregion
//#region node_modules/lodash-es/groupBy.js
/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
* Creates an object composed of keys generated from the results of running
* each element of `collection` thru `iteratee`. The order of grouped values
* is determined by the order they occur in `collection`. The corresponding
* value of each key is an array of elements responsible for generating the
* key. The iteratee is invoked with one argument: (value).
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The iteratee to transform keys.
* @returns {Object} Returns the composed aggregate object.
* @example
*
* _.groupBy([6.1, 4.2, 6.3], Math.floor);
* // => { '4': [4.2], '6': [6.1, 6.3] }
*
* // The `_.property` iteratee shorthand.
* _.groupBy(['one', 'two', 'three'], 'length');
* // => { '3': ['one', 'two'], '5': ['three'] }
*/
var groupBy = createAggregator(function(result, value, key) {
	if (hasOwnProperty$2.call(result, key)) result[key].push(value);
	else baseAssignValue(result, key, [value]);
});
//#endregion
//#region node_modules/lodash-es/_baseHas.js
/** Used to check objects for own properties. */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
* The base implementation of `_.has` without support for deep paths.
*
* @private
* @param {Object} [object] The object to query.
* @param {Array|string} key The key to check.
* @returns {boolean} Returns `true` if `key` exists, else `false`.
*/
function baseHas(object, key) {
	return object != null && hasOwnProperty$1.call(object, key);
}
//#endregion
//#region node_modules/lodash-es/has.js
/**
* Checks if `path` is a direct property of `object`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
* @example
*
* var object = { 'a': { 'b': 2 } };
* var other = _.create({ 'a': _.create({ 'b': 2 }) });
*
* _.has(object, 'a');
* // => true
*
* _.has(object, 'a.b');
* // => true
*
* _.has(object, ['a', 'b']);
* // => true
*
* _.has(other, 'a');
* // => false
*/
function has(object, path) {
	return object != null && hasPath(object, path, baseHas);
}
//#endregion
//#region node_modules/lodash-es/indexOf.js
var nativeMax = Math.max;
/**
* Gets the index at which the first occurrence of `value` is found in `array`
* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons. If `fromIndex` is negative, it's used as the
* offset from the end of `array`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @param {*} value The value to search for.
* @param {number} [fromIndex=0] The index to search from.
* @returns {number} Returns the index of the matched value, else `-1`.
* @example
*
* _.indexOf([1, 2, 1, 2], 2);
* // => 1
*
* // Search from the `fromIndex`.
* _.indexOf([1, 2, 1, 2], 2, 2);
* // => 3
*/
function indexOf(array, value, fromIndex) {
	var length = array == null ? 0 : array.length;
	if (!length) return -1;
	var index = fromIndex == null ? 0 : toInteger(fromIndex);
	if (index < 0) index = nativeMax(length + index, 0);
	return baseIndexOf(array, value, index);
}
//#endregion
//#region node_modules/lodash-es/isEmpty.js
/** `Object#toString` result references. */
var mapTag = "[object Map]";
var setTag = "[object Set]";
/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
* Checks if `value` is an empty object, collection, map, or set.
*
* Objects are considered empty if they have no own enumerable string keyed
* properties.
*
* Array-like values such as `arguments` objects, arrays, buffers, strings, or
* jQuery-like collections are considered empty if they have a `length` of `0`.
* Similarly, maps and sets are considered empty if they have a `size` of `0`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is empty, else `false`.
* @example
*
* _.isEmpty(null);
* // => true
*
* _.isEmpty(true);
* // => true
*
* _.isEmpty(1);
* // => true
*
* _.isEmpty([1, 2, 3]);
* // => false
*
* _.isEmpty({ 'a': 1 });
* // => false
*/
function isEmpty(value) {
	if (value == null) return true;
	if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length;
	var tag = _getTag_default(value);
	if (tag == mapTag || tag == setTag) return !value.size;
	if (isPrototype(value)) return !baseKeys(value).length;
	for (var key in value) if (hasOwnProperty.call(value, key)) return false;
	return true;
}
//#endregion
//#region node_modules/lodash-es/isUndefined.js
/**
* Checks if `value` is `undefined`.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
* @example
*
* _.isUndefined(void 0);
* // => true
*
* _.isUndefined(null);
* // => false
*/
function isUndefined(value) {
	return value === void 0;
}
//#endregion
//#region node_modules/lodash-es/negate.js
/** Error message constants. */
var FUNC_ERROR_TEXT = "Expected a function";
/**
* Creates a function that negates the result of the predicate `func`. The
* `func` predicate is invoked with the `this` binding and arguments of the
* created function.
*
* @static
* @memberOf _
* @since 3.0.0
* @category Function
* @param {Function} predicate The predicate to negate.
* @returns {Function} Returns the new negated function.
* @example
*
* function isEven(n) {
*   return n % 2 == 0;
* }
*
* _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
* // => [1, 3, 5]
*/
function negate(predicate) {
	if (typeof predicate != "function") throw new TypeError(FUNC_ERROR_TEXT);
	return function() {
		var args = arguments;
		switch (args.length) {
			case 0: return !predicate.call(this);
			case 1: return !predicate.call(this, args[0]);
			case 2: return !predicate.call(this, args[0], args[1]);
			case 3: return !predicate.call(this, args[0], args[1], args[2]);
		}
		return !predicate.apply(this, args);
	};
}
//#endregion
//#region node_modules/lodash-es/_baseReduce.js
/**
* The base implementation of `_.reduce` and `_.reduceRight`, without support
* for iteratee shorthands, which iterates over `collection` using `eachFunc`.
*
* @private
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {*} accumulator The initial value.
* @param {boolean} initAccum Specify using the first or last element of
*  `collection` as the initial value.
* @param {Function} eachFunc The function to iterate over `collection`.
* @returns {*} Returns the accumulated value.
*/
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	eachFunc(collection, function(value, index, collection) {
		accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
	});
	return accumulator;
}
//#endregion
//#region node_modules/lodash-es/reduce.js
/**
* Reduces `collection` to a value which is the accumulated result of running
* each element in `collection` thru `iteratee`, where each successive
* invocation is supplied the return value of the previous. If `accumulator`
* is not given, the first element of `collection` is used as the initial
* value. The iteratee is invoked with four arguments:
* (accumulator, value, index|key, collection).
*
* Many lodash methods are guarded to work as iteratees for methods like
* `_.reduce`, `_.reduceRight`, and `_.transform`.
*
* The guarded methods are:
* `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
* and `sortBy`
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [iteratee=_.identity] The function invoked per iteration.
* @param {*} [accumulator] The initial value.
* @returns {*} Returns the accumulated value.
* @see _.reduceRight
* @example
*
* _.reduce([1, 2], function(sum, n) {
*   return sum + n;
* }, 0);
* // => 3
*
* _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
*   (result[value] || (result[value] = [])).push(key);
*   return result;
* }, {});
* // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
*/
function reduce(collection, iteratee, accumulator) {
	var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
	return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
}
//#endregion
//#region node_modules/lodash-es/reject.js
/**
* The opposite of `_.filter`; this method returns the elements of `collection`
* that `predicate` does **not** return truthy for.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Collection
* @param {Array|Object} collection The collection to iterate over.
* @param {Function} [predicate=_.identity] The function invoked per iteration.
* @returns {Array} Returns the new filtered array.
* @see _.filter
* @example
*
* var users = [
*   { 'user': 'barney', 'age': 36, 'active': false },
*   { 'user': 'fred',   'age': 40, 'active': true }
* ];
*
* _.reject(users, function(o) { return !o.active; });
* // => objects for ['fred']
*
* // The `_.matches` iteratee shorthand.
* _.reject(users, { 'age': 40, 'active': true });
* // => objects for ['barney']
*
* // The `_.matchesProperty` iteratee shorthand.
* _.reject(users, ['active', false]);
* // => objects for ['fred']
*
* // The `_.property` iteratee shorthand.
* _.reject(users, 'active');
* // => objects for ['barney']
*/
function reject(collection, predicate) {
	return (isArray(collection) ? arrayFilter : baseFilter)(collection, negate(baseIteratee(predicate, 3)));
}
//#endregion
//#region node_modules/lodash-es/_createSet.js
/**
* Creates a set object of `values`.
*
* @private
* @param {Array} values The values to add to the set.
* @returns {Object} Returns the new set.
*/
var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == 1 / 0) ? noop : function(values) {
	return new Set(values);
};
//#endregion
//#region node_modules/lodash-es/_baseUniq.js
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/**
* The base implementation of `_.uniqBy` without support for iteratee shorthands.
*
* @private
* @param {Array} array The array to inspect.
* @param {Function} [iteratee] The iteratee invoked per element.
* @param {Function} [comparator] The comparator invoked per element.
* @returns {Array} Returns the new duplicate free array.
*/
function baseUniq(array, iteratee, comparator) {
	var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
	if (comparator) {
		isCommon = false;
		includes = arrayIncludesWith;
	} else if (length >= LARGE_ARRAY_SIZE) {
		var set = iteratee ? null : createSet(array);
		if (set) return setToArray(set);
		isCommon = false;
		includes = cacheHas;
		seen = new SetCache();
	} else seen = iteratee ? [] : result;
	outer: while (++index < length) {
		var value = array[index], computed = iteratee ? iteratee(value) : value;
		value = comparator || value !== 0 ? value : 0;
		if (isCommon && computed === computed) {
			var seenIndex = seen.length;
			while (seenIndex--) if (seen[seenIndex] === computed) continue outer;
			if (iteratee) seen.push(computed);
			result.push(value);
		} else if (!includes(seen, computed, comparator)) {
			if (seen !== result) seen.push(computed);
			result.push(value);
		}
	}
	return result;
}
//#endregion
//#region node_modules/lodash-es/uniq.js
/**
* Creates a duplicate-free version of an array, using
* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
* for equality comparisons, in which only the first occurrence of each element
* is kept. The order of result values is determined by the order they occur
* in the array.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to inspect.
* @returns {Array} Returns the new duplicate free array.
* @example
*
* _.uniq([2, 1, 2]);
* // => [2, 1]
*/
function uniq(array) {
	return array && array.length ? baseUniq(array) : [];
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/rest.js
/**
*  A Grammar Walker that computes the "remaining" grammar "after" a productions in the grammar.
*/
var RestWalker = class {
	walk(prod, prevRest = []) {
		forEach(prod.definition, (subProd, index) => {
			const currRest = drop(prod.definition, index + 1);
			/* istanbul ignore else */
			if (subProd instanceof NonTerminal) this.walkProdRef(subProd, currRest, prevRest);
			else if (subProd instanceof Terminal) this.walkTerminal(subProd, currRest, prevRest);
			else if (subProd instanceof Alternative) this.walkFlat(subProd, currRest, prevRest);
			else if (subProd instanceof Option) this.walkOption(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionMandatory) this.walkAtLeastOne(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionMandatoryWithSeparator) this.walkAtLeastOneSep(subProd, currRest, prevRest);
			else if (subProd instanceof RepetitionWithSeparator) this.walkManySep(subProd, currRest, prevRest);
			else if (subProd instanceof Repetition) this.walkMany(subProd, currRest, prevRest);
			else if (subProd instanceof Alternation) this.walkOr(subProd, currRest, prevRest);
			else throw Error("non exhaustive match");
		});
	}
	walkTerminal(terminal, currRest, prevRest) {}
	walkProdRef(refProd, currRest, prevRest) {}
	walkFlat(flatProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		this.walk(flatProd, fullOrRest);
	}
	walkOption(optionProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		this.walk(optionProd, fullOrRest);
	}
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		const fullAtLeastOneRest = [new Option({ definition: atLeastOneProd.definition })].concat(currRest, prevRest);
		this.walk(atLeastOneProd, fullAtLeastOneRest);
	}
	walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
		const fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
		this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
	}
	walkMany(manyProd, currRest, prevRest) {
		const fullManyRest = [new Option({ definition: manyProd.definition })].concat(currRest, prevRest);
		this.walk(manyProd, fullManyRest);
	}
	walkManySep(manySepProd, currRest, prevRest) {
		const fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
		this.walk(manySepProd, fullManySepRest);
	}
	walkOr(orProd, currRest, prevRest) {
		const fullOrRest = currRest.concat(prevRest);
		forEach(orProd.definition, (alt) => {
			const prodWrapper = new Alternative({ definition: [alt] });
			this.walk(prodWrapper, fullOrRest);
		});
	}
};
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
	return [new Option({ definition: [new Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition) })].concat(currRest, prevRest);
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/first.js
function first(prod) {
	/* istanbul ignore else */
	if (prod instanceof NonTerminal) return first(prod.referencedRule);
	else if (prod instanceof Terminal) return firstForTerminal(prod);
	else if (isSequenceProd(prod)) return firstForSequence(prod);
	else if (isBranchingProd(prod)) return firstForBranching(prod);
	else throw Error("non exhaustive match");
}
function firstForSequence(prod) {
	let firstSet = [];
	const seq = prod.definition;
	let nextSubProdIdx = 0;
	let hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	let currSubProd;
	let isLastInnerProdOptional = true;
	while (hasInnerProdsRemaining && isLastInnerProdOptional) {
		currSubProd = seq[nextSubProdIdx];
		isLastInnerProdOptional = isOptionalProd(currSubProd);
		firstSet = firstSet.concat(first(currSubProd));
		nextSubProdIdx = nextSubProdIdx + 1;
		hasInnerProdsRemaining = seq.length > nextSubProdIdx;
	}
	return uniq(firstSet);
}
function firstForBranching(prod) {
	return uniq(flatten(map(prod.definition, (innerProd) => {
		return first(innerProd);
	})));
}
function firstForTerminal(terminal) {
	return [terminal.terminalType];
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/constants.js
var IN = "_~IN~_";
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/follow.js
var ResyncFollowsWalker = class extends RestWalker {
	constructor(topProd) {
		super();
		this.topProd = topProd;
		this.follows = {};
	}
	startWalking() {
		this.walk(this.topProd);
		return this.follows;
	}
	walkTerminal(terminal, currRest, prevRest) {}
	walkProdRef(refProd, currRest, prevRest) {
		const followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
		const fullRest = currRest.concat(prevRest);
		const t_in_topProd_follows = first(new Alternative({ definition: fullRest }));
		this.follows[followName] = t_in_topProd_follows;
	}
};
function computeAllProdsFollows(topProductions) {
	const reSyncFollows = {};
	forEach(topProductions, (topProd) => {
		const currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
		assign(reSyncFollows, currRefsFollow);
	});
	return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
	return inner.name + occurenceInParent + IN;
}
//#endregion
//#region node_modules/chevrotain/lib/src/scan/reg_exp_parser.js
var regExpAstCache = {};
var regExpParser = new RegExpParser();
function getRegExpAst(regExp) {
	const regExpStr = regExp.toString();
	if (regExpAstCache.hasOwnProperty(regExpStr)) return regExpAstCache[regExpStr];
	else {
		const regExpAst = regExpParser.pattern(regExpStr);
		regExpAstCache[regExpStr] = regExpAst;
		return regExpAst;
	}
}
function clearRegExpParserCache() {
	regExpAstCache = {};
}
//#endregion
//#region node_modules/chevrotain/lib/src/scan/reg_exp.js
var complementErrorMessage = "Complement Sets are not supported for first char optimization";
var failedOptimizationPrefixMsg = "Unable to use \"first char\" lexer optimizations:\n";
function getOptimizedStartCodesIndices(regExp, ensureOptimizations = false) {
	try {
		const ast = getRegExpAst(regExp);
		return firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
	} catch (e) {
		/* istanbul ignore next */
		if (e.message === complementErrorMessage) {
			if (ensureOptimizations) PRINT_WARNING(`${failedOptimizationPrefixMsg}\tUnable to optimize: < ${regExp.toString()} >\n	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
		} else {
			let msgSuffix = "";
			if (ensureOptimizations) msgSuffix = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
			PRINT_ERROR(`${failedOptimizationPrefixMsg}\n\tFailed parsing: < ${regExp.toString()} >\n\tUsing the @chevrotain/regexp-to-ast library\n	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + msgSuffix);
		}
	}
	return [];
}
function firstCharOptimizedIndices(ast, result, ignoreCase) {
	switch (ast.type) {
		case "Disjunction":
			for (let i = 0; i < ast.value.length; i++) firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
			break;
		case "Alternative":
			const terms = ast.value;
			for (let i = 0; i < terms.length; i++) {
				const term = terms[i];
				switch (term.type) {
					case "EndAnchor":
					case "GroupBackReference":
					case "Lookahead":
					case "NegativeLookahead":
					case "Lookbehind":
					case "NegativeLookbehind":
					case "StartAnchor":
					case "WordBoundary":
					case "NonWordBoundary": continue;
				}
				const atom = term;
				switch (atom.type) {
					case "Character":
						addOptimizedIdxToResult(atom.value, result, ignoreCase);
						break;
					case "Set":
						if (atom.complement === true) throw Error(complementErrorMessage);
						forEach(atom.value, (code) => {
							if (typeof code === "number") addOptimizedIdxToResult(code, result, ignoreCase);
							else {
								const range = code;
								if (ignoreCase === true) for (let rangeCode = range.from; rangeCode <= range.to; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
								else {
									for (let rangeCode = range.from; rangeCode <= range.to && rangeCode < 256; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
									if (range.to >= 256) {
										const minUnOptVal = range.from >= 256 ? range.from : 256;
										const maxUnOptVal = range.to;
										const minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
										const maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
										for (let currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) result[currOptIdx] = currOptIdx;
									}
								}
							}
						});
						break;
					case "Group":
						firstCharOptimizedIndices(atom.value, result, ignoreCase);
						break;
					/* istanbul ignore next */
					default: throw Error("Non Exhaustive Match");
				}
				const isOptionalQuantifier = atom.quantifier !== void 0 && atom.quantifier.atLeast === 0;
				if (atom.type === "Group" && isWholeOptional(atom) === false || atom.type !== "Group" && isOptionalQuantifier === false) break;
			}
			break;
		/* istanbul ignore next */
		default: throw Error("non exhaustive match!");
	}
	return values(result);
}
function addOptimizedIdxToResult(code, result, ignoreCase) {
	const optimizedCharIdx = charCodeToOptimizedIndex(code);
	result[optimizedCharIdx] = optimizedCharIdx;
	if (ignoreCase === true) handleIgnoreCase(code, result);
}
function handleIgnoreCase(code, result) {
	const char = String.fromCharCode(code);
	const upperChar = char.toUpperCase();
	/* istanbul ignore else */
	if (upperChar !== char) {
		const optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
		result[optimizedCharIdx] = optimizedCharIdx;
	} else {
		const lowerChar = char.toLowerCase();
		if (lowerChar !== char) {
			const optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
			result[optimizedCharIdx] = optimizedCharIdx;
		}
	}
}
function findCode(setNode, targetCharCodes) {
	return find(setNode.value, (codeOrRange) => {
		if (typeof codeOrRange === "number") return includes(targetCharCodes, codeOrRange);
		else {
			const range = codeOrRange;
			return find(targetCharCodes, (targetCode) => range.from <= targetCode && targetCode <= range.to) !== void 0;
		}
	});
}
function isWholeOptional(ast) {
	const quantifier = ast.quantifier;
	if (quantifier && quantifier.atLeast === 0) return true;
	if (!ast.value) return false;
	return isArray(ast.value) ? every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
}
var CharCodeFinder = class extends BaseRegExpVisitor {
	constructor(targetCharCodes) {
		super();
		this.targetCharCodes = targetCharCodes;
		this.found = false;
	}
	visitChildren(node) {
		if (this.found === true) return;
		switch (node.type) {
			case "Lookahead":
				this.visitLookahead(node);
				return;
			case "NegativeLookahead":
				this.visitNegativeLookahead(node);
				return;
			case "Lookbehind":
				this.visitLookbehind(node);
				return;
			case "NegativeLookbehind":
				this.visitNegativeLookbehind(node);
				return;
		}
		super.visitChildren(node);
	}
	visitCharacter(node) {
		if (includes(this.targetCharCodes, node.value)) this.found = true;
	}
	visitSet(node) {
		if (node.complement) {
			if (findCode(node, this.targetCharCodes) === void 0) this.found = true;
		} else if (findCode(node, this.targetCharCodes) !== void 0) this.found = true;
	}
};
function canMatchCharCode(charCodes, pattern) {
	if (pattern instanceof RegExp) {
		const ast = getRegExpAst(pattern);
		const charCodeFinder = new CharCodeFinder(charCodes);
		charCodeFinder.visit(ast);
		return charCodeFinder.found;
	} else return find(pattern, (char) => {
		return includes(charCodes, char.charCodeAt(0));
	}) !== void 0;
}
//#endregion
//#region node_modules/chevrotain/lib/src/scan/lexer.js
var PATTERN = "PATTERN";
var DEFAULT_MODE = "defaultMode";
function analyzeTokenTypes(tokenTypes, options) {
	options = defaults(options, {
		debug: false,
		safeMode: false,
		positionTracking: "full",
		lineTerminatorCharacters: ["\r", "\n"],
		tracer: (msg, action) => action()
	});
	const tracer = options.tracer;
	tracer("initCharCodeToOptimizedIndexMap", () => {
		initCharCodeToOptimizedIndexMap();
	});
	let onlyRelevantTypes;
	tracer("Reject Lexer.NA", () => {
		onlyRelevantTypes = reject(tokenTypes, (currType) => {
			return currType[PATTERN] === Lexer.NA;
		});
	});
	let hasCustom = false;
	let allTransformedPatterns;
	tracer("Transform Patterns", () => {
		hasCustom = false;
		allTransformedPatterns = map(onlyRelevantTypes, (currType) => {
			const currPattern = currType[PATTERN];
			/* istanbul ignore else */
			if (isRegExp(currPattern)) {
				const regExpSource = currPattern.source;
				if (regExpSource.length === 1 && regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) return regExpSource;
				else if (regExpSource.length === 2 && regExpSource[0] === "\\" && !includes([
					"d",
					"D",
					"s",
					"S",
					"t",
					"r",
					"n",
					"t",
					"0",
					"c",
					"b",
					"B",
					"f",
					"v",
					"w",
					"W"
				], regExpSource[1])) return regExpSource[1];
				else return addStickyFlag(currPattern);
			} else if (isFunction(currPattern)) {
				hasCustom = true;
				return { exec: currPattern };
			} else if (typeof currPattern === "object") {
				hasCustom = true;
				return currPattern;
			} else if (typeof currPattern === "string") {
				if (currPattern.length === 1) return currPattern;
				else {
					const escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
					return addStickyFlag(new RegExp(escapedRegExpString));
				}
			} else throw Error("non exhaustive match");
		});
	});
	let patternIdxToType;
	let patternIdxToGroup;
	let patternIdxToLongerAltIdxArr;
	let patternIdxToPushMode;
	let patternIdxToPopMode;
	tracer("misc mapping", () => {
		patternIdxToType = map(onlyRelevantTypes, (currType) => currType.tokenTypeIdx);
		patternIdxToGroup = map(onlyRelevantTypes, (clazz) => {
			const groupName = clazz.GROUP;
			/* istanbul ignore next */
			if (groupName === Lexer.SKIPPED) return;
			else if (isString(groupName)) return groupName;
			else if (isUndefined(groupName)) return false;
			else throw Error("non exhaustive match");
		});
		patternIdxToLongerAltIdxArr = map(onlyRelevantTypes, (clazz) => {
			const longerAltType = clazz.LONGER_ALT;
			if (longerAltType) return isArray(longerAltType) ? map(longerAltType, (type) => indexOf(onlyRelevantTypes, type)) : [indexOf(onlyRelevantTypes, longerAltType)];
		});
		patternIdxToPushMode = map(onlyRelevantTypes, (clazz) => clazz.PUSH_MODE);
		patternIdxToPopMode = map(onlyRelevantTypes, (clazz) => has(clazz, "POP_MODE"));
	});
	let patternIdxToCanLineTerminator;
	tracer("Line Terminator Handling", () => {
		const lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
		patternIdxToCanLineTerminator = map(onlyRelevantTypes, (tokType) => false);
		if (options.positionTracking !== "onlyOffset") patternIdxToCanLineTerminator = map(onlyRelevantTypes, (tokType) => {
			if (has(tokType, "LINE_BREAKS")) return !!tokType.LINE_BREAKS;
			else return checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false && canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		});
	});
	let patternIdxToIsCustom;
	let patternIdxToShort;
	let emptyGroups;
	let patternIdxToConfig;
	tracer("Misc Mapping #2", () => {
		patternIdxToIsCustom = map(onlyRelevantTypes, isCustomPattern);
		patternIdxToShort = map(allTransformedPatterns, isShortPattern);
		emptyGroups = reduce(onlyRelevantTypes, (acc, clazz) => {
			const groupName = clazz.GROUP;
			if (isString(groupName) && !(groupName === Lexer.SKIPPED)) acc[groupName] = [];
			return acc;
		}, {});
		patternIdxToConfig = map(allTransformedPatterns, (x, idx) => {
			return {
				pattern: allTransformedPatterns[idx],
				longerAlt: patternIdxToLongerAltIdxArr[idx],
				canLineTerminator: patternIdxToCanLineTerminator[idx],
				isCustom: patternIdxToIsCustom[idx],
				short: patternIdxToShort[idx],
				group: patternIdxToGroup[idx],
				push: patternIdxToPushMode[idx],
				pop: patternIdxToPopMode[idx],
				tokenTypeIdx: patternIdxToType[idx],
				tokenType: onlyRelevantTypes[idx]
			};
		});
	});
	let canBeOptimized = true;
	let charCodeToPatternIdxToConfig = [];
	if (!options.safeMode) tracer("First Char Optimization", () => {
		charCodeToPatternIdxToConfig = reduce(onlyRelevantTypes, (result, currTokType, idx) => {
			if (typeof currTokType.PATTERN === "string") addToMapOfArrays(result, charCodeToOptimizedIndex(currTokType.PATTERN.charCodeAt(0)), patternIdxToConfig[idx]);
			else if (isArray(currTokType.START_CHARS_HINT)) {
				let lastOptimizedIdx;
				forEach(currTokType.START_CHARS_HINT, (charOrInt) => {
					const currOptimizedIdx = charCodeToOptimizedIndex(typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt);
					/* istanbul ignore else */
					if (lastOptimizedIdx !== currOptimizedIdx) {
						lastOptimizedIdx = currOptimizedIdx;
						addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
					}
				});
			} else if (isRegExp(currTokType.PATTERN)) {
				if (currTokType.PATTERN.unicode) {
					canBeOptimized = false;
					if (options.ensureOptimizations) PRINT_ERROR(`${failedOptimizationPrefixMsg}\tUnable to analyze < ${currTokType.PATTERN.toString()} > pattern.\n	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
				} else {
					const optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
					/* istanbul ignore if */
					if (isEmpty(optimizedCodes)) canBeOptimized = false;
					forEach(optimizedCodes, (code) => {
						addToMapOfArrays(result, code, patternIdxToConfig[idx]);
					});
				}
			} else {
				if (options.ensureOptimizations) PRINT_ERROR(`${failedOptimizationPrefixMsg}\tTokenType: <${currTokType.name}> is using a custom token pattern without providing <start_chars_hint> parameter.\n	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`);
				canBeOptimized = false;
			}
			return result;
		}, []);
	});
	return {
		emptyGroups,
		patternIdxToConfig,
		charCodeToPatternIdxToConfig,
		hasCustom,
		canBeOptimized
	};
}
function validatePatterns(tokenTypes, validModesNames) {
	let errors = [];
	const missingResult = findMissingPatterns(tokenTypes);
	errors = errors.concat(missingResult.errors);
	const invalidResult = findInvalidPatterns(missingResult.valid);
	const validTokenTypes = invalidResult.valid;
	errors = errors.concat(invalidResult.errors);
	errors = errors.concat(validateRegExpPattern(validTokenTypes));
	errors = errors.concat(findInvalidGroupType(validTokenTypes));
	errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
	errors = errors.concat(findUnreachablePatterns(validTokenTypes));
	return errors;
}
function validateRegExpPattern(tokenTypes) {
	let errors = [];
	const withRegExpPatterns = filter(tokenTypes, (currTokType) => isRegExp(currTokType[PATTERN]));
	errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
	errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
	errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
	errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
	return errors;
}
function findMissingPatterns(tokenTypes) {
	const tokenTypesWithMissingPattern = filter(tokenTypes, (currType) => {
		return !has(currType, PATTERN);
	});
	return {
		errors: map(tokenTypesWithMissingPattern, (currType) => {
			return {
				message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
				type: LexerDefinitionErrorType.MISSING_PATTERN,
				tokenTypes: [currType]
			};
		}),
		valid: difference(tokenTypes, tokenTypesWithMissingPattern)
	};
}
function findInvalidPatterns(tokenTypes) {
	const tokenTypesWithInvalidPattern = filter(tokenTypes, (currType) => {
		const pattern = currType[PATTERN];
		return !isRegExp(pattern) && !isFunction(pattern) && !has(pattern, "exec") && !isString(pattern);
	});
	return {
		errors: map(tokenTypesWithInvalidPattern, (currType) => {
			return {
				message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
				type: LexerDefinitionErrorType.INVALID_PATTERN,
				tokenTypes: [currType]
			};
		}),
		valid: difference(tokenTypes, tokenTypesWithInvalidPattern)
	};
}
var end_of_input = /[^\\][$]/;
function findEndOfInputAnchor(tokenTypes) {
	class EndAnchorFinder extends BaseRegExpVisitor {
		constructor() {
			super(...arguments);
			this.found = false;
		}
		visitEndAnchor(node) {
			this.found = true;
		}
	}
	const invalidRegex = filter(tokenTypes, (currType) => {
		const pattern = currType.PATTERN;
		try {
			const regexpAst = getRegExpAst(pattern);
			const endAnchorVisitor = new EndAnchorFinder();
			endAnchorVisitor.visit(regexpAst);
			return endAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return end_of_input.test(pattern.source);
		}
	});
	return map(invalidRegex, (currType) => {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findEmptyMatchRegExps(tokenTypes) {
	const matchesEmptyString = filter(tokenTypes, (currType) => {
		return currType.PATTERN.test("");
	});
	return map(matchesEmptyString, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
			type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
			tokenTypes: [currType]
		};
	});
}
var start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
	class StartAnchorFinder extends BaseRegExpVisitor {
		constructor() {
			super(...arguments);
			this.found = false;
		}
		visitStartAnchor(node) {
			this.found = true;
		}
	}
	const invalidRegex = filter(tokenTypes, (currType) => {
		const pattern = currType.PATTERN;
		try {
			const regexpAst = getRegExpAst(pattern);
			const startAnchorVisitor = new StartAnchorFinder();
			startAnchorVisitor.visit(regexpAst);
			return startAnchorVisitor.found;
		} catch (e) {
			/* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
			return start_of_input.test(pattern.source);
		}
	});
	return map(invalidRegex, (currType) => {
		return {
			message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
			type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findUnsupportedFlags(tokenTypes) {
	const invalidFlags = filter(tokenTypes, (currType) => {
		const pattern = currType[PATTERN];
		return pattern instanceof RegExp && (pattern.multiline || pattern.global);
	});
	return map(invalidFlags, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
			type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findDuplicatePatterns(tokenTypes) {
	const found = [];
	let identicalPatterns = map(tokenTypes, (outerType) => {
		return reduce(tokenTypes, (result, innerType) => {
			if (outerType.PATTERN.source === innerType.PATTERN.source && !includes(found, innerType) && innerType.PATTERN !== Lexer.NA) {
				found.push(innerType);
				result.push(innerType);
				return result;
			}
			return result;
		}, []);
	});
	identicalPatterns = compact(identicalPatterns);
	const duplicatePatterns = filter(identicalPatterns, (currIdenticalSet) => {
		return currIdenticalSet.length > 1;
	});
	return map(duplicatePatterns, (setOfIdentical) => {
		const tokenTypeNames = map(setOfIdentical, (currType) => {
			return currType.name;
		});
		return {
			message: `The same RegExp pattern ->${head(setOfIdentical).PATTERN}<-has been used in all of the following Token Types: ${tokenTypeNames.join(", ")} <-`,
			type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
			tokenTypes: setOfIdentical
		};
	});
}
function findInvalidGroupType(tokenTypes) {
	const invalidTypes = filter(tokenTypes, (clazz) => {
		if (!has(clazz, "GROUP")) return false;
		const group = clazz.GROUP;
		return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString(group);
	});
	return map(invalidTypes, (currType) => {
		return {
			message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
			type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
			tokenTypes: [currType]
		};
	});
}
function findModesThatDoNotExist(tokenTypes, validModes) {
	const invalidModes = filter(tokenTypes, (clazz) => {
		return clazz.PUSH_MODE !== void 0 && !includes(validModes, clazz.PUSH_MODE);
	});
	return map(invalidModes, (tokType) => {
		return {
			message: `Token Type: ->${tokType.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${tokType.PUSH_MODE}<-which does not exist`,
			type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
			tokenTypes: [tokType]
		};
	});
}
function findUnreachablePatterns(tokenTypes) {
	const errors = [];
	const canBeTested = reduce(tokenTypes, (result, tokType, idx) => {
		const pattern = tokType.PATTERN;
		if (pattern === Lexer.NA) return result;
		if (isString(pattern)) result.push({
			str: pattern,
			idx,
			tokenType: tokType
		});
		else if (isRegExp(pattern) && noMetaChar(pattern)) result.push({
			str: pattern.source,
			idx,
			tokenType: tokType
		});
		return result;
	}, []);
	forEach(tokenTypes, (aTokType, aIdx) => {
		forEach(canBeTested, ({ str: bStr, idx: bIdx, tokenType: bTokType }) => {
			if (aIdx < bIdx && tryToMatchStrToPattern(bStr, aTokType.PATTERN)) {
				const msg = `Token: ->${bTokType.name}<- can never be matched.\nBecause it appears AFTER the Token Type ->${aTokType.name}<-in the lexer's definition.\nSee https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
				errors.push({
					message: msg,
					type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
					tokenTypes: [aTokType, bTokType]
				});
			}
		});
	});
	return errors;
}
function tryToMatchStrToPattern(str, pattern) {
	if (isRegExp(pattern)) {
		if (usesLookAheadOrBehind(pattern)) return false;
		const regExpArray = pattern.exec(str);
		return regExpArray !== null && regExpArray.index === 0;
	} else if (isFunction(pattern)) return pattern(str, 0, [], {});
	else if (has(pattern, "exec")) return pattern.exec(str, 0, [], {});
	else if (typeof pattern === "string") return pattern === str;
	else throw Error("non exhaustive match");
}
function noMetaChar(regExp) {
	return find([
		".",
		"\\",
		"[",
		"]",
		"|",
		"^",
		"$",
		"(",
		")",
		"?",
		"*",
		"+",
		"{"
	], (char) => regExp.source.indexOf(char) !== -1) === void 0;
}
function usesLookAheadOrBehind(regExp) {
	return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(regExp.source);
}
function addStickyFlag(pattern) {
	const flags = pattern.ignoreCase ? "iy" : "y";
	return new RegExp(`${pattern.source}`, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	const errors = [];
	if (!has(lexerDefinition, "defaultMode")) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <defaultMode> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
	});
	if (!has(lexerDefinition, "modes")) errors.push({
		message: "A MultiMode Lexer cannot be initialized without a <modes> property in its definition\n",
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
	});
	if (has(lexerDefinition, "modes") && has(lexerDefinition, "defaultMode") && !has(lexerDefinition.modes, lexerDefinition.defaultMode)) errors.push({
		message: `A MultiMode Lexer cannot be initialized with a ${DEFAULT_MODE}: <${lexerDefinition.defaultMode}>which does not exist\n`,
		type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
	});
	if (has(lexerDefinition, "modes")) forEach(lexerDefinition.modes, (currModeValue, currModeName) => {
		forEach(currModeValue, (currTokType, currIdx) => {
			if (isUndefined(currTokType)) errors.push({
				message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${currModeName}> at index: <${currIdx}>\n`,
				type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
			});
			else if (has(currTokType, "LONGER_ALT")) {
				const longerAlt = isArray(currTokType.LONGER_ALT) ? currTokType.LONGER_ALT : [currTokType.LONGER_ALT];
				forEach(longerAlt, (currLongerAlt) => {
					if (!isUndefined(currLongerAlt) && !includes(currModeValue, currLongerAlt)) errors.push({
						message: `A MultiMode Lexer cannot be initialized with a longer_alt <${currLongerAlt.name}> on token <${currTokType.name}> outside of mode <${currModeName}>\n`,
						type: LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
					});
				});
			}
		});
	});
	return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
	const warnings = [];
	let hasAnyLineBreak = false;
	const concreteTokenTypes = reject(compact(flatten(values(lexerDefinition.modes))), (currType) => currType[PATTERN] === Lexer.NA);
	const terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
	if (trackLines) forEach(concreteTokenTypes, (tokType) => {
		const currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
		if (currIssue !== false) {
			const warningDescriptor = {
				message: buildLineBreakIssueMessage(tokType, currIssue),
				type: currIssue.issue,
				tokenType: tokType
			};
			warnings.push(warningDescriptor);
		} else if (has(tokType, "LINE_BREAKS")) {
			if (tokType.LINE_BREAKS === true) hasAnyLineBreak = true;
		} else if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) hasAnyLineBreak = true;
	});
	if (trackLines && !hasAnyLineBreak) warnings.push({
		message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
		type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
	});
	return warnings;
}
function cloneEmptyGroups(emptyGroups) {
	const clonedResult = {};
	const groupKeys = keys(emptyGroups);
	forEach(groupKeys, (currKey) => {
		const currGroupValue = emptyGroups[currKey];
		/* istanbul ignore else */
		if (isArray(currGroupValue)) clonedResult[currKey] = [];
		else throw Error("non exhaustive match");
	});
	return clonedResult;
}
function isCustomPattern(tokenType) {
	const pattern = tokenType.PATTERN;
	/* istanbul ignore else */
	if (isRegExp(pattern)) return false;
	else if (isFunction(pattern)) return true;
	else if (has(pattern, "exec")) return true;
	else if (isString(pattern)) return false;
	else throw Error("non exhaustive match");
}
function isShortPattern(pattern) {
	if (isString(pattern) && pattern.length === 1) return pattern.charCodeAt(0);
	else return false;
}
/**
* Faster than using a RegExp for default newline detection during lexing.
*/
var LineTerminatorOptimizedTester = {
	test: function(text) {
		const len = text.length;
		for (let i = this.lastIndex; i < len; i++) {
			const c = text.charCodeAt(i);
			if (c === 10) {
				this.lastIndex = i + 1;
				return true;
			} else if (c === 13) {
				if (text.charCodeAt(i + 1) === 10) this.lastIndex = i + 2;
				else this.lastIndex = i + 1;
				return true;
			}
		}
		return false;
	},
	lastIndex: 0
};
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
	if (has(tokType, "LINE_BREAKS")) return false;
	else if (isRegExp(tokType.PATTERN)) {
		try {
			canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
		} catch (e) {
			/* istanbul ignore next - to test this we would have to mock <canMatchCharCode> to throw an error */
			return {
				issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
				errMsg: e.message
			};
		}
		return false;
	} else if (isString(tokType.PATTERN)) return false;
	else if (isCustomPattern(tokType)) return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
	else throw Error("non exhaustive match");
}
function buildLineBreakIssueMessage(tokType, details) {
	/* istanbul ignore else */
	if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
\tThe problem is in the <${tokType.name}> Token Type\n\t Root cause: ${details.errMsg}.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
	else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
\tThe problem is in the <${tokType.name}> Token Type\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
	else throw Error("non exhaustive match");
}
function getCharCodes(charsOrCodes) {
	return map(charsOrCodes, (numOrString) => {
		if (isString(numOrString)) return numOrString.charCodeAt(0);
		else return numOrString;
	});
}
function addToMapOfArrays(map, key, value) {
	if (map[key] === void 0) map[key] = [value];
	else map[key].push(value);
}
/**
* We are mapping charCode above ASCI (256) into buckets each in the size of 256.
* This is because ASCI are the most common start chars so each one of those will get its own
* possible token configs vector.
*
* Tokens starting with charCodes "above" ASCI are uncommon, so we can "afford"
* to place these into buckets of possible token configs, What we gain from
* this is avoiding the case of creating an optimization 'charCodeToPatternIdxToConfig'
* which would contain 10,000+ arrays of small size (e.g unicode Identifiers scenario).
* Our 'charCodeToPatternIdxToConfig' max size will now be:
* 256 + (2^16 / 2^8) - 1 === 511
*
* note the hack for fast division integer part extraction
* See: https://stackoverflow.com/a/4228528
*/
var charCodeToOptimizedIdxMap = [];
function charCodeToOptimizedIndex(charCode) {
	return charCode < 256 ? charCode : charCodeToOptimizedIdxMap[charCode];
}
/**
* This is a compromise between cold start / hot running performance
* Creating this array takes ~3ms on a modern machine,
* But if we perform the computation at runtime as needed the CSS Lexer benchmark
* performance degrades by ~10%
*
* TODO: Perhaps it should be lazy initialized only if a charCode > 255 is used.
*/
function initCharCodeToOptimizedIndexMap() {
	if (isEmpty(charCodeToOptimizedIdxMap)) {
		charCodeToOptimizedIdxMap = new Array(65536);
		for (let i = 0; i < 65536; i++) charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
	}
}
//#endregion
//#region node_modules/chevrotain/lib/src/scan/tokens.js
function tokenStructuredMatcher(tokInstance, tokConstructor) {
	const instanceType = tokInstance.tokenTypeIdx;
	if (instanceType === tokConstructor.tokenTypeIdx) return true;
	else return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
}
function tokenStructuredMatcherNoCategories(token, tokType) {
	return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
var tokenShortNameIdx = 1;
var tokenIdxToClass = {};
function augmentTokenTypes(tokenTypes) {
	const tokenTypesAndParents = expandCategories(tokenTypes);
	assignTokenDefaultProps(tokenTypesAndParents);
	assignCategoriesMapProp(tokenTypesAndParents);
	assignCategoriesTokensProp(tokenTypesAndParents);
	forEach(tokenTypesAndParents, (tokType) => {
		tokType.isParent = tokType.categoryMatches.length > 0;
	});
}
function expandCategories(tokenTypes) {
	let result = clone(tokenTypes);
	let categories = tokenTypes;
	let searching = true;
	while (searching) {
		categories = compact(flatten(map(categories, (currTokType) => currTokType.CATEGORIES)));
		const newCategories = difference(categories, result);
		result = result.concat(newCategories);
		if (isEmpty(newCategories)) searching = false;
		else categories = newCategories;
	}
	return result;
}
function assignTokenDefaultProps(tokenTypes) {
	forEach(tokenTypes, (currTokType) => {
		if (!hasShortKeyProperty(currTokType)) {
			tokenIdxToClass[tokenShortNameIdx] = currTokType;
			currTokType.tokenTypeIdx = tokenShortNameIdx++;
		}
		if (hasCategoriesProperty(currTokType) && !isArray(currTokType.CATEGORIES)) currTokType.CATEGORIES = [currTokType.CATEGORIES];
		if (!hasCategoriesProperty(currTokType)) currTokType.CATEGORIES = [];
		if (!hasExtendingTokensTypesProperty(currTokType)) currTokType.categoryMatches = [];
		if (!hasExtendingTokensTypesMapProperty(currTokType)) currTokType.categoryMatchesMap = {};
	});
}
function assignCategoriesTokensProp(tokenTypes) {
	forEach(tokenTypes, (currTokType) => {
		currTokType.categoryMatches = [];
		forEach(currTokType.categoryMatchesMap, (val, key) => {
			currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
		});
	});
}
function assignCategoriesMapProp(tokenTypes) {
	forEach(tokenTypes, (currTokType) => {
		singleAssignCategoriesToksMap([], currTokType);
	});
}
function singleAssignCategoriesToksMap(path, nextNode) {
	forEach(path, (pathNode) => {
		nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
	});
	forEach(nextNode.CATEGORIES, (nextCategory) => {
		const newPath = path.concat(nextNode);
		if (!includes(newPath, nextCategory)) singleAssignCategoriesToksMap(newPath, nextCategory);
	});
}
function hasShortKeyProperty(tokType) {
	return has(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
	return has(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
	return has(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
	return has(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
	return has(tokType, "tokenTypeIdx");
}
//#endregion
//#region node_modules/chevrotain/lib/src/scan/lexer_errors_public.js
var defaultLexerErrorProvider = {
	buildUnableToPopLexerModeMessage(token) {
		return `Unable to pop Lexer Mode after encountering Token ->${token.image}<- The Mode Stack is empty`;
	},
	buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column, mode) {
		return `unexpected character: ->${fullText.charAt(startOffset)}<- at offset: ${startOffset}, skipped ${length} characters.`;
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/scan/lexer_public.js
var LexerDefinitionErrorType;
(function(LexerDefinitionErrorType) {
	LexerDefinitionErrorType[LexerDefinitionErrorType["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
	LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
	LexerDefinitionErrorType[LexerDefinitionErrorType["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
	LexerDefinitionErrorType[LexerDefinitionErrorType["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
	LexerDefinitionErrorType[LexerDefinitionErrorType["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
	LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
	LexerDefinitionErrorType[LexerDefinitionErrorType["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
	LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
	LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
	LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
	LexerDefinitionErrorType[LexerDefinitionErrorType["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
	LexerDefinitionErrorType[LexerDefinitionErrorType["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
	LexerDefinitionErrorType[LexerDefinitionErrorType["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
	LexerDefinitionErrorType[LexerDefinitionErrorType["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
	LexerDefinitionErrorType[LexerDefinitionErrorType["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
	LexerDefinitionErrorType[LexerDefinitionErrorType["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
	LexerDefinitionErrorType[LexerDefinitionErrorType["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
	LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"] = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
var DEFAULT_LEXER_CONFIG = {
	deferDefinitionErrorsHandling: false,
	positionTracking: "full",
	lineTerminatorsPattern: /\n|\r\n?/g,
	lineTerminatorCharacters: ["\n", "\r"],
	ensureOptimizations: false,
	safeMode: false,
	errorMessageProvider: defaultLexerErrorProvider,
	traceInitPerf: false,
	skipValidations: false,
	recoveryEnabled: true
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = class {
	constructor(lexerDefinition, config = DEFAULT_LEXER_CONFIG) {
		this.lexerDefinition = lexerDefinition;
		this.lexerDefinitionErrors = [];
		this.lexerDefinitionWarning = [];
		this.patternIdxToConfig = {};
		this.charCodeToPatternIdxToConfig = {};
		this.modes = [];
		this.emptyGroups = {};
		this.trackStartLines = true;
		this.trackEndLines = true;
		this.hasCustom = false;
		this.canModeBeOptimized = {};
		this.TRACE_INIT = (phaseDesc, phaseImpl) => {
			if (this.traceInitPerf === true) {
				this.traceInitIndent++;
				const indent = new Array(this.traceInitIndent + 1).join("	");
				if (this.traceInitIndent < this.traceInitMaxIdent) console.log(`${indent}--> <${phaseDesc}>`);
				const { time, value } = timer(phaseImpl);
				/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
				const traceMethod = time > 10 ? console.warn : console.log;
				if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
				this.traceInitIndent--;
				return value;
			} else return phaseImpl();
		};
		if (typeof config === "boolean") throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
		this.config = assign({}, DEFAULT_LEXER_CONFIG, config);
		const traceInitVal = this.config.traceInitPerf;
		if (traceInitVal === true) {
			this.traceInitMaxIdent = Infinity;
			this.traceInitPerf = true;
		} else if (typeof traceInitVal === "number") {
			this.traceInitMaxIdent = traceInitVal;
			this.traceInitPerf = true;
		}
		this.traceInitIndent = -1;
		this.TRACE_INIT("Lexer Constructor", () => {
			let actualDefinition;
			let hasOnlySingleMode = true;
			this.TRACE_INIT("Lexer Config handling", () => {
				if (this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
				else if (this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
				if (config.safeMode && config.ensureOptimizations) throw Error("\"safeMode\" and \"ensureOptimizations\" flags are mutually exclusive.");
				this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
				this.trackEndLines = /full/i.test(this.config.positionTracking);
				if (isArray(lexerDefinition)) actualDefinition = {
					modes: { defaultMode: clone(lexerDefinition) },
					defaultMode: DEFAULT_MODE
				};
				else {
					hasOnlySingleMode = false;
					actualDefinition = clone(lexerDefinition);
				}
			});
			if (this.config.skipValidations === false) {
				this.TRACE_INIT("performRuntimeChecks", () => {
					this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
				});
				this.TRACE_INIT("performWarningRuntimeChecks", () => {
					this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, this.trackStartLines, this.config.lineTerminatorCharacters));
				});
			}
			actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {};
			forEach(actualDefinition.modes, (currModeValue, currModeName) => {
				actualDefinition.modes[currModeName] = reject(currModeValue, (currTokType) => isUndefined(currTokType));
			});
			const allModeNames = keys(actualDefinition.modes);
			forEach(actualDefinition.modes, (currModDef, currModName) => {
				this.TRACE_INIT(`Mode: <${currModName}> processing`, () => {
					this.modes.push(currModName);
					if (this.config.skipValidations === false) this.TRACE_INIT(`validatePatterns`, () => {
						this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
					});
					if (isEmpty(this.lexerDefinitionErrors)) {
						augmentTokenTypes(currModDef);
						let currAnalyzeResult;
						this.TRACE_INIT(`analyzeTokenTypes`, () => {
							currAnalyzeResult = analyzeTokenTypes(currModDef, {
								lineTerminatorCharacters: this.config.lineTerminatorCharacters,
								positionTracking: config.positionTracking,
								ensureOptimizations: config.ensureOptimizations,
								safeMode: config.safeMode,
								tracer: this.TRACE_INIT
							});
						});
						this.patternIdxToConfig[currModName] = currAnalyzeResult.patternIdxToConfig;
						this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult.charCodeToPatternIdxToConfig;
						this.emptyGroups = assign({}, this.emptyGroups, currAnalyzeResult.emptyGroups);
						this.hasCustom = currAnalyzeResult.hasCustom || this.hasCustom;
						this.canModeBeOptimized[currModName] = currAnalyzeResult.canBeOptimized;
					}
				});
			});
			this.defaultMode = actualDefinition.defaultMode;
			if (!isEmpty(this.lexerDefinitionErrors) && !this.config.deferDefinitionErrorsHandling) {
				const allErrMessagesString = map(this.lexerDefinitionErrors, (error) => {
					return error.message;
				}).join("-----------------------\n");
				throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
			}
			forEach(this.lexerDefinitionWarning, (warningDescriptor) => {
				PRINT_WARNING(warningDescriptor.message);
			});
			this.TRACE_INIT("Choosing sub-methods implementations", () => {
				if (hasOnlySingleMode) this.handleModes = noop;
				if (this.trackStartLines === false) this.computeNewColumn = identity;
				if (this.trackEndLines === false) this.updateTokenEndLineColumnLocation = noop;
				if (/full/i.test(this.config.positionTracking)) this.createTokenInstance = this.createFullToken;
				else if (/onlyStart/i.test(this.config.positionTracking)) this.createTokenInstance = this.createStartOnlyToken;
				else if (/onlyOffset/i.test(this.config.positionTracking)) this.createTokenInstance = this.createOffsetOnlyToken;
				else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
				if (this.hasCustom) {
					this.addToken = this.addTokenUsingPush;
					this.handlePayload = this.handlePayloadWithCustom;
				} else {
					this.addToken = this.addTokenUsingMemberAccess;
					this.handlePayload = this.handlePayloadNoCustom;
				}
			});
			this.TRACE_INIT("Failed Optimization Warnings", () => {
				const unOptimizedModes = reduce(this.canModeBeOptimized, (cannotBeOptimized, canBeOptimized, modeName) => {
					if (canBeOptimized === false) cannotBeOptimized.push(modeName);
					return cannotBeOptimized;
				}, []);
				if (config.ensureOptimizations && !isEmpty(unOptimizedModes)) throw Error(`Lexer Modes: < ${unOptimizedModes.join(", ")} > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
			});
			this.TRACE_INIT("clearRegExpParserCache", () => {
				clearRegExpParserCache();
			});
			this.TRACE_INIT("toFastProperties", () => {
				toFastProperties(this);
			});
		});
	}
	tokenize(text, initialMode = this.defaultMode) {
		if (!isEmpty(this.lexerDefinitionErrors)) {
			const allErrMessagesString = map(this.lexerDefinitionErrors, (error) => {
				return error.message;
			}).join("-----------------------\n");
			throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
		}
		return this.tokenizeInternal(text, initialMode);
	}
	tokenizeInternal(text, initialMode) {
		let i, j, k, matchAltImage, longerAlt, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match;
		const orgText = text;
		const orgLength = orgText.length;
		let offset = 0;
		let matchedTokensIndex = 0;
		const guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10);
		const matchedTokens = new Array(guessedNumberOfTokens);
		const errors = [];
		let line = this.trackStartLines ? 1 : void 0;
		let column = this.trackStartLines ? 1 : void 0;
		const groups = cloneEmptyGroups(this.emptyGroups);
		const trackLines = this.trackStartLines;
		const lineTerminatorPattern = this.config.lineTerminatorsPattern;
		let currModePatternsLength = 0;
		let patternIdxToConfig = [];
		let currCharCodeToPatternIdxToConfig = [];
		const modeStack = [];
		const emptyArray = [];
		Object.freeze(emptyArray);
		let isOptimizedMode = false;
		const pop_mode = (popToken) => {
			if (modeStack.length === 1 && popToken.tokenType.PUSH_MODE === void 0) {
				const msg = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
				errors.push({
					offset: popToken.startOffset,
					line: popToken.startLine,
					column: popToken.startColumn,
					length: popToken.image.length,
					message: msg
				});
			} else {
				modeStack.pop();
				const newMode = last(modeStack);
				patternIdxToConfig = this.patternIdxToConfig[newMode];
				currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
				currModePatternsLength = patternIdxToConfig.length;
				const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
				if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) isOptimizedMode = true;
				else isOptimizedMode = false;
			}
		};
		function push_mode(newMode) {
			modeStack.push(newMode);
			currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
			patternIdxToConfig = this.patternIdxToConfig[newMode];
			currModePatternsLength = patternIdxToConfig.length;
			currModePatternsLength = patternIdxToConfig.length;
			const modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
			if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) isOptimizedMode = true;
			else isOptimizedMode = false;
		}
		push_mode.call(this, initialMode);
		let currConfig;
		const recoveryEnabled = this.config.recoveryEnabled;
		while (offset < orgLength) {
			matchedImage = null;
			imageLength = -1;
			const nextCharCode = orgText.charCodeAt(offset);
			let chosenPatternIdxToConfig;
			if (isOptimizedMode) {
				const optimizedCharIdx = charCodeToOptimizedIndex(nextCharCode);
				const possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
				chosenPatternIdxToConfig = possiblePatterns !== void 0 ? possiblePatterns : emptyArray;
			} else chosenPatternIdxToConfig = patternIdxToConfig;
			const chosenPatternsLength = chosenPatternIdxToConfig.length;
			for (i = 0; i < chosenPatternsLength; i++) {
				currConfig = chosenPatternIdxToConfig[i];
				const currPattern = currConfig.pattern;
				payload = null;
				const singleCharCode = currConfig.short;
				if (singleCharCode !== false) {
					if (nextCharCode === singleCharCode) {
						imageLength = 1;
						matchedImage = currPattern;
					}
				} else if (currConfig.isCustom === true) {
					match = currPattern.exec(orgText, offset, matchedTokens, groups);
					if (match !== null) {
						matchedImage = match[0];
						imageLength = matchedImage.length;
						if (match.payload !== void 0) payload = match.payload;
					} else matchedImage = null;
				} else {
					currPattern.lastIndex = offset;
					imageLength = this.matchLength(currPattern, text, offset);
				}
				if (imageLength !== -1) {
					longerAlt = currConfig.longerAlt;
					if (longerAlt !== void 0) {
						matchedImage = text.substring(offset, offset + imageLength);
						const longerAltLength = longerAlt.length;
						for (k = 0; k < longerAltLength; k++) {
							const longerAltConfig = patternIdxToConfig[longerAlt[k]];
							const longerAltPattern = longerAltConfig.pattern;
							altPayload = null;
							if (longerAltConfig.isCustom === true) {
								match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
								if (match !== null) {
									matchAltImage = match[0];
									if (match.payload !== void 0) altPayload = match.payload;
								} else matchAltImage = null;
							} else {
								longerAltPattern.lastIndex = offset;
								matchAltImage = this.match(longerAltPattern, text, offset);
							}
							if (matchAltImage && matchAltImage.length > matchedImage.length) {
								matchedImage = matchAltImage;
								imageLength = matchAltImage.length;
								payload = altPayload;
								currConfig = longerAltConfig;
								break;
							}
						}
					}
					break;
				}
			}
			if (imageLength !== -1) {
				group = currConfig.group;
				if (group !== void 0) {
					matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
					tokType = currConfig.tokenTypeIdx;
					newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
					this.handlePayload(newToken, payload);
					if (group === false) matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
					else groups[group].push(newToken);
				}
				if (trackLines === true && currConfig.canLineTerminator === true) {
					let numOfLTsInMatch = 0;
					let foundTerminator;
					let lastLTEndOffset;
					lineTerminatorPattern.lastIndex = 0;
					do {
						matchedImage = matchedImage !== null ? matchedImage : text.substring(offset, offset + imageLength);
						foundTerminator = lineTerminatorPattern.test(matchedImage);
						if (foundTerminator === true) {
							lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
							numOfLTsInMatch++;
						}
					} while (foundTerminator === true);
					if (numOfLTsInMatch !== 0) {
						line = line + numOfLTsInMatch;
						column = imageLength - lastLTEndOffset;
						this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
					} else column = this.computeNewColumn(column, imageLength);
				} else column = this.computeNewColumn(column, imageLength);
				offset = offset + imageLength;
				this.handleModes(currConfig, pop_mode, push_mode, newToken);
			} else {
				const errorStartOffset = offset;
				const errorLine = line;
				const errorColumn = column;
				let foundResyncPoint = recoveryEnabled === false;
				while (foundResyncPoint === false && offset < orgLength) {
					offset++;
					for (j = 0; j < currModePatternsLength; j++) {
						const currConfig = patternIdxToConfig[j];
						const currPattern = currConfig.pattern;
						const singleCharCode = currConfig.short;
						if (singleCharCode !== false) {
							if (orgText.charCodeAt(offset) === singleCharCode) foundResyncPoint = true;
						} else if (currConfig.isCustom === true) foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
						else {
							currPattern.lastIndex = offset;
							foundResyncPoint = currPattern.exec(text) !== null;
						}
						if (foundResyncPoint === true) break;
					}
				}
				errLength = offset - errorStartOffset;
				column = this.computeNewColumn(column, errLength);
				msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn, last(modeStack));
				errors.push({
					offset: errorStartOffset,
					line: errorLine,
					column: errorColumn,
					length: errLength,
					message: msg
				});
				if (recoveryEnabled === false) break;
			}
		}
		if (!this.hasCustom) matchedTokens.length = matchedTokensIndex;
		return {
			tokens: matchedTokens,
			groups,
			errors
		};
	}
	handleModes(config, pop_mode, push_mode, newToken) {
		if (config.pop === true) {
			const pushMode = config.push;
			pop_mode(newToken);
			if (pushMode !== void 0) push_mode.call(this, pushMode);
		} else if (config.push !== void 0) push_mode.call(this, config.push);
	}
	updateTokenEndLineColumnLocation(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
		let lastCharIsLT, fixForEndingInLT;
		if (group !== void 0) {
			lastCharIsLT = lastLTIdx === imageLength - 1;
			fixForEndingInLT = lastCharIsLT ? -1 : 0;
			if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
				newToken.endLine = line + fixForEndingInLT;
				newToken.endColumn = column - 1 + -fixForEndingInLT;
			}
		}
	}
	computeNewColumn(oldColumn, imageLength) {
		return oldColumn + imageLength;
	}
	createOffsetOnlyToken(image, startOffset, tokenTypeIdx, tokenType) {
		return {
			image,
			startOffset,
			tokenTypeIdx,
			tokenType
		};
	}
	createStartOnlyToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
		return {
			image,
			startOffset,
			startLine,
			startColumn,
			tokenTypeIdx,
			tokenType
		};
	}
	createFullToken(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
		return {
			image,
			startOffset,
			endOffset: startOffset + imageLength - 1,
			startLine,
			endLine: startLine,
			startColumn,
			endColumn: startColumn + imageLength - 1,
			tokenTypeIdx,
			tokenType
		};
	}
	addTokenUsingPush(tokenVector, index, tokenToAdd) {
		tokenVector.push(tokenToAdd);
		return index;
	}
	addTokenUsingMemberAccess(tokenVector, index, tokenToAdd) {
		tokenVector[index] = tokenToAdd;
		index++;
		return index;
	}
	handlePayloadNoCustom(token, payload) {}
	handlePayloadWithCustom(token, payload) {
		if (payload !== null) token.payload = payload;
	}
	match(pattern, text, offset) {
		if (pattern.test(text) === true) return text.substring(offset, pattern.lastIndex);
		return null;
	}
	matchLength(pattern, text, offset) {
		if (pattern.test(text) === true) return pattern.lastIndex - offset;
		return -1;
	}
};
Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
Lexer.NA = /NOT_APPLICABLE/;
//#endregion
//#region node_modules/chevrotain/lib/src/scan/tokens_public.js
function tokenLabel(tokType) {
	if (hasTokenLabel(tokType)) return tokType.LABEL;
	else return tokType.name;
}
function hasTokenLabel(obj) {
	return isString(obj.LABEL) && obj.LABEL !== "";
}
var PARENT = "parent";
var CATEGORIES = "categories";
var LABEL = "label";
var GROUP = "group";
var PUSH_MODE = "push_mode";
var POP_MODE = "pop_mode";
var LONGER_ALT = "longer_alt";
var LINE_BREAKS = "line_breaks";
var START_CHARS_HINT = "start_chars_hint";
function createToken(config) {
	return createTokenInternal(config);
}
function createTokenInternal(config) {
	const pattern = config.pattern;
	const tokenType = {};
	tokenType.name = config.name;
	if (!isUndefined(pattern)) tokenType.PATTERN = pattern;
	if (has(config, PARENT)) throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
	if (has(config, CATEGORIES)) tokenType.CATEGORIES = config[CATEGORIES];
	augmentTokenTypes([tokenType]);
	if (has(config, LABEL)) tokenType.LABEL = config[LABEL];
	if (has(config, GROUP)) tokenType.GROUP = config[GROUP];
	if (has(config, POP_MODE)) tokenType.POP_MODE = config[POP_MODE];
	if (has(config, PUSH_MODE)) tokenType.PUSH_MODE = config[PUSH_MODE];
	if (has(config, LONGER_ALT)) tokenType.LONGER_ALT = config[LONGER_ALT];
	if (has(config, LINE_BREAKS)) tokenType.LINE_BREAKS = config[LINE_BREAKS];
	if (has(config, START_CHARS_HINT)) tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
	return tokenType;
}
var EOF = createToken({
	name: "EOF",
	pattern: Lexer.NA
});
augmentTokenTypes([EOF]);
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
	return {
		image,
		startOffset,
		endOffset,
		startLine,
		endLine,
		startColumn,
		endColumn,
		tokenTypeIdx: tokType.tokenTypeIdx,
		tokenType: tokType
	};
}
function tokenMatcher(token, tokType) {
	return tokenStructuredMatcher(token, tokType);
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/errors_public.js
var defaultParserErrorProvider = {
	buildMismatchTokenMessage({ expected, actual, previous, ruleName }) {
		return `Expecting ${hasTokenLabel(expected) ? `--> ${tokenLabel(expected)} <--` : `token of type --> ${expected.name} <--`} but found --> '${actual.image}' <--`;
	},
	buildNotAllInputParsedMessage({ firstRedundant, ruleName }) {
		return "Redundant input, expecting EOF but found: " + firstRedundant.image;
	},
	buildNoViableAltMessage({ expectedPathsPerAlt, actual, previous, customUserDescription, ruleName }) {
		const errPrefix = "Expecting: ";
		const errSuffix = "\nbut found: '" + head(actual).image + "'";
		if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
		else {
			const allLookAheadPaths = reduce(expectedPathsPerAlt, (result, currAltPaths) => result.concat(currAltPaths), []);
			const nextValidTokenSequences = map(allLookAheadPaths, (currPath) => `[${map(currPath, (currTokenType) => tokenLabel(currTokenType)).join(", ")}]`);
			return `Expecting: one of these possible Token sequences:\n${map(nextValidTokenSequences, (itemMsg, idx) => `  ${idx + 1}. ${itemMsg}`).join("\n")}` + errSuffix;
		}
	},
	buildEarlyExitMessage({ expectedIterationPaths, actual, customUserDescription, ruleName }) {
		const errPrefix = "Expecting: ";
		const errSuffix = "\nbut found: '" + head(actual).image + "'";
		if (customUserDescription) return errPrefix + customUserDescription + errSuffix;
		else return `Expecting: expecting at least one iteration which starts with one of these possible Token sequences::\n  <${map(expectedIterationPaths, (currPath) => `[${map(currPath, (currTokenType) => tokenLabel(currTokenType)).join(",")}]`).join(" ,")}>` + errSuffix;
	}
};
Object.freeze(defaultParserErrorProvider);
var defaultGrammarResolverErrorProvider = { buildRuleNotFoundError(topLevelRule, undefinedRule) {
	return "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
} };
var defaultGrammarValidatorErrorProvider = {
	buildDuplicateFoundError(topLevelRule, duplicateProds) {
		function getExtraProductionArgument(prod) {
			if (prod instanceof Terminal) return prod.terminalType.name;
			else if (prod instanceof NonTerminal) return prod.nonTerminalName;
			else return "";
		}
		const topLevelName = topLevelRule.name;
		const duplicateProd = head(duplicateProds);
		const index = duplicateProd.idx;
		const dslName = getProductionDslName(duplicateProd);
		const extraArgument = getExtraProductionArgument(duplicateProd);
		let msg = `->${dslName}${index > 0 ? index : ""}<- ${extraArgument ? `with argument: ->${extraArgument}<-` : ""}
                  appears more than once (${duplicateProds.length} times) in the top level rule: ->${topLevelName}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
		msg = msg.replace(/[ \t]+/g, " ");
		msg = msg.replace(/\s\s+/g, "\n");
		return msg;
	},
	buildNamespaceConflictError(rule) {
		return `Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${rule.name}>.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.`;
	},
	buildAlternationPrefixAmbiguityError(options) {
		const pathMsg = map(options.prefixPath, (currTok) => tokenLabel(currTok)).join(", ");
		const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
		return `Ambiguous alternatives: <${options.ambiguityIndices.join(" ,")}> due to common lookahead prefix\nin <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,\n<${pathMsg}> may appears as a prefix path in all these alternatives.\nSee: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.`;
	},
	buildAlternationAmbiguityError(options) {
		const occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
		const isEmptyPath = options.prefixPath.length === 0;
		let currMessage = `Ambiguous Alternatives Detected: <${options.ambiguityIndices.join(" ,")}> in <OR${occurrence}> inside <${options.topLevelRule.name}> Rule,\n`;
		if (isEmptyPath) currMessage += "These alternatives are all empty (match no tokens), making them indistinguishable.\nOnly the last alternative may be empty.\n";
		else {
			const pathMsg = map(options.prefixPath, (currtok) => tokenLabel(currtok)).join(", ");
			currMessage += `<${pathMsg}> may appears as a prefix path in all these alternatives.\n`;
		}
		currMessage += "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
		return currMessage;
	},
	buildEmptyRepetitionError(options) {
		let dslName = getProductionDslName(options.repetition);
		if (options.repetition.idx !== 0) dslName += options.repetition.idx;
		return `The repetition <${dslName}> within Rule <${options.topLevelRule.name}> can never consume any tokens.\nThis could lead to an infinite loop.`;
	},
	buildTokenNameError(options) {
		/* istanbul ignore next */
		return "deprecated";
	},
	buildEmptyAlternationError(options) {
		return `Ambiguous empty alternative: <${options.emptyChoiceIdx + 1}> in <OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.\nOnly the last alternative may be an empty alternative.`;
	},
	buildTooManyAlternativesError(options) {
		return `An Alternation cannot have more than 256 alternatives:\n<OR${options.alternation.idx}> inside <${options.topLevelRule.name}> Rule.\n has ${options.alternation.definition.length + 1} alternatives.`;
	},
	buildLeftRecursionError(options) {
		const ruleName = options.topLevelRule.name;
		return `Left Recursion found in grammar.\nrule: <${ruleName}> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n ${`${ruleName} --> ${map(options.leftRecursionPath, (currRule) => currRule.name).concat([ruleName]).join(" --> ")}`}\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
	},
	buildInvalidRuleNameError(options) {
		/* istanbul ignore next */
		return "deprecated";
	},
	buildDuplicateRuleNameError(options) {
		let ruleName;
		if (options.topLevelRule instanceof Rule) ruleName = options.topLevelRule.name;
		else ruleName = options.topLevelRule;
		return `Duplicate definition, rule: ->${ruleName}<- is already defined in the grammar: ->${options.grammarName}<-`;
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/resolver.js
function resolveGrammar$1(topLevels, errMsgProvider) {
	const refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
	refResolver.resolveRefs();
	return refResolver.errors;
}
var GastRefResolverVisitor = class extends GAstVisitor {
	constructor(nameToTopRule, errMsgProvider) {
		super();
		this.nameToTopRule = nameToTopRule;
		this.errMsgProvider = errMsgProvider;
		this.errors = [];
	}
	resolveRefs() {
		forEach(values(this.nameToTopRule), (prod) => {
			this.currTopLevel = prod;
			prod.accept(this);
		});
	}
	visitNonTerminal(node) {
		const ref = this.nameToTopRule[node.nonTerminalName];
		if (!ref) {
			const msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
			this.errors.push({
				message: msg,
				type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
				ruleName: this.currTopLevel.name,
				unresolvedRefName: node.nonTerminalName
			});
		} else node.referencedRule = ref;
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/interpreter.js
var AbstractNextPossibleTokensWalker = class extends RestWalker {
	constructor(topProd, path) {
		super();
		this.topProd = topProd;
		this.path = path;
		this.possibleTokTypes = [];
		this.nextProductionName = "";
		this.nextProductionOccurrence = 0;
		this.found = false;
		this.isAtEndOfPath = false;
	}
	startWalking() {
		this.found = false;
		if (this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
		this.ruleStack = clone(this.path.ruleStack).reverse();
		this.occurrenceStack = clone(this.path.occurrenceStack).reverse();
		this.ruleStack.pop();
		this.occurrenceStack.pop();
		this.updateExpectedNext();
		this.walk(this.topProd);
		return this.possibleTokTypes;
	}
	walk(prod, prevRest = []) {
		if (!this.found) super.walk(prod, prevRest);
	}
	walkProdRef(refProd, currRest, prevRest) {
		if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
			const fullRest = currRest.concat(prevRest);
			this.updateExpectedNext();
			this.walk(refProd.referencedRule, fullRest);
		}
	}
	updateExpectedNext() {
		if (isEmpty(this.ruleStack)) {
			this.nextProductionName = "";
			this.nextProductionOccurrence = 0;
			this.isAtEndOfPath = true;
		} else {
			this.nextProductionName = this.ruleStack.pop();
			this.nextProductionOccurrence = this.occurrenceStack.pop();
		}
	}
};
var NextAfterTokenWalker = class extends AbstractNextPossibleTokensWalker {
	constructor(topProd, path) {
		super(topProd, path);
		this.path = path;
		this.nextTerminalName = "";
		this.nextTerminalOccurrence = 0;
		this.nextTerminalName = this.path.lastTok.name;
		this.nextTerminalOccurrence = this.path.lastTokOccurrence;
	}
	walkTerminal(terminal, currRest, prevRest) {
		if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
			const fullRest = currRest.concat(prevRest);
			const restProd = new Alternative({ definition: fullRest });
			this.possibleTokTypes = first(restProd);
			this.found = true;
		}
	}
};
/**
* This walker only "walks" a single "TOP" level in the Grammar Ast, this means
* it never "follows" production refs
*/
var AbstractNextTerminalAfterProductionWalker = class extends RestWalker {
	constructor(topRule, occurrence) {
		super();
		this.topRule = topRule;
		this.occurrence = occurrence;
		this.result = {
			token: void 0,
			occurrence: void 0,
			isEndOfRule: void 0
		};
	}
	startWalking() {
		this.walk(this.topRule);
		return this.result;
	}
};
var NextTerminalAfterManyWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkMany(manyProd, currRest, prevRest) {
		if (manyProd.idx === this.occurrence) {
			const firstAfterMany = head(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterMany === void 0;
			if (firstAfterMany instanceof Terminal) {
				this.result.token = firstAfterMany.terminalType;
				this.result.occurrence = firstAfterMany.idx;
			}
		} else super.walkMany(manyProd, currRest, prevRest);
	}
};
var NextTerminalAfterManySepWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkManySep(manySepProd, currRest, prevRest) {
		if (manySepProd.idx === this.occurrence) {
			const firstAfterManySep = head(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterManySep === void 0;
			if (firstAfterManySep instanceof Terminal) {
				this.result.token = firstAfterManySep.terminalType;
				this.result.occurrence = firstAfterManySep.idx;
			}
		} else super.walkManySep(manySepProd, currRest, prevRest);
	}
};
var NextTerminalAfterAtLeastOneWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		if (atLeastOneProd.idx === this.occurrence) {
			const firstAfterAtLeastOne = head(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterAtLeastOne === void 0;
			if (firstAfterAtLeastOne instanceof Terminal) {
				this.result.token = firstAfterAtLeastOne.terminalType;
				this.result.occurrence = firstAfterAtLeastOne.idx;
			}
		} else super.walkAtLeastOne(atLeastOneProd, currRest, prevRest);
	}
};
var NextTerminalAfterAtLeastOneSepWalker = class extends AbstractNextTerminalAfterProductionWalker {
	walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest) {
		if (atleastOneSepProd.idx === this.occurrence) {
			const firstAfterfirstAfterAtLeastOneSep = head(currRest.concat(prevRest));
			this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === void 0;
			if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
				this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
				this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
			}
		} else super.walkAtLeastOneSep(atleastOneSepProd, currRest, prevRest);
	}
};
function possiblePathsFrom(targetDef, maxLength, currPath = []) {
	currPath = clone(currPath);
	let result = [];
	let i = 0;
	function remainingPathWith(nextDef) {
		return nextDef.concat(drop(targetDef, i + 1));
	}
	function getAlternativesForProd(definition) {
		const alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
		return result.concat(alternatives);
	}
	/**
	* Mandatory productions will halt the loop as the paths computed from their recursive calls will already contain the
	* following (rest) of the targetDef.
	*
	* For optional productions (Option/Repetition/...) the loop will continue to represent the paths that do not include the
	* the optional production.
	*/
	while (currPath.length < maxLength && i < targetDef.length) {
		const prod = targetDef[i];
		/* istanbul ignore else */
		if (prod instanceof Alternative) return getAlternativesForProd(prod.definition);
		else if (prod instanceof NonTerminal) return getAlternativesForProd(prod.definition);
		else if (prod instanceof Option) result = getAlternativesForProd(prod.definition);
		else if (prod instanceof RepetitionMandatory) return getAlternativesForProd(prod.definition.concat([new Repetition({ definition: prod.definition })]));
		else if (prod instanceof RepetitionMandatoryWithSeparator) return getAlternativesForProd([new Alternative({ definition: prod.definition }), new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })]);
		else if (prod instanceof RepetitionWithSeparator) result = getAlternativesForProd(prod.definition.concat([new Repetition({ definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition) })]));
		else if (prod instanceof Repetition) result = getAlternativesForProd(prod.definition.concat([new Repetition({ definition: prod.definition })]));
		else if (prod instanceof Alternation) {
			forEach(prod.definition, (currAlt) => {
				if (isEmpty(currAlt.definition) === false) result = getAlternativesForProd(currAlt.definition);
			});
			return result;
		} else if (prod instanceof Terminal) currPath.push(prod.terminalType);
		else throw Error("non exhaustive match");
		i++;
	}
	result.push({
		partialPath: currPath,
		suffixDef: drop(targetDef, i)
	});
	return result;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
	const EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
	const EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
	const EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
	let foundCompletePath = false;
	const tokenVectorLength = tokenVector.length;
	const minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
	const result = [];
	const possiblePaths = [];
	possiblePaths.push({
		idx: -1,
		def: initialDef,
		ruleStack: [],
		occurrenceStack: []
	});
	while (!isEmpty(possiblePaths)) {
		const currPath = possiblePaths.pop();
		if (currPath === EXIT_ALTERNATIVE) {
			if (foundCompletePath && last(possiblePaths).idx <= minimalAlternativesIndex) possiblePaths.pop();
			continue;
		}
		const currDef = currPath.def;
		const currIdx = currPath.idx;
		const currRuleStack = currPath.ruleStack;
		const currOccurrenceStack = currPath.occurrenceStack;
		if (isEmpty(currDef)) continue;
		const prod = currDef[0];
		/* istanbul ignore else */
		if (prod === EXIT_NON_TERMINAL) {
			const nextPath = {
				idx: currIdx,
				def: drop(currDef),
				ruleStack: dropRight(currRuleStack),
				occurrenceStack: dropRight(currOccurrenceStack)
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Terminal) {
			/* istanbul ignore else */
			if (currIdx < tokenVectorLength - 1) {
				const nextIdx = currIdx + 1;
				const actualToken = tokenVector[nextIdx];
				if (tokMatcher(actualToken, prod.terminalType)) {
					const nextPath = {
						idx: nextIdx,
						def: drop(currDef),
						ruleStack: currRuleStack,
						occurrenceStack: currOccurrenceStack
					};
					possiblePaths.push(nextPath);
				}
			} else if (currIdx === tokenVectorLength - 1) {
				result.push({
					nextTokenType: prod.terminalType,
					nextTokenOccurrence: prod.idx,
					ruleStack: currRuleStack,
					occurrenceStack: currOccurrenceStack
				});
				foundCompletePath = true;
			} else throw Error("non exhaustive match");
		} else if (prod instanceof NonTerminal) {
			const newRuleStack = clone(currRuleStack);
			newRuleStack.push(prod.nonTerminalName);
			const newOccurrenceStack = clone(currOccurrenceStack);
			newOccurrenceStack.push(prod.idx);
			const nextPath = {
				idx: currIdx,
				def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop(currDef)),
				ruleStack: newRuleStack,
				occurrenceStack: newOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof Option) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const nextPathWith = {
				idx: currIdx,
				def: prod.definition.concat(drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof RepetitionMandatory) {
			const secondIteration = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			const nextPath = {
				idx: currIdx,
				def: prod.definition.concat([secondIteration], drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionMandatoryWithSeparator) {
			const separatorGast = new Terminal({ terminalType: prod.separator });
			const secondIteration = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			const nextPath = {
				idx: currIdx,
				def: prod.definition.concat([secondIteration], drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPath);
		} else if (prod instanceof RepetitionWithSeparator) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const separatorGast = new Terminal({ terminalType: prod.separator });
			const nthRepetition = new Repetition({
				definition: [separatorGast].concat(prod.definition),
				idx: prod.idx
			});
			const nextPathWith = {
				idx: currIdx,
				def: prod.definition.concat([nthRepetition], drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Repetition) {
			const nextPathWithout = {
				idx: currIdx,
				def: drop(currDef),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWithout);
			possiblePaths.push(EXIT_ALTERNATIVE);
			const nthRepetition = new Repetition({
				definition: prod.definition,
				idx: prod.idx
			});
			const nextPathWith = {
				idx: currIdx,
				def: prod.definition.concat([nthRepetition], drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(nextPathWith);
		} else if (prod instanceof Alternation) for (let i = prod.definition.length - 1; i >= 0; i--) {
			const currAltPath = {
				idx: currIdx,
				def: prod.definition[i].definition.concat(drop(currDef)),
				ruleStack: currRuleStack,
				occurrenceStack: currOccurrenceStack
			};
			possiblePaths.push(currAltPath);
			possiblePaths.push(EXIT_ALTERNATIVE);
		}
		else if (prod instanceof Alternative) possiblePaths.push({
			idx: currIdx,
			def: prod.definition.concat(drop(currDef)),
			ruleStack: currRuleStack,
			occurrenceStack: currOccurrenceStack
		});
		else if (prod instanceof Rule) possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
		else throw Error("non exhaustive match");
	}
	return result;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
	const newRuleStack = clone(currRuleStack);
	newRuleStack.push(topRule.name);
	const newCurrOccurrenceStack = clone(currOccurrenceStack);
	newCurrOccurrenceStack.push(1);
	return {
		idx: currIdx,
		def: topRule.definition,
		ruleStack: newRuleStack,
		occurrenceStack: newCurrOccurrenceStack
	};
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/lookahead.js
var PROD_TYPE;
(function(PROD_TYPE) {
	PROD_TYPE[PROD_TYPE["OPTION"] = 0] = "OPTION";
	PROD_TYPE[PROD_TYPE["REPETITION"] = 1] = "REPETITION";
	PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
	PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
	PROD_TYPE[PROD_TYPE["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
	PROD_TYPE[PROD_TYPE["ALTERNATION"] = 5] = "ALTERNATION";
})(PROD_TYPE || (PROD_TYPE = {}));
function getProdType(prod) {
	/* istanbul ignore else */
	if (prod instanceof Option || prod === "Option") return PROD_TYPE.OPTION;
	else if (prod instanceof Repetition || prod === "Repetition") return PROD_TYPE.REPETITION;
	else if (prod instanceof RepetitionMandatory || prod === "RepetitionMandatory") return PROD_TYPE.REPETITION_MANDATORY;
	else if (prod instanceof RepetitionMandatoryWithSeparator || prod === "RepetitionMandatoryWithSeparator") return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
	else if (prod instanceof RepetitionWithSeparator || prod === "RepetitionWithSeparator") return PROD_TYPE.REPETITION_WITH_SEPARATOR;
	else if (prod instanceof Alternation || prod === "Alternation") return PROD_TYPE.ALTERNATION;
	else throw Error("non exhaustive match");
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
	const lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
	return laFuncBuilder(lookAheadPaths, hasPredicates, areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher, dynamicTokensEnabled);
}
/**
*  When dealing with an Optional production (OPTION/MANY/2nd iteration of AT_LEAST_ONE/...) we need to compare
*  the lookahead "inside" the production and the lookahead immediately "after" it in the same top level rule (context free).
*
*  Example: given a production:
*  ABC(DE)?DF
*
*  The optional '(DE)?' should only be entered if we see 'DE'. a single Token 'D' is not sufficient to distinguish between the two
*  alternatives.
*
*  @returns A Lookahead function which will return true IFF the parser should parse the Optional production.
*/
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
	const lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
	const tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
	return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
	const numOfAlts = alts.length;
	const areAllOneTokenLookahead = every(alts, (currAlt) => {
		return every(currAlt, (currPath) => {
			return currPath.length === 1;
		});
	});
	if (hasPredicates)
 /**
	* @returns {number} - The chosen alternative index
	*/
	return function(orAlts) {
		const predicates = map(orAlts, (currAlt) => currAlt.GATE);
		for (let t = 0; t < numOfAlts; t++) {
			const currAlt = alts[t];
			const currNumOfPaths = currAlt.length;
			const currPredicate = predicates[t];
			if (currPredicate !== void 0 && currPredicate.call(this) === false) continue;
			nextPath: for (let j = 0; j < currNumOfPaths; j++) {
				const currPath = currAlt[j];
				const currPathLength = currPath.length;
				for (let i = 0; i < currPathLength; i++) if (tokenMatcher(this.LA(i + 1), currPath[i]) === false) continue nextPath;
				return t;
			}
		}
	};
	else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		const choiceToAlt = reduce(map(alts, (currAlt) => {
			return flatten(currAlt);
		}), (result, currAlt, idx) => {
			forEach(currAlt, (currTokType) => {
				if (!has(result, currTokType.tokenTypeIdx)) result[currTokType.tokenTypeIdx] = idx;
				forEach(currTokType.categoryMatches, (currExtendingType) => {
					if (!has(result, currExtendingType)) result[currExtendingType] = idx;
				});
			});
			return result;
		}, {});
		/**
		* @returns {number} - The chosen alternative index
		*/
		return function() {
			const nextToken = this.LA(1);
			return choiceToAlt[nextToken.tokenTypeIdx];
		};
	} else
 /**
	* @returns {number} - The chosen alternative index
	*/
	return function() {
		for (let t = 0; t < numOfAlts; t++) {
			const currAlt = alts[t];
			const currNumOfPaths = currAlt.length;
			nextPath: for (let j = 0; j < currNumOfPaths; j++) {
				const currPath = currAlt[j];
				const currPathLength = currPath.length;
				for (let i = 0; i < currPathLength; i++) if (tokenMatcher(this.LA(i + 1), currPath[i]) === false) continue nextPath;
				return t;
			}
		}
	};
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
	const areAllOneTokenLookahead = every(alt, (currPath) => {
		return currPath.length === 1;
	});
	const numOfPaths = alt.length;
	if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
		const singleTokensTypes = flatten(alt);
		if (singleTokensTypes.length === 1 && isEmpty(singleTokensTypes[0].categoryMatches)) {
			const expectedTokenUniqueKey = singleTokensTypes[0].tokenTypeIdx;
			return function() {
				return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey;
			};
		} else {
			const choiceToAlt = reduce(singleTokensTypes, (result, currTokType, idx) => {
				result[currTokType.tokenTypeIdx] = true;
				forEach(currTokType.categoryMatches, (currExtendingType) => {
					result[currExtendingType] = true;
				});
				return result;
			}, []);
			return function() {
				const nextToken = this.LA(1);
				return choiceToAlt[nextToken.tokenTypeIdx] === true;
			};
		}
	} else return function() {
		nextPath: for (let j = 0; j < numOfPaths; j++) {
			const currPath = alt[j];
			const currPathLength = currPath.length;
			for (let i = 0; i < currPathLength; i++) if (tokenMatcher(this.LA(i + 1), currPath[i]) === false) continue nextPath;
			return true;
		}
		return false;
	};
}
var RestDefinitionFinderWalker = class extends RestWalker {
	constructor(topProd, targetOccurrence, targetProdType) {
		super();
		this.topProd = topProd;
		this.targetOccurrence = targetOccurrence;
		this.targetProdType = targetProdType;
	}
	startWalking() {
		this.walk(this.topProd);
		return this.restDef;
	}
	checkIsTarget(node, expectedProdType, currRest, prevRest) {
		if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
			this.restDef = currRest.concat(prevRest);
			return true;
		}
		return false;
	}
	walkOption(optionProd, currRest, prevRest) {
		if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) super.walkOption(optionProd, currRest, prevRest);
	}
	walkAtLeastOne(atLeastOneProd, currRest, prevRest) {
		if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) super.walkOption(atLeastOneProd, currRest, prevRest);
	}
	walkAtLeastOneSep(atLeastOneSepProd, currRest, prevRest) {
		if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) super.walkOption(atLeastOneSepProd, currRest, prevRest);
	}
	walkMany(manyProd, currRest, prevRest) {
		if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) super.walkOption(manyProd, currRest, prevRest);
	}
	walkManySep(manySepProd, currRest, prevRest) {
		if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) super.walkOption(manySepProd, currRest, prevRest);
	}
};
/**
* Returns the definition of a target production in a top level level rule.
*/
var InsideDefinitionFinderVisitor = class extends GAstVisitor {
	constructor(targetOccurrence, targetProdType, targetRef) {
		super();
		this.targetOccurrence = targetOccurrence;
		this.targetProdType = targetProdType;
		this.targetRef = targetRef;
		this.result = [];
	}
	checkIsTarget(node, expectedProdName) {
		if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === void 0 || node === this.targetRef)) this.result = node.definition;
	}
	visitOption(node) {
		this.checkIsTarget(node, PROD_TYPE.OPTION);
	}
	visitRepetition(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION);
	}
	visitRepetitionMandatory(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
	}
	visitRepetitionMandatoryWithSeparator(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
	}
	visitRepetitionWithSeparator(node) {
		this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
	}
	visitAlternation(node) {
		this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
	}
};
function initializeArrayOfArrays(size) {
	const result = new Array(size);
	for (let i = 0; i < size; i++) result[i] = [];
	return result;
}
/**
* A sort of hash function between a Path in the grammar and a string.
* Note that this returns multiple "hashes" to support the scenario of token categories.
* -  A single path with categories may match multiple **actual** paths.
*/
function pathToHashKeys(path) {
	let keys = [""];
	for (let i = 0; i < path.length; i++) {
		const tokType = path[i];
		const longerKeys = [];
		for (let j = 0; j < keys.length; j++) {
			const currShorterKey = keys[j];
			longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
			for (let t = 0; t < tokType.categoryMatches.length; t++) {
				const categoriesKeySuffix = "_" + tokType.categoryMatches[t];
				longerKeys.push(currShorterKey + categoriesKeySuffix);
			}
		}
		keys = longerKeys;
	}
	return keys;
}
/**
* Imperative style due to being called from a hot spot
*/
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
	for (let currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
		if (currAltIdx === idx) continue;
		const otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
		for (let searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) if (otherAltKnownPathsKeys[searchPathKeys[searchIdx]] === true) return false;
	}
	return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
	const partialAlts = map(altsDefs, (currAlt) => possiblePathsFrom([currAlt], 1));
	const finalResult = initializeArrayOfArrays(partialAlts.length);
	const altsHashes = map(partialAlts, (currAltPaths) => {
		const dict = {};
		forEach(currAltPaths, (item) => {
			const keys = pathToHashKeys(item.partialPath);
			forEach(keys, (currKey) => {
				dict[currKey] = true;
			});
		});
		return dict;
	});
	let newData = partialAlts;
	for (let pathLength = 1; pathLength <= k; pathLength++) {
		const currDataset = newData;
		newData = initializeArrayOfArrays(currDataset.length);
		for (let altIdx = 0; altIdx < currDataset.length; altIdx++) {
			const currAltPathsAndSuffixes = currDataset[altIdx];
			for (let currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
				const currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
				const suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
				const prefixKeys = pathToHashKeys(currPathPrefix);
				if (isUniquePrefixHash(altsHashes, prefixKeys, altIdx) || isEmpty(suffixDef) || currPathPrefix.length === k) {
					const currAltResult = finalResult[altIdx];
					if (containsPath(currAltResult, currPathPrefix) === false) {
						currAltResult.push(currPathPrefix);
						for (let j = 0; j < prefixKeys.length; j++) {
							const currKey = prefixKeys[j];
							altsHashes[altIdx][currKey] = true;
						}
					}
				} else {
					const newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
					newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes);
					forEach(newPartialPathsAndSuffixes, (item) => {
						const prefixKeys = pathToHashKeys(item.partialPath);
						forEach(prefixKeys, (key) => {
							altsHashes[altIdx][key] = true;
						});
					});
				}
			}
		}
	}
	return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
	const visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
	ruleGrammar.accept(visitor);
	return lookAheadSequenceFromAlternatives(visitor.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
	const insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
	ruleGrammar.accept(insideDefVisitor);
	const insideDef = insideDefVisitor.result;
	const afterDef = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType).startWalking();
	return lookAheadSequenceFromAlternatives([new Alternative({ definition: insideDef }), new Alternative({ definition: afterDef })], k);
}
function containsPath(alternative, searchPath) {
	compareOtherPath: for (let i = 0; i < alternative.length; i++) {
		const otherPath = alternative[i];
		if (otherPath.length !== searchPath.length) continue;
		for (let j = 0; j < otherPath.length; j++) {
			const searchTok = searchPath[j];
			const otherTok = otherPath[j];
			if ((searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== void 0) === false) continue compareOtherPath;
		}
		return true;
	}
	return false;
}
function isStrictPrefixOfPath(prefix, other) {
	return prefix.length < other.length && every(prefix, (tokType, idx) => {
		const otherTokType = other[idx];
		return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
	});
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
	return every(lookAheadPaths, (singleAltPaths) => every(singleAltPaths, (singlePath) => every(singlePath, (token) => isEmpty(token.categoryMatches))));
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/checks.js
function validateLookahead(options) {
	const lookaheadValidationErrorMessages = options.lookaheadStrategy.validate({
		rules: options.rules,
		tokenTypes: options.tokenTypes,
		grammarName: options.grammarName
	});
	return map(lookaheadValidationErrorMessages, (errorMessage) => Object.assign({ type: ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION }, errorMessage));
}
function validateGrammar$1(topLevels, tokenTypes, errMsgProvider, grammarName) {
	const duplicateErrors = flatMap(topLevels, (currTopLevel) => validateDuplicateProductions(currTopLevel, errMsgProvider));
	const termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
	const tooManyAltsErrors = flatMap(topLevels, (curRule) => validateTooManyAlts(curRule, errMsgProvider));
	const duplicateRulesError = flatMap(topLevels, (curRule) => validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider));
	return duplicateErrors.concat(termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError);
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
	const collectorVisitor = new OccurrenceValidationCollector();
	topLevelRule.accept(collectorVisitor);
	const allRuleProductions = collectorVisitor.allProductions;
	const productionGroups = groupBy(allRuleProductions, identifyProductionForDuplicates);
	const duplicates = pickBy(productionGroups, (currGroup) => {
		return currGroup.length > 1;
	});
	return map(values(duplicates), (currDuplicates) => {
		const firstProd = head(currDuplicates);
		const msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
		const dslName = getProductionDslName(firstProd);
		const defError = {
			message: msg,
			type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
			ruleName: topLevelRule.name,
			dslName,
			occurrence: firstProd.idx
		};
		const param = getExtraProductionArgument(firstProd);
		if (param) defError.parameter = param;
		return defError;
	});
}
function identifyProductionForDuplicates(prod) {
	return `${getProductionDslName(prod)}_#_${prod.idx}_#_${getExtraProductionArgument(prod)}`;
}
function getExtraProductionArgument(prod) {
	if (prod instanceof Terminal) return prod.terminalType.name;
	else if (prod instanceof NonTerminal) return prod.nonTerminalName;
	else return "";
}
var OccurrenceValidationCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.allProductions = [];
	}
	visitNonTerminal(subrule) {
		this.allProductions.push(subrule);
	}
	visitOption(option) {
		this.allProductions.push(option);
	}
	visitRepetitionWithSeparator(manySep) {
		this.allProductions.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.allProductions.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.allProductions.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.allProductions.push(many);
	}
	visitAlternation(or) {
		this.allProductions.push(or);
	}
	visitTerminal(terminal) {
		this.allProductions.push(terminal);
	}
};
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
	const errors = [];
	if (reduce(allRules, (result, curRule) => {
		if (curRule.name === rule.name) return result + 1;
		return result;
	}, 0) > 1) {
		const errMsg = errMsgProvider.buildDuplicateRuleNameError({
			topLevelRule: rule,
			grammarName: className
		});
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
			ruleName: rule.name
		});
	}
	return errors;
}
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
	const errors = [];
	let errMsg;
	if (!includes(definedRulesNames, ruleName)) {
		errMsg = `Invalid rule override, rule: ->${ruleName}<- cannot be overridden in the grammar: ->${className}<-as it is not defined in any of the super grammars `;
		errors.push({
			message: errMsg,
			type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
			ruleName
		});
	}
	return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path = []) {
	const errors = [];
	const nextNonTerminals = getFirstNoneTerminal(currRule.definition);
	if (isEmpty(nextNonTerminals)) return [];
	else {
		const ruleName = topRule.name;
		if (includes(nextNonTerminals, topRule)) errors.push({
			message: errMsgProvider.buildLeftRecursionError({
				topLevelRule: topRule,
				leftRecursionPath: path
			}),
			type: ParserDefinitionErrorType.LEFT_RECURSION,
			ruleName
		});
		const errorsFromNextSteps = flatMap(difference(nextNonTerminals, path.concat([topRule])), (currRefRule) => {
			const newPath = clone(path);
			newPath.push(currRefRule);
			return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
		});
		return errors.concat(errorsFromNextSteps);
	}
}
function getFirstNoneTerminal(definition) {
	let result = [];
	if (isEmpty(definition)) return result;
	const firstProd = head(definition);
	/* istanbul ignore else */
	if (firstProd instanceof NonTerminal) result.push(firstProd.referencedRule);
	else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) result = result.concat(getFirstNoneTerminal(firstProd.definition));
	else if (firstProd instanceof Alternation) result = flatten(map(firstProd.definition, (currSubDef) => getFirstNoneTerminal(currSubDef.definition)));
	else if (firstProd instanceof Terminal) {} else throw Error("non exhaustive match");
	const isFirstOptional = isOptionalProd(firstProd);
	const hasMore = definition.length > 1;
	if (isFirstOptional && hasMore) {
		const rest = drop(definition);
		return result.concat(getFirstNoneTerminal(rest));
	} else return result;
}
var OrCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.alternations = [];
	}
	visitAlternation(node) {
		this.alternations.push(node);
	}
};
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	const ors = orCollector.alternations;
	return flatMap(ors, (currOr) => {
		return flatMap(dropRight(currOr.definition), (currAlternative, currAltIdx) => {
			if (isEmpty(nextPossibleTokensAfter([currAlternative], [], tokenStructuredMatcher, 1))) return [{
				message: errMsgProvider.buildEmptyAlternationError({
					topLevelRule,
					alternation: currOr,
					emptyChoiceIdx: currAltIdx
				}),
				type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
				ruleName: topLevelRule.name,
				occurrence: currOr.idx,
				alternative: currAltIdx + 1
			}];
			else return [];
		});
	});
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	let ors = orCollector.alternations;
	ors = reject(ors, (currOr) => currOr.ignoreAmbiguities === true);
	return flatMap(ors, (currOr) => {
		const currOccurrence = currOr.idx;
		const alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, currOr.maxLookahead || globalMaxLookahead, currOr);
		const altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		const altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
		return altsAmbiguityErrors.concat(altsPrefixAmbiguityErrors);
	});
}
var RepetitionCollector = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.allProductions = [];
	}
	visitRepetitionWithSeparator(manySep) {
		this.allProductions.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.allProductions.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.allProductions.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.allProductions.push(many);
	}
};
function validateTooManyAlts(topLevelRule, errMsgProvider) {
	const orCollector = new OrCollector();
	topLevelRule.accept(orCollector);
	const ors = orCollector.alternations;
	return flatMap(ors, (currOr) => {
		if (currOr.definition.length > 255) return [{
			message: errMsgProvider.buildTooManyAlternativesError({
				topLevelRule,
				alternation: currOr
			}),
			type: ParserDefinitionErrorType.TOO_MANY_ALTS,
			ruleName: topLevelRule.name,
			occurrence: currOr.idx
		}];
		else return [];
	});
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
	const errors = [];
	forEach(topLevelRules, (currTopRule) => {
		const collectorVisitor = new RepetitionCollector();
		currTopRule.accept(collectorVisitor);
		const allRuleProductions = collectorVisitor.allProductions;
		forEach(allRuleProductions, (currProd) => {
			const prodType = getProdType(currProd);
			const actualMaxLookahead = currProd.maxLookahead || maxLookahead;
			const currOccurrence = currProd.idx;
			const pathsInsideProduction = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead)[0];
			if (isEmpty(flatten(pathsInsideProduction))) {
				const errMsg = errMsgProvider.buildEmptyRepetitionError({
					topLevelRule: currTopRule,
					repetition: currProd
				});
				errors.push({
					message: errMsg,
					type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
					ruleName: currTopRule.name
				});
			}
		});
	});
	return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
	const foundAmbiguousPaths = [];
	const identicalAmbiguities = reduce(alternatives, (result, currAlt, currAltIdx) => {
		if (alternation.definition[currAltIdx].ignoreAmbiguities === true) return result;
		forEach(currAlt, (currPath) => {
			const altsCurrPathAppearsIn = [currAltIdx];
			forEach(alternatives, (currOtherAlt, currOtherAltIdx) => {
				if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) altsCurrPathAppearsIn.push(currOtherAltIdx);
			});
			if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
				foundAmbiguousPaths.push(currPath);
				result.push({
					alts: altsCurrPathAppearsIn,
					path: currPath
				});
			}
		});
		return result;
	}, []);
	return map(identicalAmbiguities, (currAmbDescriptor) => {
		const ambgIndices = map(currAmbDescriptor.alts, (currAltIdx) => currAltIdx + 1);
		return {
			message: errMsgProvider.buildAlternationAmbiguityError({
				topLevelRule: rule,
				alternation,
				ambiguityIndices: ambgIndices,
				prefixPath: currAmbDescriptor.path
			}),
			type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
			ruleName: rule.name,
			occurrence: alternation.idx,
			alternatives: currAmbDescriptor.alts
		};
	});
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
	const pathsAndIndices = reduce(alternatives, (result, currAlt, idx) => {
		const currPathsAndIdx = map(currAlt, (currPath) => {
			return {
				idx,
				path: currPath
			};
		});
		return result.concat(currPathsAndIdx);
	}, []);
	return compact(flatMap(pathsAndIndices, (currPathAndIdx) => {
		if (alternation.definition[currPathAndIdx.idx].ignoreAmbiguities === true) return [];
		const targetIdx = currPathAndIdx.idx;
		const targetPath = currPathAndIdx.path;
		const prefixAmbiguitiesPathsAndIndices = filter(pathsAndIndices, (searchPathAndIdx) => {
			return alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && isStrictPrefixOfPath(searchPathAndIdx.path, targetPath);
		});
		return map(prefixAmbiguitiesPathsAndIndices, (currAmbPathAndIdx) => {
			const ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
			const occurrence = alternation.idx === 0 ? "" : alternation.idx;
			return {
				message: errMsgProvider.buildAlternationPrefixAmbiguityError({
					topLevelRule: rule,
					alternation,
					ambiguityIndices: ambgIndices,
					prefixPath: currAmbPathAndIdx.path
				}),
				type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
				ruleName: rule.name,
				occurrence,
				alternatives: ambgIndices
			};
		});
	}));
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
	const errors = [];
	const tokenNames = map(tokenTypes, (currToken) => currToken.name);
	forEach(topLevels, (currRule) => {
		const currRuleName = currRule.name;
		if (includes(tokenNames, currRuleName)) {
			const errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
			errors.push({
				message: errMsg,
				type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
				ruleName: currRuleName
			});
		}
	});
	return errors;
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/gast/gast_resolver_public.js
function resolveGrammar(options) {
	const actualOptions = defaults(options, { errMsgProvider: defaultGrammarResolverErrorProvider });
	const topRulesTable = {};
	forEach(options.rules, (rule) => {
		topRulesTable[rule.name] = rule;
	});
	return resolveGrammar$1(topRulesTable, actualOptions.errMsgProvider);
}
function validateGrammar(options) {
	options = defaults(options, { errMsgProvider: defaultGrammarValidatorErrorProvider });
	return validateGrammar$1(options.rules, options.tokenTypes, options.errMsgProvider, options.grammarName);
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/exceptions_public.js
var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
var EARLY_EXIT_EXCEPTION = "EarlyExitException";
var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
var RECOGNITION_EXCEPTION_NAMES = [
	MISMATCHED_TOKEN_EXCEPTION,
	NO_VIABLE_ALT_EXCEPTION,
	EARLY_EXIT_EXCEPTION,
	NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
function isRecognitionException(error) {
	return includes(RECOGNITION_EXCEPTION_NAMES, error.name);
}
var RecognitionException = class extends Error {
	constructor(message, token) {
		super(message);
		this.token = token;
		this.resyncedTokens = [];
		Object.setPrototypeOf(this, new.target.prototype);
		/* istanbul ignore next - V8 workaround to remove constructor from stacktrace when typescript target is ES5 */
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
};
var MismatchedTokenException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = MISMATCHED_TOKEN_EXCEPTION;
	}
};
var NoViableAltException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = NO_VIABLE_ALT_EXCEPTION;
	}
};
var NotAllInputParsedException = class extends RecognitionException {
	constructor(message, token) {
		super(message, token);
		this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
	}
};
var EarlyExitException = class extends RecognitionException {
	constructor(message, token, previousToken) {
		super(message, token);
		this.previousToken = previousToken;
		this.name = EARLY_EXIT_EXCEPTION;
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/recoverable.js
var EOF_FOLLOW_KEY = {};
var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
var InRuleRecoveryException = class extends Error {
	constructor(message) {
		super(message);
		this.name = IN_RULE_RECOVERY_EXCEPTION;
	}
};
/**
* This trait is responsible for the error recovery and fault tolerant logic
*/
var Recoverable = class {
	initRecoverable(config) {
		this.firstAfterRepMap = {};
		this.resyncFollows = {};
		this.recoveryEnabled = has(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled;
		if (this.recoveryEnabled) this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
	}
	getTokenToInsert(tokType) {
		const tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
		tokToInsert.isInsertedInRecovery = true;
		return tokToInsert;
	}
	canTokenTypeBeInsertedInRecovery(tokType) {
		return true;
	}
	canTokenTypeBeDeletedInRecovery(tokType) {
		return true;
	}
	tryInRepetitionRecovery(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
		const reSyncTokType = this.findReSyncTokenType();
		const savedLexerState = this.exportLexerState();
		const resyncedTokens = [];
		let passedResyncPoint = false;
		const nextTokenWithoutResync = this.LA(1);
		let currToken = this.LA(1);
		const generateErrorMessage = () => {
			const previousToken = this.LA(0);
			const error = new MismatchedTokenException(this.errorMessageProvider.buildMismatchTokenMessage({
				expected: expectedTokType,
				actual: nextTokenWithoutResync,
				previous: previousToken,
				ruleName: this.getCurrRuleFullName()
			}), nextTokenWithoutResync, this.LA(0));
			error.resyncedTokens = dropRight(resyncedTokens);
			this.SAVE_ERROR(error);
		};
		while (!passedResyncPoint) if (this.tokenMatcher(currToken, expectedTokType)) {
			generateErrorMessage();
			return;
		} else if (lookAheadFunc.call(this)) {
			generateErrorMessage();
			grammarRule.apply(this, grammarRuleArgs);
			return;
		} else if (this.tokenMatcher(currToken, reSyncTokType)) passedResyncPoint = true;
		else {
			currToken = this.SKIP_TOKEN();
			this.addToResyncTokens(currToken, resyncedTokens);
		}
		this.importLexerState(savedLexerState);
	}
	shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck) {
		if (notStuck === false) return false;
		if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) return false;
		if (this.isBackTracking()) return false;
		if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) return false;
		return true;
	}
	getFollowsForInRuleRecovery(tokType, tokIdxInRule) {
		const grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
		return this.getNextPossibleTokenTypes(grammarPath);
	}
	tryInRuleRecovery(expectedTokType, follows) {
		if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) return this.getTokenToInsert(expectedTokType);
		if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
			const nextTok = this.SKIP_TOKEN();
			this.consumeToken();
			return nextTok;
		}
		throw new InRuleRecoveryException("sad sad panda");
	}
	canPerformInRuleRecovery(expectedToken, follows) {
		return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
	}
	canRecoverWithSingleTokenInsertion(expectedTokType, follows) {
		if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) return false;
		if (isEmpty(follows)) return false;
		const mismatchedTok = this.LA(1);
		return find(follows, (possibleFollowsTokType) => {
			return this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
		}) !== void 0;
	}
	canRecoverWithSingleTokenDeletion(expectedTokType) {
		if (!this.canTokenTypeBeDeletedInRecovery(expectedTokType)) return false;
		return this.tokenMatcher(this.LA(2), expectedTokType);
	}
	isInCurrentRuleReSyncSet(tokenTypeIdx) {
		const followKey = this.getCurrFollowKey();
		const currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
		return includes(currentRuleReSyncSet, tokenTypeIdx);
	}
	findReSyncTokenType() {
		const allPossibleReSyncTokTypes = this.flattenFollowSet();
		let nextToken = this.LA(1);
		let k = 2;
		while (true) {
			const foundMatch = find(allPossibleReSyncTokTypes, (resyncTokType) => {
				return tokenMatcher(nextToken, resyncTokType);
			});
			if (foundMatch !== void 0) return foundMatch;
			nextToken = this.LA(k);
			k++;
		}
	}
	getCurrFollowKey() {
		if (this.RULE_STACK.length === 1) return EOF_FOLLOW_KEY;
		const currRuleShortName = this.getLastExplicitRuleShortName();
		const currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
		const prevRuleShortName = this.getPreviousExplicitRuleShortName();
		return {
			ruleName: this.shortRuleNameToFullName(currRuleShortName),
			idxInCallingRule: currRuleIdx,
			inRule: this.shortRuleNameToFullName(prevRuleShortName)
		};
	}
	buildFullFollowKeyStack() {
		const explicitRuleStack = this.RULE_STACK;
		const explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
		return map(explicitRuleStack, (ruleName, idx) => {
			if (idx === 0) return EOF_FOLLOW_KEY;
			return {
				ruleName: this.shortRuleNameToFullName(ruleName),
				idxInCallingRule: explicitOccurrenceStack[idx],
				inRule: this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
			};
		});
	}
	flattenFollowSet() {
		return flatten(map(this.buildFullFollowKeyStack(), (currKey) => {
			return this.getFollowSetFromFollowKey(currKey);
		}));
	}
	getFollowSetFromFollowKey(followKey) {
		if (followKey === EOF_FOLLOW_KEY) return [EOF];
		const followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
		return this.resyncFollows[followName];
	}
	addToResyncTokens(token, resyncTokens) {
		if (!this.tokenMatcher(token, EOF)) resyncTokens.push(token);
		return resyncTokens;
	}
	reSyncTo(tokType) {
		const resyncedTokens = [];
		let nextTok = this.LA(1);
		while (this.tokenMatcher(nextTok, tokType) === false) {
			nextTok = this.SKIP_TOKEN();
			this.addToResyncTokens(nextTok, resyncedTokens);
		}
		return dropRight(resyncedTokens);
	}
	attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {}
	getCurrentGrammarPath(tokType, tokIdxInRule) {
		return {
			ruleStack: this.getHumanReadableRuleStack(),
			occurrenceStack: clone(this.RULE_OCCURRENCE_STACK),
			lastTok: tokType,
			lastTokOccurrence: tokIdxInRule
		};
	}
	getHumanReadableRuleStack() {
		return map(this.RULE_STACK, (currShortName) => this.shortRuleNameToFullName(currShortName));
	}
};
function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
	const key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
	let firstAfterRepInfo = this.firstAfterRepMap[key];
	if (firstAfterRepInfo === void 0) {
		const currRuleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[currRuleName];
		firstAfterRepInfo = new nextToksWalker(ruleGrammar, prodOccurrence).startWalking();
		this.firstAfterRepMap[key] = firstAfterRepInfo;
	}
	let expectTokAfterLastMatch = firstAfterRepInfo.token;
	let nextTokIdx = firstAfterRepInfo.occurrence;
	const isEndOfRule = firstAfterRepInfo.isEndOfRule;
	if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === void 0) {
		expectTokAfterLastMatch = EOF;
		nextTokIdx = 1;
	}
	if (expectTokAfterLastMatch === void 0 || nextTokIdx === void 0) return;
	if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/keys.js
var AT_LEAST_ONE_IDX = 1024;
var MANY_SEP_IDX = 1280;
var AT_LEAST_ONE_SEP_IDX = 1536;
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
	return occurrence | dslMethodIdx | ruleIdx;
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/grammar/llk_lookahead.js
var LLkLookaheadStrategy = class {
	constructor(options) {
		var _a;
		this.maxLookahead = (_a = options === null || options === void 0 ? void 0 : options.maxLookahead) !== null && _a !== void 0 ? _a : DEFAULT_PARSER_CONFIG.maxLookahead;
	}
	validate(options) {
		const leftRecursionErrors = this.validateNoLeftRecursion(options.rules);
		if (isEmpty(leftRecursionErrors)) {
			const emptyAltErrors = this.validateEmptyOrAlternatives(options.rules);
			const ambiguousAltsErrors = this.validateAmbiguousAlternationAlternatives(options.rules, this.maxLookahead);
			const emptyRepetitionErrors = this.validateSomeNonEmptyLookaheadPath(options.rules, this.maxLookahead);
			return [
				...leftRecursionErrors,
				...emptyAltErrors,
				...ambiguousAltsErrors,
				...emptyRepetitionErrors
			];
		}
		return leftRecursionErrors;
	}
	validateNoLeftRecursion(rules) {
		return flatMap(rules, (currTopRule) => validateNoLeftRecursion(currTopRule, currTopRule, defaultGrammarValidatorErrorProvider));
	}
	validateEmptyOrAlternatives(rules) {
		return flatMap(rules, (currTopRule) => validateEmptyOrAlternative(currTopRule, defaultGrammarValidatorErrorProvider));
	}
	validateAmbiguousAlternationAlternatives(rules, maxLookahead) {
		return flatMap(rules, (currTopRule) => validateAmbiguousAlternationAlternatives(currTopRule, maxLookahead, defaultGrammarValidatorErrorProvider));
	}
	validateSomeNonEmptyLookaheadPath(rules, maxLookahead) {
		return validateSomeNonEmptyLookaheadPath(rules, maxLookahead, defaultGrammarValidatorErrorProvider);
	}
	buildLookaheadForAlternation(options) {
		return buildLookaheadFuncForOr(options.prodOccurrence, options.rule, options.maxLookahead, options.hasPredicates, options.dynamicTokensEnabled, buildAlternativesLookAheadFunc);
	}
	buildLookaheadForOptional(options) {
		return buildLookaheadFuncForOptionalProd(options.prodOccurrence, options.rule, options.maxLookahead, options.dynamicTokensEnabled, getProdType(options.prodType), buildSingleAlternativeLookaheadFunction);
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/looksahead.js
/**
* Trait responsible for the lookahead related utilities and optimizations.
*/
var LooksAhead = class {
	initLooksAhead(config) {
		this.dynamicTokensEnabled = has(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
		this.maxLookahead = has(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
		this.lookaheadStrategy = has(config, "lookaheadStrategy") ? config.lookaheadStrategy : new LLkLookaheadStrategy({ maxLookahead: this.maxLookahead });
		this.lookAheadFuncsCache = /* @__PURE__ */ new Map();
	}
	preComputeLookaheadFunctions(rules) {
		forEach(rules, (currRule) => {
			this.TRACE_INIT(`${currRule.name} Rule Lookahead`, () => {
				const { alternation, repetition, option, repetitionMandatory, repetitionMandatoryWithSeparator, repetitionWithSeparator } = collectMethods(currRule);
				forEach(alternation, (currProd) => {
					const prodIdx = currProd.idx === 0 ? "" : currProd.idx;
					this.TRACE_INIT(`${getProductionDslName(currProd)}${prodIdx}`, () => {
						const laFunc = this.lookaheadStrategy.buildLookaheadForAlternation({
							prodOccurrence: currProd.idx,
							rule: currRule,
							maxLookahead: currProd.maxLookahead || this.maxLookahead,
							hasPredicates: currProd.hasPredicates,
							dynamicTokensEnabled: this.dynamicTokensEnabled
						});
						const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[currRule.name], 256, currProd.idx);
						this.setLaFuncCache(key, laFunc);
					});
				});
				forEach(repetition, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, 768, "Repetition", currProd.maxLookahead, getProductionDslName(currProd));
				});
				forEach(option, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, 512, "Option", currProd.maxLookahead, getProductionDslName(currProd));
				});
				forEach(repetitionMandatory, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, "RepetitionMandatory", currProd.maxLookahead, getProductionDslName(currProd));
				});
				forEach(repetitionMandatoryWithSeparator, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, "RepetitionMandatoryWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
				});
				forEach(repetitionWithSeparator, (currProd) => {
					this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, "RepetitionWithSeparator", currProd.maxLookahead, getProductionDslName(currProd));
				});
			});
		});
	}
	computeLookaheadFunc(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
		this.TRACE_INIT(`${dslMethodName}${prodOccurrence === 0 ? "" : prodOccurrence}`, () => {
			const laFunc = this.lookaheadStrategy.buildLookaheadForOptional({
				prodOccurrence,
				rule,
				maxLookahead: prodMaxLookahead || this.maxLookahead,
				dynamicTokensEnabled: this.dynamicTokensEnabled,
				prodType
			});
			const key = getKeyForAutomaticLookahead(this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
			this.setLaFuncCache(key, laFunc);
		});
	}
	getKeyForAutomaticLookahead(dslMethodIdx, occurrence) {
		return getKeyForAutomaticLookahead(this.getLastExplicitRuleShortName(), dslMethodIdx, occurrence);
	}
	getLaFuncFromCache(key) {
		return this.lookAheadFuncsCache.get(key);
	}
	/* istanbul ignore next */
	setLaFuncCache(key, value) {
		this.lookAheadFuncsCache.set(key, value);
	}
};
var DslMethodsCollectorVisitor = class extends GAstVisitor {
	constructor() {
		super(...arguments);
		this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	reset() {
		this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	visitOption(option) {
		this.dslMethods.option.push(option);
	}
	visitRepetitionWithSeparator(manySep) {
		this.dslMethods.repetitionWithSeparator.push(manySep);
	}
	visitRepetitionMandatory(atLeastOne) {
		this.dslMethods.repetitionMandatory.push(atLeastOne);
	}
	visitRepetitionMandatoryWithSeparator(atLeastOneSep) {
		this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
	}
	visitRepetition(many) {
		this.dslMethods.repetition.push(many);
	}
	visitAlternation(or) {
		this.dslMethods.alternation.push(or);
	}
};
var collectorVisitor = new DslMethodsCollectorVisitor();
function collectMethods(rule) {
	collectorVisitor.reset();
	rule.accept(collectorVisitor);
	const dslMethods = collectorVisitor.dslMethods;
	collectorVisitor.reset();
	return dslMethods;
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/cst/cst.js
/**
* This nodeLocation tracking is not efficient and should only be used
* when error recovery is enabled or the Token Vector contains virtual Tokens
* (e.g, Python Indent/Outdent)
* As it executes the calculation for every single terminal/nonTerminal
* and does not rely on the fact the token vector is **sorted**
*/
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) currNodeLocation.endOffset = newLocationInfo.endOffset;
}
/**
* This nodeLocation tracking is not efficient and should only be used
* when error recovery is enabled or the Token Vector contains virtual Tokens
* (e.g, Python Indent/Outdent)
* As it executes the calculation for every single terminal/nonTerminal
* and does not rely on the fact the token vector is **sorted**
*/
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
	if (isNaN(currNodeLocation.startOffset) === true) {
		currNodeLocation.startOffset = newLocationInfo.startOffset;
		currNodeLocation.startColumn = newLocationInfo.startColumn;
		currNodeLocation.startLine = newLocationInfo.startLine;
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	} else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
		currNodeLocation.endOffset = newLocationInfo.endOffset;
		currNodeLocation.endColumn = newLocationInfo.endColumn;
		currNodeLocation.endLine = newLocationInfo.endLine;
	}
}
function addTerminalToCst(node, token, tokenTypeName) {
	if (node.children[tokenTypeName] === void 0) node.children[tokenTypeName] = [token];
	else node.children[tokenTypeName].push(token);
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
	if (node.children[ruleName] === void 0) node.children[ruleName] = [ruleResult];
	else node.children[ruleName].push(ruleResult);
}
//#endregion
//#region node_modules/chevrotain/lib/src/lang/lang_extensions.js
var NAME = "name";
function defineNameProp(obj, nameValue) {
	Object.defineProperty(obj, NAME, {
		enumerable: false,
		configurable: true,
		writable: false,
		value: nameValue
	});
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/cst/cst_visitor.js
function defaultVisit(ctx, param) {
	const childrenNames = keys(ctx);
	const childrenNamesLength = childrenNames.length;
	for (let i = 0; i < childrenNamesLength; i++) {
		const currChildArray = ctx[childrenNames[i]];
		const currChildArrayLength = currChildArray.length;
		for (let j = 0; j < currChildArrayLength; j++) {
			const currChild = currChildArray[j];
			if (currChild.tokenTypeIdx === void 0) this[currChild.name](currChild.children, param);
		}
	}
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
	const derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
	derivedConstructor.prototype = {
		visit: function(cstNode, param) {
			if (isArray(cstNode)) cstNode = cstNode[0];
			if (isUndefined(cstNode)) return;
			return this[cstNode.name](cstNode.children, param);
		},
		validateVisitor: function() {
			const semanticDefinitionErrors = validateVisitor(this, ruleNames);
			if (!isEmpty(semanticDefinitionErrors)) {
				const errorMessages = map(semanticDefinitionErrors, (currDefError) => currDefError.msg);
				throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:\n\t${errorMessages.join("\n\n").replace(/\n/g, "\n	")}`);
			}
		}
	};
	derivedConstructor.prototype.constructor = derivedConstructor;
	derivedConstructor._RULE_NAMES = ruleNames;
	return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
	const derivedConstructor = function() {};
	defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
	const withDefaultsProto = Object.create(baseConstructor.prototype);
	forEach(ruleNames, (ruleName) => {
		withDefaultsProto[ruleName] = defaultVisit;
	});
	derivedConstructor.prototype = withDefaultsProto;
	derivedConstructor.prototype.constructor = derivedConstructor;
	return derivedConstructor;
}
var CstVisitorDefinitionError;
(function(CstVisitorDefinitionError) {
	CstVisitorDefinitionError[CstVisitorDefinitionError["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
	CstVisitorDefinitionError[CstVisitorDefinitionError["MISSING_METHOD"] = 1] = "MISSING_METHOD";
})(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
function validateVisitor(visitorInstance, ruleNames) {
	return validateMissingCstMethods(visitorInstance, ruleNames);
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
	const missingRuleNames = filter(ruleNames, (currRuleName) => {
		return isFunction(visitorInstance[currRuleName]) === false;
	});
	return compact(map(missingRuleNames, (currRuleName) => {
		return {
			msg: `Missing visitor method: <${currRuleName}> on ${visitorInstance.constructor.name} CST Visitor.`,
			type: CstVisitorDefinitionError.MISSING_METHOD,
			methodName: currRuleName
		};
	}));
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/tree_builder.js
/**
* This trait is responsible for the CST building logic.
*/
var TreeBuilder = class {
	initTreeBuilder(config) {
		this.CST_STACK = [];
		this.outputCst = config.outputCst;
		this.nodeLocationTracking = has(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
		if (!this.outputCst) {
			this.cstInvocationStateUpdate = noop;
			this.cstFinallyStateUpdate = noop;
			this.cstPostTerminal = noop;
			this.cstPostNonTerminal = noop;
			this.cstPostRule = noop;
		} else if (/full/i.test(this.nodeLocationTracking)) {
			if (this.recoveryEnabled) {
				this.setNodeLocationFromToken = setNodeLocationFull;
				this.setNodeLocationFromNode = setNodeLocationFull;
				this.cstPostRule = noop;
				this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
			} else {
				this.setNodeLocationFromToken = noop;
				this.setNodeLocationFromNode = noop;
				this.cstPostRule = this.cstPostRuleFull;
				this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
			}
		} else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
			if (this.recoveryEnabled) {
				this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
				this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
				this.cstPostRule = noop;
				this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
			} else {
				this.setNodeLocationFromToken = noop;
				this.setNodeLocationFromNode = noop;
				this.cstPostRule = this.cstPostRuleOnlyOffset;
				this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
			}
		} else if (/none/i.test(this.nodeLocationTracking)) {
			this.setNodeLocationFromToken = noop;
			this.setNodeLocationFromNode = noop;
			this.cstPostRule = noop;
			this.setInitialNodeLocation = noop;
		} else throw Error(`Invalid <nodeLocationTracking> config option: "${config.nodeLocationTracking}"`);
	}
	setInitialNodeLocationOnlyOffsetRecovery(cstNode) {
		cstNode.location = {
			startOffset: NaN,
			endOffset: NaN
		};
	}
	setInitialNodeLocationOnlyOffsetRegular(cstNode) {
		cstNode.location = {
			startOffset: this.LA(1).startOffset,
			endOffset: NaN
		};
	}
	setInitialNodeLocationFullRecovery(cstNode) {
		cstNode.location = {
			startOffset: NaN,
			startLine: NaN,
			startColumn: NaN,
			endOffset: NaN,
			endLine: NaN,
			endColumn: NaN
		};
	}
	/**
	*  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
	
	* @param cstNode
	*/
	setInitialNodeLocationFullRegular(cstNode) {
		const nextToken = this.LA(1);
		cstNode.location = {
			startOffset: nextToken.startOffset,
			startLine: nextToken.startLine,
			startColumn: nextToken.startColumn,
			endOffset: NaN,
			endLine: NaN,
			endColumn: NaN
		};
	}
	cstInvocationStateUpdate(fullRuleName) {
		const cstNode = {
			name: fullRuleName,
			children: Object.create(null)
		};
		this.setInitialNodeLocation(cstNode);
		this.CST_STACK.push(cstNode);
	}
	cstFinallyStateUpdate() {
		this.CST_STACK.pop();
	}
	cstPostRuleFull(ruleCstNode) {
		const prevToken = this.LA(0);
		const loc = ruleCstNode.location;
		if (loc.startOffset <= prevToken.startOffset === true) {
			loc.endOffset = prevToken.endOffset;
			loc.endLine = prevToken.endLine;
			loc.endColumn = prevToken.endColumn;
		} else {
			loc.startOffset = NaN;
			loc.startLine = NaN;
			loc.startColumn = NaN;
		}
	}
	cstPostRuleOnlyOffset(ruleCstNode) {
		const prevToken = this.LA(0);
		const loc = ruleCstNode.location;
		if (loc.startOffset <= prevToken.startOffset === true) loc.endOffset = prevToken.endOffset;
		else loc.startOffset = NaN;
	}
	cstPostTerminal(key, consumedToken) {
		const rootCst = this.CST_STACK[this.CST_STACK.length - 1];
		addTerminalToCst(rootCst, consumedToken, key);
		this.setNodeLocationFromToken(rootCst.location, consumedToken);
	}
	cstPostNonTerminal(ruleCstResult, ruleName) {
		const preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
		addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
		this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
	}
	getBaseCstVisitorConstructor() {
		if (isUndefined(this.baseCstVisitorConstructor)) {
			const newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys(this.gastProductionsCache));
			this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
			return newBaseCstVisitorConstructor;
		}
		return this.baseCstVisitorConstructor;
	}
	getBaseCstVisitorConstructorWithDefaults() {
		if (isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
			const newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
			this.baseCstVisitorWithDefaultsConstructor = newConstructor;
			return newConstructor;
		}
		return this.baseCstVisitorWithDefaultsConstructor;
	}
	getLastExplicitRuleShortName() {
		const ruleStack = this.RULE_STACK;
		return ruleStack[ruleStack.length - 1];
	}
	getPreviousExplicitRuleShortName() {
		const ruleStack = this.RULE_STACK;
		return ruleStack[ruleStack.length - 2];
	}
	getLastExplicitRuleOccurrenceIndex() {
		const occurrenceStack = this.RULE_OCCURRENCE_STACK;
		return occurrenceStack[occurrenceStack.length - 1];
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/lexer_adapter.js
/**
* Trait responsible abstracting over the interaction with Lexer output (Token vector).
*
* This could be generalized to support other kinds of lexers, e.g.
* - Just in Time Lexing / Lexer-Less parsing.
* - Streaming Lexer.
*/
var LexerAdapter = class {
	initLexerAdapter() {
		this.tokVector = [];
		this.tokVectorLength = 0;
		this.currIdx = -1;
	}
	set input(newInput) {
		if (this.selfAnalysisDone !== true) throw Error(`Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.`);
		this.reset();
		this.tokVector = newInput;
		this.tokVectorLength = newInput.length;
	}
	get input() {
		return this.tokVector;
	}
	SKIP_TOKEN() {
		if (this.currIdx <= this.tokVector.length - 2) {
			this.consumeToken();
			return this.LA(1);
		} else return END_OF_FILE;
	}
	LA(howMuch) {
		const soughtIdx = this.currIdx + howMuch;
		if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) return END_OF_FILE;
		else return this.tokVector[soughtIdx];
	}
	consumeToken() {
		this.currIdx++;
	}
	exportLexerState() {
		return this.currIdx;
	}
	importLexerState(newState) {
		this.currIdx = newState;
	}
	resetLexerState() {
		this.currIdx = -1;
	}
	moveToTerminatedState() {
		this.currIdx = this.tokVector.length - 1;
	}
	getLexerPosition() {
		return this.exportLexerState();
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_api.js
/**
* This trait is responsible for implementing the public API
* for defining Chevrotain parsers, i.e:
* - CONSUME
* - RULE
* - OPTION
* - ...
*/
var RecognizerApi = class {
	ACTION(impl) {
		return impl.call(this);
	}
	consume(idx, tokType, options) {
		return this.consumeInternal(tokType, idx, options);
	}
	subrule(idx, ruleToCall, options) {
		return this.subruleInternal(ruleToCall, idx, options);
	}
	option(idx, actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, idx);
	}
	or(idx, altsOrOpts) {
		return this.orInternal(altsOrOpts, idx);
	}
	many(idx, actionORMethodDef) {
		return this.manyInternal(idx, actionORMethodDef);
	}
	atLeastOne(idx, actionORMethodDef) {
		return this.atLeastOneInternal(idx, actionORMethodDef);
	}
	CONSUME(tokType, options) {
		return this.consumeInternal(tokType, 0, options);
	}
	CONSUME1(tokType, options) {
		return this.consumeInternal(tokType, 1, options);
	}
	CONSUME2(tokType, options) {
		return this.consumeInternal(tokType, 2, options);
	}
	CONSUME3(tokType, options) {
		return this.consumeInternal(tokType, 3, options);
	}
	CONSUME4(tokType, options) {
		return this.consumeInternal(tokType, 4, options);
	}
	CONSUME5(tokType, options) {
		return this.consumeInternal(tokType, 5, options);
	}
	CONSUME6(tokType, options) {
		return this.consumeInternal(tokType, 6, options);
	}
	CONSUME7(tokType, options) {
		return this.consumeInternal(tokType, 7, options);
	}
	CONSUME8(tokType, options) {
		return this.consumeInternal(tokType, 8, options);
	}
	CONSUME9(tokType, options) {
		return this.consumeInternal(tokType, 9, options);
	}
	SUBRULE(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 0, options);
	}
	SUBRULE1(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 1, options);
	}
	SUBRULE2(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 2, options);
	}
	SUBRULE3(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 3, options);
	}
	SUBRULE4(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 4, options);
	}
	SUBRULE5(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 5, options);
	}
	SUBRULE6(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 6, options);
	}
	SUBRULE7(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 7, options);
	}
	SUBRULE8(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 8, options);
	}
	SUBRULE9(ruleToCall, options) {
		return this.subruleInternal(ruleToCall, 9, options);
	}
	OPTION(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 0);
	}
	OPTION1(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 1);
	}
	OPTION2(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 2);
	}
	OPTION3(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 3);
	}
	OPTION4(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 4);
	}
	OPTION5(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 5);
	}
	OPTION6(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 6);
	}
	OPTION7(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 7);
	}
	OPTION8(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 8);
	}
	OPTION9(actionORMethodDef) {
		return this.optionInternal(actionORMethodDef, 9);
	}
	OR(altsOrOpts) {
		return this.orInternal(altsOrOpts, 0);
	}
	OR1(altsOrOpts) {
		return this.orInternal(altsOrOpts, 1);
	}
	OR2(altsOrOpts) {
		return this.orInternal(altsOrOpts, 2);
	}
	OR3(altsOrOpts) {
		return this.orInternal(altsOrOpts, 3);
	}
	OR4(altsOrOpts) {
		return this.orInternal(altsOrOpts, 4);
	}
	OR5(altsOrOpts) {
		return this.orInternal(altsOrOpts, 5);
	}
	OR6(altsOrOpts) {
		return this.orInternal(altsOrOpts, 6);
	}
	OR7(altsOrOpts) {
		return this.orInternal(altsOrOpts, 7);
	}
	OR8(altsOrOpts) {
		return this.orInternal(altsOrOpts, 8);
	}
	OR9(altsOrOpts) {
		return this.orInternal(altsOrOpts, 9);
	}
	MANY(actionORMethodDef) {
		this.manyInternal(0, actionORMethodDef);
	}
	MANY1(actionORMethodDef) {
		this.manyInternal(1, actionORMethodDef);
	}
	MANY2(actionORMethodDef) {
		this.manyInternal(2, actionORMethodDef);
	}
	MANY3(actionORMethodDef) {
		this.manyInternal(3, actionORMethodDef);
	}
	MANY4(actionORMethodDef) {
		this.manyInternal(4, actionORMethodDef);
	}
	MANY5(actionORMethodDef) {
		this.manyInternal(5, actionORMethodDef);
	}
	MANY6(actionORMethodDef) {
		this.manyInternal(6, actionORMethodDef);
	}
	MANY7(actionORMethodDef) {
		this.manyInternal(7, actionORMethodDef);
	}
	MANY8(actionORMethodDef) {
		this.manyInternal(8, actionORMethodDef);
	}
	MANY9(actionORMethodDef) {
		this.manyInternal(9, actionORMethodDef);
	}
	MANY_SEP(options) {
		this.manySepFirstInternal(0, options);
	}
	MANY_SEP1(options) {
		this.manySepFirstInternal(1, options);
	}
	MANY_SEP2(options) {
		this.manySepFirstInternal(2, options);
	}
	MANY_SEP3(options) {
		this.manySepFirstInternal(3, options);
	}
	MANY_SEP4(options) {
		this.manySepFirstInternal(4, options);
	}
	MANY_SEP5(options) {
		this.manySepFirstInternal(5, options);
	}
	MANY_SEP6(options) {
		this.manySepFirstInternal(6, options);
	}
	MANY_SEP7(options) {
		this.manySepFirstInternal(7, options);
	}
	MANY_SEP8(options) {
		this.manySepFirstInternal(8, options);
	}
	MANY_SEP9(options) {
		this.manySepFirstInternal(9, options);
	}
	AT_LEAST_ONE(actionORMethodDef) {
		this.atLeastOneInternal(0, actionORMethodDef);
	}
	AT_LEAST_ONE1(actionORMethodDef) {
		return this.atLeastOneInternal(1, actionORMethodDef);
	}
	AT_LEAST_ONE2(actionORMethodDef) {
		this.atLeastOneInternal(2, actionORMethodDef);
	}
	AT_LEAST_ONE3(actionORMethodDef) {
		this.atLeastOneInternal(3, actionORMethodDef);
	}
	AT_LEAST_ONE4(actionORMethodDef) {
		this.atLeastOneInternal(4, actionORMethodDef);
	}
	AT_LEAST_ONE5(actionORMethodDef) {
		this.atLeastOneInternal(5, actionORMethodDef);
	}
	AT_LEAST_ONE6(actionORMethodDef) {
		this.atLeastOneInternal(6, actionORMethodDef);
	}
	AT_LEAST_ONE7(actionORMethodDef) {
		this.atLeastOneInternal(7, actionORMethodDef);
	}
	AT_LEAST_ONE8(actionORMethodDef) {
		this.atLeastOneInternal(8, actionORMethodDef);
	}
	AT_LEAST_ONE9(actionORMethodDef) {
		this.atLeastOneInternal(9, actionORMethodDef);
	}
	AT_LEAST_ONE_SEP(options) {
		this.atLeastOneSepFirstInternal(0, options);
	}
	AT_LEAST_ONE_SEP1(options) {
		this.atLeastOneSepFirstInternal(1, options);
	}
	AT_LEAST_ONE_SEP2(options) {
		this.atLeastOneSepFirstInternal(2, options);
	}
	AT_LEAST_ONE_SEP3(options) {
		this.atLeastOneSepFirstInternal(3, options);
	}
	AT_LEAST_ONE_SEP4(options) {
		this.atLeastOneSepFirstInternal(4, options);
	}
	AT_LEAST_ONE_SEP5(options) {
		this.atLeastOneSepFirstInternal(5, options);
	}
	AT_LEAST_ONE_SEP6(options) {
		this.atLeastOneSepFirstInternal(6, options);
	}
	AT_LEAST_ONE_SEP7(options) {
		this.atLeastOneSepFirstInternal(7, options);
	}
	AT_LEAST_ONE_SEP8(options) {
		this.atLeastOneSepFirstInternal(8, options);
	}
	AT_LEAST_ONE_SEP9(options) {
		this.atLeastOneSepFirstInternal(9, options);
	}
	RULE(name, implementation, config = DEFAULT_RULE_CONFIG) {
		if (includes(this.definedRulesNames, name)) {
			const error = {
				message: defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
					topLevelRule: name,
					grammarName: this.className
				}),
				type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
				ruleName: name
			};
			this.definitionErrors.push(error);
		}
		this.definedRulesNames.push(name);
		const ruleImplementation = this.defineRule(name, implementation, config);
		this[name] = ruleImplementation;
		return ruleImplementation;
	}
	OVERRIDE_RULE(name, impl, config = DEFAULT_RULE_CONFIG) {
		const ruleErrors = validateRuleIsOverridden(name, this.definedRulesNames, this.className);
		this.definitionErrors = this.definitionErrors.concat(ruleErrors);
		const ruleImplementation = this.defineRule(name, impl, config);
		this[name] = ruleImplementation;
		return ruleImplementation;
	}
	BACKTRACK(grammarRule, args) {
		return function() {
			this.isBackTrackingStack.push(1);
			const orgState = this.saveRecogState();
			try {
				grammarRule.apply(this, args);
				return true;
			} catch (e) {
				if (isRecognitionException(e)) return false;
				else throw e;
			} finally {
				this.reloadRecogState(orgState);
				this.isBackTrackingStack.pop();
			}
		};
	}
	getGAstProductions() {
		return this.gastProductionsCache;
	}
	getSerializedGastProductions() {
		return serializeGrammar(values(this.gastProductionsCache));
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/recognizer_engine.js
/**
* This trait is responsible for the runtime parsing engine
* Used by the official API (recognizer_api.ts)
*/
var RecognizerEngine = class {
	initRecognizerEngine(tokenVocabulary, config) {
		this.className = this.constructor.name;
		this.shortRuleNameToFull = {};
		this.fullRuleNameToShort = {};
		this.ruleShortNameIdx = 256;
		this.tokenMatcher = tokenStructuredMatcherNoCategories;
		this.subruleIdx = 0;
		this.definedRulesNames = [];
		this.tokensMap = {};
		this.isBackTrackingStack = [];
		this.RULE_STACK = [];
		this.RULE_OCCURRENCE_STACK = [];
		this.gastProductionsCache = {};
		if (has(config, "serializedGrammar")) throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
		if (isArray(tokenVocabulary)) {
			if (isEmpty(tokenVocabulary)) throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
			if (typeof tokenVocabulary[0].startOffset === "number") throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
		}
		if (isArray(tokenVocabulary)) this.tokensMap = reduce(tokenVocabulary, (acc, tokType) => {
			acc[tokType.name] = tokType;
			return acc;
		}, {});
		else if (has(tokenVocabulary, "modes") && every(flatten(values(tokenVocabulary.modes)), isTokenType)) {
			const uniqueTokens = uniq(flatten(values(tokenVocabulary.modes)));
			this.tokensMap = reduce(uniqueTokens, (acc, tokType) => {
				acc[tokType.name] = tokType;
				return acc;
			}, {});
		} else if (isObject(tokenVocabulary)) this.tokensMap = clone(tokenVocabulary);
		else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
		this.tokensMap["EOF"] = EOF;
		const allTokenTypes = has(tokenVocabulary, "modes") ? flatten(values(tokenVocabulary.modes)) : values(tokenVocabulary);
		const noTokenCategoriesUsed = every(allTokenTypes, (tokenConstructor) => isEmpty(tokenConstructor.categoryMatches));
		this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
		augmentTokenTypes(values(this.tokensMap));
	}
	defineRule(ruleName, impl, config) {
		if (this.selfAnalysisDone) throw Error(`Grammar rule <${ruleName}> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
		const resyncEnabled = has(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
		const recoveryValueFunc = has(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc;
		const shortName = this.ruleShortNameIdx << 12;
		this.ruleShortNameIdx++;
		this.shortRuleNameToFull[shortName] = ruleName;
		this.fullRuleNameToShort[ruleName] = shortName;
		let invokeRuleWithTry;
		if (this.outputCst === true) invokeRuleWithTry = function invokeRuleWithTry(...args) {
			try {
				this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
				impl.apply(this, args);
				const cst = this.CST_STACK[this.CST_STACK.length - 1];
				this.cstPostRule(cst);
				return cst;
			} catch (e) {
				return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		};
		else invokeRuleWithTry = function invokeRuleWithTryCst(...args) {
			try {
				this.ruleInvocationStateUpdate(shortName, ruleName, this.subruleIdx);
				return impl.apply(this, args);
			} catch (e) {
				return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		};
		return Object.assign(invokeRuleWithTry, {
			ruleName,
			originalGrammarAction: impl
		});
	}
	invokeRuleCatch(e, resyncEnabledConfig, recoveryValueFunc) {
		const isFirstInvokedRule = this.RULE_STACK.length === 1;
		const reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
		if (isRecognitionException(e)) {
			const recogError = e;
			if (reSyncEnabled) {
				const reSyncTokType = this.findReSyncTokenType();
				if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
					recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
					if (this.outputCst) {
						const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
						partialCstResult.recoveredNode = true;
						return partialCstResult;
					} else return recoveryValueFunc(e);
				} else {
					if (this.outputCst) {
						const partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
						partialCstResult.recoveredNode = true;
						recogError.partialCstResult = partialCstResult;
					}
					throw recogError;
				}
			} else if (isFirstInvokedRule) {
				this.moveToTerminatedState();
				return recoveryValueFunc(e);
			} else throw recogError;
		} else throw e;
	}
	optionInternal(actionORMethodDef, occurrence) {
		const key = this.getKeyForAutomaticLookahead(512, occurrence);
		return this.optionInternalLogic(actionORMethodDef, occurrence, key);
	}
	optionInternalLogic(actionORMethodDef, occurrence, key) {
		let lookAheadFunc = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookAheadFunc;
				lookAheadFunc = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		if (lookAheadFunc.call(this) === true) return action.call(this);
	}
	atLeastOneInternal(prodOccurrence, actionORMethodDef) {
		const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
		return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
	}
	atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, key) {
		let lookAheadFunc = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookAheadFunc;
				lookAheadFunc = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		if (lookAheadFunc.call(this) === true) {
			let notStuck = this.doSingleRepetition(action);
			while (lookAheadFunc.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
		} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
		this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
	}
	atLeastOneSepFirstInternal(prodOccurrence, options) {
		const laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
		this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
	}
	atLeastOneSepFirstInternalLogic(prodOccurrence, options, key) {
		const action = options.DEF;
		const separator = options.SEP;
		if (this.getLaFuncFromCache(key).call(this) === true) {
			action.call(this);
			const separatorLookAheadFunc = () => {
				return this.tokenMatcher(this.LA(1), separator);
			};
			while (this.tokenMatcher(this.LA(1), separator) === true) {
				this.CONSUME(separator);
				action.call(this);
			}
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				prodOccurrence,
				separator,
				separatorLookAheadFunc,
				action,
				NextTerminalAfterAtLeastOneSepWalker
			], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
		} else throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
	}
	manyInternal(prodOccurrence, actionORMethodDef) {
		const laKey = this.getKeyForAutomaticLookahead(768, prodOccurrence);
		return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
	}
	manyInternalLogic(prodOccurrence, actionORMethodDef, key) {
		let lookaheadFunction = this.getLaFuncFromCache(key);
		let action;
		if (typeof actionORMethodDef !== "function") {
			action = actionORMethodDef.DEF;
			const predicate = actionORMethodDef.GATE;
			if (predicate !== void 0) {
				const orgLookaheadFunction = lookaheadFunction;
				lookaheadFunction = () => {
					return predicate.call(this) && orgLookaheadFunction.call(this);
				};
			}
		} else action = actionORMethodDef;
		let notStuck = true;
		while (lookaheadFunction.call(this) === true && notStuck === true) notStuck = this.doSingleRepetition(action);
		this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, 768, prodOccurrence, NextTerminalAfterManyWalker, notStuck);
	}
	manySepFirstInternal(prodOccurrence, options) {
		const laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
		this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
	}
	manySepFirstInternalLogic(prodOccurrence, options, key) {
		const action = options.DEF;
		const separator = options.SEP;
		if (this.getLaFuncFromCache(key).call(this) === true) {
			action.call(this);
			const separatorLookAheadFunc = () => {
				return this.tokenMatcher(this.LA(1), separator);
			};
			while (this.tokenMatcher(this.LA(1), separator) === true) {
				this.CONSUME(separator);
				action.call(this);
			}
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				prodOccurrence,
				separator,
				separatorLookAheadFunc,
				action,
				NextTerminalAfterManySepWalker
			], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
		}
	}
	repetitionSepSecondInternal(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
		while (separatorLookAheadFunc()) {
			this.CONSUME(separator);
			action.call(this);
		}
		/* istanbul ignore else */
		this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
			prodOccurrence,
			separator,
			separatorLookAheadFunc,
			action,
			nextTerminalAfterWalker
		], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
	}
	doSingleRepetition(action) {
		const beforeIteration = this.getLexerPosition();
		action.call(this);
		return this.getLexerPosition() > beforeIteration;
	}
	orInternal(altsOrOpts, occurrence) {
		const laKey = this.getKeyForAutomaticLookahead(256, occurrence);
		const alts = isArray(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
		const altIdxToTake = this.getLaFuncFromCache(laKey).call(this, alts);
		if (altIdxToTake !== void 0) return alts[altIdxToTake].ALT.call(this);
		this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
	}
	ruleFinallyStateUpdate() {
		this.RULE_STACK.pop();
		this.RULE_OCCURRENCE_STACK.pop();
		this.cstFinallyStateUpdate();
		if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
			const firstRedundantTok = this.LA(1);
			const errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
				firstRedundant: firstRedundantTok,
				ruleName: this.getCurrRuleFullName()
			});
			this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
		}
	}
	subruleInternal(ruleToCall, idx, options) {
		let ruleResult;
		try {
			const args = options !== void 0 ? options.ARGS : void 0;
			this.subruleIdx = idx;
			ruleResult = ruleToCall.apply(this, args);
			this.cstPostNonTerminal(ruleResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleToCall.ruleName);
			return ruleResult;
		} catch (e) {
			throw this.subruleInternalError(e, options, ruleToCall.ruleName);
		}
	}
	subruleInternalError(e, options, ruleName) {
		if (isRecognitionException(e) && e.partialCstResult !== void 0) {
			this.cstPostNonTerminal(e.partialCstResult, options !== void 0 && options.LABEL !== void 0 ? options.LABEL : ruleName);
			delete e.partialCstResult;
		}
		throw e;
	}
	consumeInternal(tokType, idx, options) {
		let consumedToken;
		try {
			const nextToken = this.LA(1);
			if (this.tokenMatcher(nextToken, tokType) === true) {
				this.consumeToken();
				consumedToken = nextToken;
			} else this.consumeInternalError(tokType, nextToken, options);
		} catch (eFromConsumption) {
			consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
		}
		this.cstPostTerminal(options !== void 0 && options.LABEL !== void 0 ? options.LABEL : tokType.name, consumedToken);
		return consumedToken;
	}
	consumeInternalError(tokType, nextToken, options) {
		let msg;
		const previousToken = this.LA(0);
		if (options !== void 0 && options.ERR_MSG) msg = options.ERR_MSG;
		else msg = this.errorMessageProvider.buildMismatchTokenMessage({
			expected: tokType,
			actual: nextToken,
			previous: previousToken,
			ruleName: this.getCurrRuleFullName()
		});
		throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
	}
	consumeInternalRecovery(tokType, idx, eFromConsumption) {
		if (this.recoveryEnabled && eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
			const follows = this.getFollowsForInRuleRecovery(tokType, idx);
			try {
				return this.tryInRuleRecovery(tokType, follows);
			} catch (eFromInRuleRecovery) {
				if (eFromInRuleRecovery.name === "InRuleRecoveryException") throw eFromConsumption;
				else throw eFromInRuleRecovery;
			}
		} else throw eFromConsumption;
	}
	saveRecogState() {
		const savedErrors = this.errors;
		const savedRuleStack = clone(this.RULE_STACK);
		return {
			errors: savedErrors,
			lexerState: this.exportLexerState(),
			RULE_STACK: savedRuleStack,
			CST_STACK: this.CST_STACK
		};
	}
	reloadRecogState(newState) {
		this.errors = newState.errors;
		this.importLexerState(newState.lexerState);
		this.RULE_STACK = newState.RULE_STACK;
	}
	ruleInvocationStateUpdate(shortName, fullName, idxInCallingRule) {
		this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
		this.RULE_STACK.push(shortName);
		this.cstInvocationStateUpdate(fullName);
	}
	isBackTracking() {
		return this.isBackTrackingStack.length !== 0;
	}
	getCurrRuleFullName() {
		const shortName = this.getLastExplicitRuleShortName();
		return this.shortRuleNameToFull[shortName];
	}
	shortRuleNameToFullName(shortName) {
		return this.shortRuleNameToFull[shortName];
	}
	isAtEndOfInput() {
		return this.tokenMatcher(this.LA(1), EOF);
	}
	reset() {
		this.resetLexerState();
		this.subruleIdx = 0;
		this.isBackTrackingStack = [];
		this.errors = [];
		this.RULE_STACK = [];
		this.CST_STACK = [];
		this.RULE_OCCURRENCE_STACK = [];
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/error_handler.js
/**
* Trait responsible for runtime parsing errors.
*/
var ErrorHandler = class {
	initErrorHandler(config) {
		this._errors = [];
		this.errorMessageProvider = has(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
	}
	SAVE_ERROR(error) {
		if (isRecognitionException(error)) {
			error.context = {
				ruleStack: this.getHumanReadableRuleStack(),
				ruleOccurrenceStack: clone(this.RULE_OCCURRENCE_STACK)
			};
			this._errors.push(error);
			return error;
		} else throw Error("Trying to save an Error which is not a RecognitionException");
	}
	get errors() {
		return clone(this._errors);
	}
	set errors(newErrors) {
		this._errors = newErrors;
	}
	raiseEarlyExitException(occurrence, prodType, userDefinedErrMsg) {
		const ruleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[ruleName];
		const insideProdPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead)[0];
		const actualTokens = [];
		for (let i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
		const msg = this.errorMessageProvider.buildEarlyExitMessage({
			expectedIterationPaths: insideProdPaths,
			actual: actualTokens,
			previous: this.LA(0),
			customUserDescription: userDefinedErrMsg,
			ruleName
		});
		throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
	}
	raiseNoAltException(occurrence, errMsgTypes) {
		const ruleName = this.getCurrRuleFullName();
		const ruleGrammar = this.getGAstProductions()[ruleName];
		const lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
		const actualTokens = [];
		for (let i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
		const previousToken = this.LA(0);
		const errMsg = this.errorMessageProvider.buildNoViableAltMessage({
			expectedPathsPerAlt: lookAheadPathsPerAlternative,
			actual: actualTokens,
			previous: previousToken,
			customUserDescription: errMsgTypes,
			ruleName: this.getCurrRuleFullName()
		});
		throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/context_assist.js
var ContentAssist = class {
	initContentAssist() {}
	computeContentAssist(startRuleName, precedingInput) {
		const startRuleGast = this.gastProductionsCache[startRuleName];
		if (isUndefined(startRuleGast)) throw Error(`Rule ->${startRuleName}<- does not exist in this grammar.`);
		return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
	}
	getNextPossibleTokenTypes(grammarPath) {
		const topRuleName = head(grammarPath.ruleStack);
		const topProduction = this.getGAstProductions()[topRuleName];
		return new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/gast_recorder.js
var RECORDING_NULL_OBJECT = { description: "This Object indicates the Parser is during Recording Phase" };
Object.freeze(RECORDING_NULL_OBJECT);
var HANDLE_SEPARATOR = true;
var MAX_METHOD_IDX = Math.pow(2, 8) - 1;
var RFT = createToken({
	name: "RECORDING_PHASE_TOKEN",
	pattern: Lexer.NA
});
augmentTokenTypes([RFT]);
var RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
Object.freeze(RECORDING_PHASE_TOKEN);
var RECORDING_PHASE_CSTNODE = {
	name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
	children: {}
};
/**
* This trait handles the creation of the GAST structure for Chevrotain Grammars
*/
var GastRecorder = class {
	initGastRecorder(config) {
		this.recordingProdStack = [];
		this.RECORDING_PHASE = false;
	}
	enableRecording() {
		this.RECORDING_PHASE = true;
		this.TRACE_INIT("Enable Recording", () => {
			/**
			* Warning Dark Voodoo Magic upcoming!
			* We are "replacing" the public parsing DSL methods API
			* With **new** alternative implementations on the Parser **instance**
			*
			* So far this is the only way I've found to avoid performance regressions during parsing time.
			* - Approx 30% performance regression was measured on Chrome 75 Canary when attempting to replace the "internal"
			*   implementations directly instead.
			*/
			for (let i = 0; i < 10; i++) {
				const idx = i > 0 ? i : "";
				this[`CONSUME${idx}`] = function(arg1, arg2) {
					return this.consumeInternalRecord(arg1, i, arg2);
				};
				this[`SUBRULE${idx}`] = function(arg1, arg2) {
					return this.subruleInternalRecord(arg1, i, arg2);
				};
				this[`OPTION${idx}`] = function(arg1) {
					return this.optionInternalRecord(arg1, i);
				};
				this[`OR${idx}`] = function(arg1) {
					return this.orInternalRecord(arg1, i);
				};
				this[`MANY${idx}`] = function(arg1) {
					this.manyInternalRecord(i, arg1);
				};
				this[`MANY_SEP${idx}`] = function(arg1) {
					this.manySepFirstInternalRecord(i, arg1);
				};
				this[`AT_LEAST_ONE${idx}`] = function(arg1) {
					this.atLeastOneInternalRecord(i, arg1);
				};
				this[`AT_LEAST_ONE_SEP${idx}`] = function(arg1) {
					this.atLeastOneSepFirstInternalRecord(i, arg1);
				};
			}
			this[`consume`] = function(idx, arg1, arg2) {
				return this.consumeInternalRecord(arg1, idx, arg2);
			};
			this[`subrule`] = function(idx, arg1, arg2) {
				return this.subruleInternalRecord(arg1, idx, arg2);
			};
			this[`option`] = function(idx, arg1) {
				return this.optionInternalRecord(arg1, idx);
			};
			this[`or`] = function(idx, arg1) {
				return this.orInternalRecord(arg1, idx);
			};
			this[`many`] = function(idx, arg1) {
				this.manyInternalRecord(idx, arg1);
			};
			this[`atLeastOne`] = function(idx, arg1) {
				this.atLeastOneInternalRecord(idx, arg1);
			};
			this.ACTION = this.ACTION_RECORD;
			this.BACKTRACK = this.BACKTRACK_RECORD;
			this.LA = this.LA_RECORD;
		});
	}
	disableRecording() {
		this.RECORDING_PHASE = false;
		this.TRACE_INIT("Deleting Recording methods", () => {
			const that = this;
			for (let i = 0; i < 10; i++) {
				const idx = i > 0 ? i : "";
				delete that[`CONSUME${idx}`];
				delete that[`SUBRULE${idx}`];
				delete that[`OPTION${idx}`];
				delete that[`OR${idx}`];
				delete that[`MANY${idx}`];
				delete that[`MANY_SEP${idx}`];
				delete that[`AT_LEAST_ONE${idx}`];
				delete that[`AT_LEAST_ONE_SEP${idx}`];
			}
			delete that[`consume`];
			delete that[`subrule`];
			delete that[`option`];
			delete that[`or`];
			delete that[`many`];
			delete that[`atLeastOne`];
			delete that.ACTION;
			delete that.BACKTRACK;
			delete that.LA;
		});
	}
	ACTION_RECORD(impl) {}
	BACKTRACK_RECORD(grammarRule, args) {
		return () => true;
	}
	LA_RECORD(howMuch) {
		return END_OF_FILE;
	}
	topLevelRuleRecord(name, def) {
		try {
			const newTopLevelRule = new Rule({
				definition: [],
				name
			});
			newTopLevelRule.name = name;
			this.recordingProdStack.push(newTopLevelRule);
			def.call(this);
			this.recordingProdStack.pop();
			return newTopLevelRule;
		} catch (originalError) {
			if (originalError.KNOWN_RECORDER_ERROR !== true) try {
				originalError.message = originalError.message + "\n	 This error was thrown during the \"grammar recording phase\" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording";
			} catch (mutabilityError) {
				throw originalError;
			}
			throw originalError;
		}
	}
	optionInternalRecord(actionORMethodDef, occurrence) {
		return recordProd.call(this, Option, actionORMethodDef, occurrence);
	}
	atLeastOneInternalRecord(occurrence, actionORMethodDef) {
		recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
	}
	atLeastOneSepFirstInternalRecord(occurrence, options) {
		recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
	}
	manyInternalRecord(occurrence, actionORMethodDef) {
		recordProd.call(this, Repetition, actionORMethodDef, occurrence);
	}
	manySepFirstInternalRecord(occurrence, options) {
		recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
	}
	orInternalRecord(altsOrOpts, occurrence) {
		return recordOrProd.call(this, altsOrOpts, occurrence);
	}
	subruleInternalRecord(ruleToCall, occurrence, options) {
		assertMethodIdxIsValid(occurrence);
		if (!ruleToCall || has(ruleToCall, "ruleName") === false) {
			const error = /* @__PURE__ */ new Error(`<SUBRULE${getIdxSuffix(occurrence)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(ruleToCall)}>\n inside top level rule: <${this.recordingProdStack[0].name}>`);
			error.KNOWN_RECORDER_ERROR = true;
			throw error;
		}
		const prevProd = last(this.recordingProdStack);
		const ruleName = ruleToCall.ruleName;
		const newNoneTerminal = new NonTerminal({
			idx: occurrence,
			nonTerminalName: ruleName,
			label: options === null || options === void 0 ? void 0 : options.LABEL,
			referencedRule: void 0
		});
		prevProd.definition.push(newNoneTerminal);
		return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
	}
	consumeInternalRecord(tokType, occurrence, options) {
		assertMethodIdxIsValid(occurrence);
		if (!hasShortKeyProperty(tokType)) {
			const error = /* @__PURE__ */ new Error(`<CONSUME${getIdxSuffix(occurrence)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(tokType)}>\n inside top level rule: <${this.recordingProdStack[0].name}>`);
			error.KNOWN_RECORDER_ERROR = true;
			throw error;
		}
		const prevProd = last(this.recordingProdStack);
		const newNoneTerminal = new Terminal({
			idx: occurrence,
			terminalType: tokType,
			label: options === null || options === void 0 ? void 0 : options.LABEL
		});
		prevProd.definition.push(newNoneTerminal);
		return RECORDING_PHASE_TOKEN;
	}
};
function recordProd(prodConstructor, mainProdArg, occurrence, handleSep = false) {
	assertMethodIdxIsValid(occurrence);
	const prevProd = last(this.recordingProdStack);
	const grammarAction = isFunction(mainProdArg) ? mainProdArg : mainProdArg.DEF;
	const newProd = new prodConstructor({
		definition: [],
		idx: occurrence
	});
	if (handleSep) newProd.separator = mainProdArg.SEP;
	if (has(mainProdArg, "MAX_LOOKAHEAD")) newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	this.recordingProdStack.push(newProd);
	grammarAction.call(this);
	prevProd.definition.push(newProd);
	this.recordingProdStack.pop();
	return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
	assertMethodIdxIsValid(occurrence);
	const prevProd = last(this.recordingProdStack);
	const hasOptions = isArray(mainProdArg) === false;
	const alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
	const newOrProd = new Alternation({
		definition: [],
		idx: occurrence,
		ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
	});
	if (has(mainProdArg, "MAX_LOOKAHEAD")) newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
	newOrProd.hasPredicates = some(alts, (currAlt) => isFunction(currAlt.GATE));
	prevProd.definition.push(newOrProd);
	forEach(alts, (currAlt) => {
		const currAltFlat = new Alternative({ definition: [] });
		newOrProd.definition.push(currAltFlat);
		if (has(currAlt, "IGNORE_AMBIGUITIES")) currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
		else if (has(currAlt, "GATE")) currAltFlat.ignoreAmbiguities = true;
		this.recordingProdStack.push(currAltFlat);
		currAlt.ALT.call(this);
		this.recordingProdStack.pop();
	});
	return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
	return idx === 0 ? "" : `${idx}`;
}
function assertMethodIdxIsValid(idx) {
	if (idx < 0 || idx > MAX_METHOD_IDX) {
		const error = /* @__PURE__ */ new Error(`Invalid DSL Method idx value: <${idx}>\n\tIdx value must be a none negative value smaller than ${MAX_METHOD_IDX + 1}`);
		error.KNOWN_RECORDER_ERROR = true;
		throw error;
	}
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/traits/perf_tracer.js
/**
* Trait responsible for runtime parsing errors.
*/
var PerformanceTracer = class {
	initPerformanceTracer(config) {
		if (has(config, "traceInitPerf")) {
			const userTraceInitPerf = config.traceInitPerf;
			const traceIsNumber = typeof userTraceInitPerf === "number";
			this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
			this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
		} else {
			this.traceInitMaxIdent = 0;
			this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
		}
		this.traceInitIndent = -1;
	}
	TRACE_INIT(phaseDesc, phaseImpl) {
		if (this.traceInitPerf === true) {
			this.traceInitIndent++;
			const indent = new Array(this.traceInitIndent + 1).join("	");
			if (this.traceInitIndent < this.traceInitMaxIdent) console.log(`${indent}--> <${phaseDesc}>`);
			const { time, value } = timer(phaseImpl);
			/* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
			const traceMethod = time > 10 ? console.warn : console.log;
			if (this.traceInitIndent < this.traceInitMaxIdent) traceMethod(`${indent}<-- <${phaseDesc}> time: ${time}ms`);
			this.traceInitIndent--;
			return value;
		} else return phaseImpl();
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/utils/apply_mixins.js
function applyMixins(derivedCtor, baseCtors) {
	baseCtors.forEach((baseCtor) => {
		const baseProto = baseCtor.prototype;
		Object.getOwnPropertyNames(baseProto).forEach((propName) => {
			if (propName === "constructor") return;
			const basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
			if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
			else derivedCtor.prototype[propName] = baseCtor.prototype[propName];
		});
	});
}
//#endregion
//#region node_modules/chevrotain/lib/src/parse/parser/parser.js
var END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(END_OF_FILE);
var DEFAULT_PARSER_CONFIG = Object.freeze({
	recoveryEnabled: false,
	maxLookahead: 3,
	dynamicTokensEnabled: false,
	outputCst: true,
	errorMessageProvider: defaultParserErrorProvider,
	nodeLocationTracking: "none",
	traceInitPerf: false,
	skipValidations: false
});
var DEFAULT_RULE_CONFIG = Object.freeze({
	recoveryValueFunc: () => void 0,
	resyncEnabled: true
});
var ParserDefinitionErrorType;
(function(ParserDefinitionErrorType) {
	ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
	ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
	ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
	ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
	ParserDefinitionErrorType[ParserDefinitionErrorType["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
	ParserDefinitionErrorType[ParserDefinitionErrorType["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
	ParserDefinitionErrorType[ParserDefinitionErrorType["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
	ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
	ParserDefinitionErrorType[ParserDefinitionErrorType["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
	ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
	ParserDefinitionErrorType[ParserDefinitionErrorType["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
	ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
	ParserDefinitionErrorType[ParserDefinitionErrorType["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
	ParserDefinitionErrorType[ParserDefinitionErrorType["CUSTOM_LOOKAHEAD_VALIDATION"] = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
var Parser = class Parser {
	/**
	*  @deprecated use the **instance** method with the same name instead
	*/
	static performSelfAnalysis(parserInstance) {
		throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
	}
	performSelfAnalysis() {
		this.TRACE_INIT("performSelfAnalysis", () => {
			let defErrorsMsgs;
			this.selfAnalysisDone = true;
			const className = this.className;
			this.TRACE_INIT("toFastProps", () => {
				toFastProperties(this);
			});
			this.TRACE_INIT("Grammar Recording", () => {
				try {
					this.enableRecording();
					forEach(this.definedRulesNames, (currRuleName) => {
						const originalGrammarAction = this[currRuleName]["originalGrammarAction"];
						let recordedRuleGast;
						this.TRACE_INIT(`${currRuleName} Rule`, () => {
							recordedRuleGast = this.topLevelRuleRecord(currRuleName, originalGrammarAction);
						});
						this.gastProductionsCache[currRuleName] = recordedRuleGast;
					});
				} finally {
					this.disableRecording();
				}
			});
			let resolverErrors = [];
			this.TRACE_INIT("Grammar Resolving", () => {
				resolverErrors = resolveGrammar({ rules: values(this.gastProductionsCache) });
				this.definitionErrors = this.definitionErrors.concat(resolverErrors);
			});
			this.TRACE_INIT("Grammar Validations", () => {
				if (isEmpty(resolverErrors) && this.skipValidations === false) {
					const validationErrors = validateGrammar({
						rules: values(this.gastProductionsCache),
						tokenTypes: values(this.tokensMap),
						errMsgProvider: defaultGrammarValidatorErrorProvider,
						grammarName: className
					});
					const lookaheadValidationErrors = validateLookahead({
						lookaheadStrategy: this.lookaheadStrategy,
						rules: values(this.gastProductionsCache),
						tokenTypes: values(this.tokensMap),
						grammarName: className
					});
					this.definitionErrors = this.definitionErrors.concat(validationErrors, lookaheadValidationErrors);
				}
			});
			if (isEmpty(this.definitionErrors)) {
				if (this.recoveryEnabled) this.TRACE_INIT("computeAllProdsFollows", () => {
					const allFollows = computeAllProdsFollows(values(this.gastProductionsCache));
					this.resyncFollows = allFollows;
				});
				this.TRACE_INIT("ComputeLookaheadFunctions", () => {
					var _a, _b;
					(_b = (_a = this.lookaheadStrategy).initialize) === null || _b === void 0 || _b.call(_a, { rules: values(this.gastProductionsCache) });
					this.preComputeLookaheadFunctions(values(this.gastProductionsCache));
				});
			}
			if (!Parser.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty(this.definitionErrors)) {
				defErrorsMsgs = map(this.definitionErrors, (defError) => defError.message);
				throw new Error(`Parser Definition Errors detected:\n ${defErrorsMsgs.join("\n-------------------------------\n")}`);
			}
		});
	}
	constructor(tokenVocabulary, config) {
		this.definitionErrors = [];
		this.selfAnalysisDone = false;
		const that = this;
		that.initErrorHandler(config);
		that.initLexerAdapter();
		that.initLooksAhead(config);
		that.initRecognizerEngine(tokenVocabulary, config);
		that.initRecoverable(config);
		that.initTreeBuilder(config);
		that.initContentAssist();
		that.initGastRecorder(config);
		that.initPerformanceTracer(config);
		if (has(config, "ignoredIssues")) throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
		this.skipValidations = has(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
	}
};
Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
applyMixins(Parser, [
	Recoverable,
	LooksAhead,
	TreeBuilder,
	LexerAdapter,
	RecognizerEngine,
	RecognizerApi,
	ErrorHandler,
	ContentAssist,
	GastRecorder,
	PerformanceTracer
]);
var CstParser = class extends Parser {
	constructor(tokenVocabulary, config = DEFAULT_PARSER_CONFIG) {
		const configClone = clone(config);
		configClone.outputCst = true;
		super(tokenVocabulary, configClone);
	}
};
//#endregion
//#region node_modules/chevrotain/lib/src/api.js
/* istanbul ignore file - tricky to import some things from this module during testing */
//#endregion
export { copyArray as S, initCloneObject as _, Lexer as a, flatten as b, isUndefined as c, find as d, filter as f, baseClone as g, defaults as h, tokenMatcher as i, isEmpty as l, isArrayLikeObject as m, EOF as n, baseUniq as o, last as p, createToken as r, reduce as s, CstParser as t, has as u, cloneTypedArray as v, baseFlatten as x, cloneBuffer as y };
