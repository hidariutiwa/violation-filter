# violation-filter


## install

```
npm install violation-filter
```

## import

```js
import { Filter, defaultFilters, composeFilter } from 'violation-filter';
```
or
```js
const { Filter, defaultFilters, composeFilter } = require('violation-filter');
```

## Filter
Filter is a class that determines whether the input contains predefined keywords and, if so, provides a function to return null or a keyword-substituted version.
```js
import { Filter } from 'violation-filter';

const keywords = [ 'foo', 'bar' ];
const myFilter = new Filter(keywords);
```

### methods

#### apply
apply is a method that returns null if the input contains the keyword, or returns the input as is if it does not.

```js
const result = myFilter.apply('foo is meta-syntax variable');
console.log(result);      // null

const _result = myFilter.apply('Foo is meta-syntax variable');
console.log(_result)      // Foo is meta-syntax variable
```

#### apply_replace
If the input contains a keyword, apply_replace replaces it with the character given as the second argument and returns the input. If the input does not contain any keywords, it returns the input as is.

```js
const result = myFilter.apply_replace('bar is meta-syntax variable', '***');
console.log(result);      // *** is meta-syntax variable

const _result = myFilter.apply_replace('Bar is meta-syntax variable', '***');
console.log(_result)      // Bar is meta-syntax variable
```

## defaultFilters
Filters for sexual or violent language are provided in advance.

```js
import { defaultFilters } from 'violation-filter';

const text = 'YOUR INPUT';

const result_adult = defaultFilters.adultFilter.apply(text);
const result_adult_replaced = defaultFilters.adultFilter.apply_replace(text, '***');

const result_violence = defaultFilters.violenceFilter.apply(text);
const result_violence_replaced = defaultFilters.violenceFilter.apply_replace(text, '***');
```

## composeFilter
If you want to use multiple filters at the same time, composeFilter is a convenient way to do so. All filters in the array given as the first argument are applied to the input given as the second argument.

```js
import { defaultFilters, composeFilter } from 'violation-filter';

const filters = [ defaultFilters.adultFilter, defaultFilters.violenceFilter ];
const text = 'YOUR INPUT';

const result = composeFilter(filters, text);
```
