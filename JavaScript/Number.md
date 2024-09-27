---
title: Number
permalink: JavaScript/Number
category: JavaScript
parent: JavaScript
layout: default
has_children: false
share: true
shortRepo:

- javascript
- default

---

<br/>

<details markdown="block">                
<summary>                
Table of contents                
</summary>                
{: .text-delta }                
1. TOC                
{:toc}                
</details>

<br/>

---

<br/>

## `Number.prototype.toLocaleString()`

The [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
method takes two optional parameters of `locales` and `options`. If you don't pass either, you'll get the browser's default locale. We'll focus on the
`options` parameter in the following sections.

```javascript
const number = 12345.6789;

console.log(number.toLocaleString());
// 12,345.679 (defaults to the "en-US" locale in my case)

console.log(number.toLocaleString("de-DE"));
// 12.345,679
```

## Currency Format

> Formatting numbers is great and all, but what about fancy stuff like money!?! Well, that's were the 2nd optional `options` parameter comes into
> play. If you supply a property of `{ style: "currency" }` and a valid `currency` (
> an [ISO 4217 currency code](http://www.currency-iso.org/en/home/tables/table-a1.html)) then you'll get a nicely formatted currency with locale
> support!

> NOTE: There is no default `currency` code, so you'll get an error if you don't provide one.

```javascript
const number = 12345.6789;

console.log(number.toLocaleString("en-US", {
    style: "currency", currency: "USD",
}),);
// $12,345.68

console.log(number.toLocaleString("de-DE", {
    style: "currency", currency: "EUR",
}),);
// 12.345,68 €

console.log(number.toLocaleString("ja-JP", {
    style: "currency", currency: "JPY",
}),);
// ￥12,346
```

## Significant Digits

> Sometimes you want to control how many digits are significant in a number. You might think of this as Frontend Estimation. You can provide a
`minimumSignificantDigits` (defaults to `1`) or a `maximumSignificantDigits` (defaults to `21`).

```javascript
const number = 12345.6789;

console.log(number.toLocaleString("en-US", {
    maximumSignificantDigits: 1,
}),);
// 10,000

console.log(number.toLocaleString("fr-FR", {
    maximumSignificantDigits: 3,
}),);
// 12 300
```

## Unit Support

> Unit support is one of those things that I wouldn't have expected to be a feature, but is pretty cool to have. You can mix and match locales along
> with units of measurement. You can find a full list of possible units from
>
the [ECMAScript specification](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier).
> You can also provide a `unitDisplay` of `long`, `short` (default), or `narrow` to control how verbose the unit is displayed.

> NOTE: This is one of those features that is not supported by Safari. Also there is no default value for `unit`, so if `style` is set to `unit` then
> one must be provided.

```javascript
const number = 12345.6789;

console.log(number.toLocaleString("en-US", {
    style: "unit", unit: "mile-per-hour",
}),);
// 12,345.679 mph

console.log(number.toLocaleString("fr-FR", {
    style: "unit", unit: "liter", unitDisplay: "long",
}),);
// 12 345,679 litres
```

## Compact Notation

I found this amusing when I realized this feature existed. Not too long ago I needed something like this to abbreviate large numbers. I ended up
finding a snippet of code online to get the job done, but now I know I could have used `{ notation: "compact" }!` It also takes an optional
`compactDisplay` that can be set to `short` (default) or `long`.

> NOTE: This is one of those features that is not supported in Safari.

```javascript
const number = 12345.6789;

console.log(number.toLocaleString("en-US", {
    notation: "compact", compactDisplay: "short",
}),);
// 12K

console.log(number.toLocaleString("en-US", {
    notation: "compact", compactDisplay: "long",
}),);
// 12 thousand
```

## Percents

Having percent support is probably not a surprise to you, but it is handy to have especially since it is locale aware (as all the other options are).
It gets a little bit nicer because you can also provide other options such as `minimumFractionDigits` (defaults to 0 or 2 for currency) or
`maximumFractionDigits` to control how many fraction digits to use.

```javascript
const number = 0.1234;

console.log(number.toLocaleString("en-US", {
    style: "percent", minimumFractionDigits: 2,
}),);
// 12.34%
```

## Accounting

I don't typically show negative currency with parenthesis, but apparently that is a common approach for those that do a lot of accounting. I probably
won't use this, but it's good to know that it's an option in case I ever do.

> NOTE: This is one of those features that is not supported in Safari.

```javascript
const number = -123.456;

console.log(number.toLocaleString("en-US", {
    style: "currency", currency: "USD", currencySign: "accounting", signDisplay: "always",
}),);
// ($123.46)
```

## `Intl.NumberFormat`

So, instead of
using [Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) you
could also use the `Intl.NumberFormat` constructor and then call the `format` method to format your numbers. However, that might confusing and may
make you question which technique you should use. If you find yourself needing to format many numbers over and over again with the same locale and
same options, then using `Intl.NumberFormat` is preferable for performance reasons.

> "When formatting large numbers of numbers, it is better to create
> a[NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)object and use the function provided
> by
> its[NumberFormat.format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/format)
>
property." --[Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

```javascript
const numberFormat = new Intl.NumberFormat("en-US", {
    style: "unit", unit: "mile-per-hour",
});

console.log(numberFormat.format(12345.6789));
// 12,345.679 mph

console.log(numberFormat.format(2345.67891));
// 2,345.679 mph
```