---
title: UsefulSnippets
permalink: JavaScript/UsefulSnippets
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

# Generate a random string

```javascript
const randomString = () => Math.random().toString(36).slice(2);
```

# Generate a random string of a given length

```javascript
const randomString = (length = 10) => {
  let result = "";
  while (result.length < length) {
    result += Math.random().toString(36).slice(2);
  }
  returr;
  result.slice(0, length);
};
```

# Copy content to the clipboard

```javascript
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
copyToClipboard("Hello World");
```

# Clear all cookies

```javascript
const clearcookies = document.cookie
  .split(";")
  .forEach(
    (cookie) =>
      (document.cookie = cookie.replace(
        /=.*/,
        `=;expires=$(new Date(0). toUTCString()} ;path=/`,
      )),
  );
```

# Get the selected text

```javascript
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```

# Scroll to the top of the page

```javascript
const goToTop = () => window.scrollTo(0, 0);
goToTop();
```

# Check whether the user has scrolled to the bottom of a page

```javascript
const scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight
```
# Find out whether the current tab is active

```javascript
const isTabInView = () => !document.hidden
```

# Redirect the user to a URL

```javascript
const redirect = url => location.href = url
redirect("https://www.google.com/")
```

# Open the browser print box

```javascript
const showPrintDialog = ()
window.print()
```

# Generate a random boolean value

```javascript
// Returns a random boolean value (true or false)
const randomBoolean = () => Math.random() >= 0.5;
randomBoolean();
```

# Generate a random number between two values

![](..%2Fassets%2Fimages%2Fimage12.jpeg)

# Check if a given number is an integer

![](..%2Fassets%2Fimages%2Fimage13.jpeg)

# Remove duplicate values in an array

![](..%2Fassets%2Fimages%2Fimage14.jpeg)

# [Get the unique values in an array]

![](..%2Fassets%2Fimages%2Fimage15.jpeg)

# [Check if a variable is an array](https://muhammadovi.com/20-javascript-one-liners-that-will-help-you-code-like-a-pro/#2---check-if-the-date-is-weekend)

![](..%2Fassets%2Fimages%2Fimage16.jpeg)

# [Check if the date is Weekend](https://muhammadovi.com/20-javascript-one-liners-that-will-help-you-code-like-a-pro/#02---check-if-the-date-is-weekend)

![](..%2Fassets%2Fimages%2Fimage17.jpeg)

# Calculate number of days between two dates

![](..%2Fassets%2Fimages%2Fimage18.jpeg)

# Capitalize a String

![](..%2Fassets%2Fimages%2Fimage19.jpeg)

# Get the day of the year from a date

![](..%2Fassets%2Fimages%2Fimage20.jpeg)

# Check if a string is a palindrome

![](..%2Fassets%2Fimages%2Fimage21.jpeg)

# Get the first n elements of an array

![](..%2Fassets%2Fimages%2Fimage22.jpeg)

# Get the last n elements of an array

![](..%2Fassets%2Fimages%2Fimage23.jpeg)

# Remove all vowels from a string

![](..%2Fassets%2Fimages%2Fimage24.jpeg)

# Check if a string contains a substring

![](..%2Fassets%2Fimages%2Fimage25.jpeg)

# Get the current time in hh:mm:ss format

![](..%2Fassets%2Fimages%2Fimage26.jpeg)

# Check if an object is empty

![](..%2Fassets%2Fimages%2Fimage27.jpeg)

# not empty

![](..%2Fassets%2Fimages%2Fimage28.jpeg)
![](..%2Fassets%2Fimages%2Fimage29.jpeg)

# Get the current date and time

![](..%2Fassets%2Fimages%2Fimage30.jpeg)

# Reverse a String

![](..%2Fassets%2Fimages%2Fimage31.jpeg)

# Sort Arrays

![](..%2Fassets%2Fimages%2Fimage32.jpeg)

# Extract the Domain name from an email

![](..%2Fassets%2Fimages%2Fimage33.jpeg)

# Flatten an Nested Array

![](..%2Fassets%2Fimages%2Fimage34.jpeg)

# Generates a Random Color in Hexadecimal Format

![](..%2Fassets%2Fimages%2Fimage35.jpeg)

# Checks if a given value is a valid Hexadecimal Color Code

![](..%2Fassets%2Fimages%2Fimage36.jpeg)

# Get the current time in a specific timezone

![](..%2Fassets%2Fimages%2Fimage37.jpeg)

# Convert a String to kebab-case

![](..%2Fassets%2Fimages%2Fimage38.jpeg)

# Shuffle an Array

![](..%2Fassets%2Fimages%2Fimage39.jpeg)

# Shuffle an array using the Fisher-Yates (Knuth) Shuffle algorithm

![](..%2Fassets%2Fimages%2Fimage40.jpeg)

# Convert RGB color code to valid Hexadecimal color code

![](..%2Fassets%2Fimages%2Fimage41.jpeg)

# Truncate a number to a fixed decimal point

![](..%2Fassets%2Fimages%2Fimage42.jpeg)

# Remove falsy values from Array

![](..%2Fassets%2Fimages%2Fimage43.jpeg)

# A function that toggles a boolean value

![](..%2Fassets%2Fimages%2Fimage44.jpeg)

# A concise way to swap the values of two variables using array

![](..%2Fassets%2Fimages%2Fimage45.jpeg)

# The concat() method returns a new array containing elements from both arr1 and arr2.

![](..%2Fassets%2Fimages%2Fimage46.jpeg)

# The spread operator is concise and visually clear. It takes the elements from both arrays and creates a new array.

![](..%2Fassets%2Fimages%2Fimage47.jpeg)

# This approach modifies arr1 in place by using push() along with apply() to add elements from arr2.

![](..%2Fassets%2Fimages%2Fimage48.jpeg)

# The spread operator is used to expand the elements of arr2 into individual arguments for the push() method.

![](..%2Fassets%2Fimages%2Fimage49.jpeg)

# The spread operator is used to expand the elements of arr2 as arguments to the concat() method.

![](..%2Fassets%2Fimages%2Fimage50.jpeg)

# JavaScript primitives Truncate string at the end

![](..%2Fassets%2Fimages%2Fimage51.jpeg)

# The function will truncate the input string to the specified length and add an ellipsis (\...) at the end if the string is longer than the specified length.

![](..%2Fassets%2Fimages%2Fimage52.jpeg)

# The function is to truncate the input string while keeping the specified number of characters from the start and end, and adding an ellipsis (\...) in the middle.

![](..%2Fassets%2Fimages%2Fimage52.jpeg)

# Get the value of a browser cookie by its name

![](..%2Fassets%2Fimages%2Fimage53.jpeg)

# from a JavaScript Date object.

![](..%2Fassets%2Fimages%2Fimage54.jpeg)

# Check if a number is even or odd

![](..%2Fassets%2Fimages%2Fimage55.jpeg)

# Converts the first character of a given string to lowercase

![](..%2Fassets%2Fimages%2Fimage56.jpeg)

# Repeats a given string a specific number of times

![](..%2Fassets%2Fimages%2Fimage57.jpeg)

# Check if the code is running in Node.js

![](..%2Fassets%2Fimages%2Fimage58.jpeg)

# Check if the code is running in the browser

![](..%2Fassets%2Fimages%2Fimage59.jpeg)

# Get all siblings of a given element

![](..%2Fassets%2Fimages%2Fimage60.jpeg)

# Go back to the previous page using the history object

![](..%2Fassets%2Fimages%2Fimage61.jpeg)

# Function to get the largest element in an array

![](..%2Fassets%2Fimages%2Fimage62.jpeg)

# Function to get the smallest element in an array

![](..%2Fassets%2Fimages%2Fimage63.jpeg)

# Function to toggle the visibility of an HTML element

![](..%2Fassets%2Fimages%2Fimage64.jpeg)

# Function to remove HTML tags from a given String

![](..%2Fassets%2Fimages%2Fimage65.jpeg)

# Define a function to check if a given value is a DOM Element

![](..%2Fassets%2Fimages%2Fimage66.jpeg)

# Define a function to check if a given string is a valid URL

![](..%2Fassets%2Fimages%2Fimage67.jpeg)

# Check if a string starts with a given prefix

![](..%2Fassets%2Fimages%2Fimage68.jpeg)

# Check if a string ends with a given suffix

![](..%2Fassets%2Fimages%2Fimage69.jpeg)

# Check if a value is an object

![](..%2Fassets%2Fimages%2Fimage70.jpeg)

# Check if a value is a function

![](..%2Fassets%2Fimages%2Fimage71.png)

# Check if a value is a Promise

![](..%2Fassets%2Fimages%2Fimage72.jpeg)

# Check if an HTML element is entirely within the viewport

![](..%2Fassets%2Fimages%2Fimage73.jpeg)