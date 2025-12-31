---
title: Streams
layout: default
parent: Java
permalink: JavaNotes/Streams
category: JavaNotes

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

- Streams don't store data; they process data.
- Streams are consumed once — you cannot reuse a stream after a terminal operation.
- Stream operations can be chained.

> Prefer parallel streams only when it can truly improve performance (large data + non-thread blocking code).

# Creation of Streams

# Operations

- > Select elements matching a condition `stream filter(x -> x > 5)`
- > Transform elements `stream.map(String::toUpperCase)`
- > Flattens nested structures `stream. flatMap(list -> list.stream())`
- > Removes duplicates (based on equals()) `stream.distinct()`
- > Sorts elements (natural order) `stream.sorted()`
- > Custom sorting `stream.sorted(Comparator.reverseOrder())`
- > Limits stream to n elements `stream.limit(s)`
- > Skips first n elements `stream.skip(3)`
- > Perform action without consuming `stream.peek(System.out::println)`

# Terminal Operators

- > Collects elements into a collection`stream.collect (Collectors.toList ()`

- > Performs an action for each element`stream.forEach (System.out::println)`

- > Converts stream into array`stream.toArray ()`

- > Combines elements into a single result`stream.reduce (0, Integer: :sum)`

- > Counts number of elements`stream.count ()`

- > Smallest element based on comparator`stream.min (Comparator.naturalOrder ())`

- > Largest element based on comparator`stream.max (Comparator.naturalOrder ())`

- > True if any element matches`stream.anyMatch (x -> x > 10)`

- > True if all elements match`stream.allMatch (x -> x > 0)`

- > True if no element matches`stream.noneMatch (x -> x < 0)`

- > Returns first element(Optional)`stream.findFirst ()`

- > Returns any element (useful in parallel)`stream.findAny ()`

# Usage

## Map and Collect

```java

public class MapExample {

  Map newMap = clientEntityMap.entrySet()
                              .stream()
                              .collect(Collectors.toMap(Map.Entry::getKey,
                                                        entry -> entry.getValue()
                                                                      .stream()
                                                                      .map(e -> {
                                                                        String externalCode = e.getDescription();
                                                                        String externalCode = e.getDescription();
                                                                        String externalCode = e.getDescription();

                                                                        return Map.of("externalCode", "");
                                                                      })
                                                                      .collect(Collectors.toList())));
}
```

## ConcurrentHashMap and LinkedList

```java
public class LinkedListEx {
  Map newMap = this.clientEntityMap.entrySet()
                                   .stream()
                                   .map(entry -> Map.entry(entry.getKey(), entry.getValue()
                                                                                .stream()
                                                                                .map(ClientEntityDetails::toMap)
                                                                                .collect(Collectors.toCollection(LinkedList::new))))
                                   .collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue, (a, b) -> b, ConcurrentHashMap::new));

}
```

## Map to String

```java
public class MapToString {
  Map mapToString = this.clientEntityMap.entrySet()
                                        .stream()
                                        .map(entry -> Map.entry(entry.getKey(), entry.getValue()
                                                                                     .stream()
                                                                                     .map(ClientEntityDetails::toMap)
                                                                                     .collect(Collectors.toCollection(LinkedList::new))))
                                        .collect(Collectors.toConcurrentMap(Map.Entry::getKey, Map.Entry::getValue, (a, b) -> b, ConcurrentHashMap::new));

}
```

## Practical Usage

### Given a list of integers, return a list of only even numbers.

```java
test() {
  List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);

  List<List<Integer>> pairs = nums.stream()
                                  .flatMap(i -> nums.stream()
                                                    .filter(j -> i < j && i + j == target)
                                                    .map(j -> List.of(i, j)))
                                  .collect(Collectors.toList());

  IO.println(pairs);
  // Output: [[2, 8], [3, 7], [4, 6]]
}
```

### From a list, find all pairs that sum to a given number (e.g., 10).

```java
test() {
  List<Integer> nums = List.of(1, 2, 3, 7, 5, 8, 6, 4);
  int target = 10;

  List<String> upperNames = names.stream()
                                 .map(String::toUpperCase)
                                 .collect(Collectors.toList());
  IO.println(upperNames);
  // Output: [ALICE, BOB, CHARLIE]
}
```

### Find the first string that starts with letter "C".

```java
test() {
  List<String> names = List.of("Alice", "Bob", "Charlie", "David");

  Optional<String> firstNameStartingWithC = names.stream()
                                                 .filter(name -> name.startsWith("C"))
                                                 .findFirst();

  firstNameStartingWithC.ifPresent(System.out::println);
  // Output:Charlie
}
```

### Find the sum of squares of numbers in a list.

```java
test() {
  List<Integer> numbers = List.of(1, 2, 3, 4);
  int sumOfSquares = numbers.stream()
                            .map(n -> n * n)
                            .reduce(0, Integer::sum);
  IO.println(sumOfSquares);
  // Output: 30 (1+4+9+16)
}
```

### Sort a list of strings in descending (reverse alphabetical) order.

```java
test() {
  List<String> fruits = List.of("apple", "banana", "cherry", "date");
  List<String> sortedFruits = fruits.stream()
                                    .sorted(Comparator.reverseOrder())
                                    .collect(Collectors.toList());
  IO.println(sortedFruits);
  // Output: [date, cherry, banana, apple]
}
```

### Group words by their length.

```java
test() {
  List<String> words = List.of("one", "two", "three", "four", "five");
  Map<Integer, List<String>> groupedByLength = words.stream()
                                                    .collect(Collectors.groupingBy(String::length));
  IO.println(groupedByLength);
  // Output: {3=[one, two], 5=[three], 4=[four, five]}
}
```

### Find the maximum number in a list.

```java
test() {
  List<Integer> numbers = List.of(10, 20, 5, 80, 30);
  Optional<Integer> maxNumber = numbers.stream()
                                       .max(Integer::compare);
  maxNumber.ifPresent(System.out::println);
  // Output: 80
}
```

### Count how many strings start with "A".

```java
test() {
  List<String> names = List.of("Alice", "Arnold", "Bob", "Charlie",
                               "Andrew");
  long count = names.stream()
                    .filter(name -> name.startsWith("A"))
                    .count();
  IO.println(count);
  // Output: 3
}
```

### Given a list of strings, group them by anagram sets.

```java
test() {
  List<String> words = List.of("listen", "silent", "enlist", "rat", "tar", "art");
  Map<String, List<String>> anagramGroups =
          words.stream()
               .collect(Collectors.groupingBy(word -> word.chars()
                                                          .sorted()
                                                          .mapToObj(c -> String.valueOf((char) c))
                                                          .collect(Collectors.joining())
                                             ));
  IO.println(anagramGroups);
  // Output: {eilnst=[listen, silent, enlist], art=[rat, tar, art]}
}
```

### Convert a list of lists into a single list.

```java
test() {
  List<List<String>> nestedList = List.of(List.of("a", "b"), List.of("c", "d"), List.of("e", "f"));

  List<String> flatList = nestedList.stream()
                                    .flatMap(Collection::stream)
                                    .collect(Collectors.toList());
  IO.println(flatList);
  // Output: [a, b, c, d, e, f]
}
```

### Given a list of integers, return a list of strings "even" or "odd" depending on whether the number is even or odd.

```java
test() {
  List<Integer> numbers = List.of(1, 2, 3, 4, 5);
  List<String> evenOrOdd = numbers.stream()
                                  .map(n -> n % 2 == 0 ? "even" : "odd")
                                  .collect(Collectors.toList());
  IO.println(evenOrOdd);
  // Output: [odd, even, odd, even, odd]
}
```

### Given a list of sentences, count the frequency of each word (case-insensitive).

```java
test() {
  List<String> sentences = List.of("Java is fun", "Streams are powerful", "Java is powerful");

  Map<String, Long> wordFreq =
          sentences.stream()
                   .flatMap(sentence -> Arrays.stream(sentence.toLowerCase()
                                                              .split("\\s+")))
                   .collect(Collectors.groupingBy(word -> word, Collectors.counting()));

  IO.println(wordFreq);
  // Output: {java=2, is=2, fun=1, streams=1, are=1, powerful=2}
}
```

### From a list of integers, find the duplicate numbers and how many times they occur.

```java
test() {
  List<Integer> nums = List.of(1, 2, 3, 2, 3, 4, 5, 3);
  Map<Integer, Long> duplicates = nums.stream()
                                      .collect(Collectors.groupingBy(Function.identity(),
                                                                     Collectors.counting()))
                                      .entrySet()
                                      .stream()
                                      .filter(e -> e.getValue() > 1)
                                      .collect(Collectors.toMap(Map.Entry::getKey,
                                                                Map.Entry::getValue));
  IO.print(duplicates);
  // Output: {2=2, 3=3}
}
```

### Flatten a Map<String, List<List<Integer>>> into a List<Integer>.

```java
Map<String, List<List<Integer>>> map =
        Map.of("a", List.of(List.of(1, 2), List.of(3)),
               "b", List.of(List.of(4), List.of(5, 6)));

List<Integer> flatList = map.values()
                            .stream()
                            .flatMap(List::stream)
                            .flatMap(List::stream)
                            .collect(Collectors.toList());

// Output: [1, 2, 3, 4, 5, 6]
```

### Return the common elements between two lists using streams.

```java
List<Integer> common = list1.stream()
                            .filter(list2::contains)
                            .collect(Collectors.toList());
```

### Remove duplicate integers from a list.

```java
List<Integer> numbers = List.of(1, 2, 2, 3, 4, 4, 5);

List<Integer> uniqueNumbers = numbers.stream()
                                     .distinct()
                                     .collect(Collectors.toList());
// Output: [1, 2, 3, 4, 5]
```

### Given "hello world", count the frequency of each character.

```java
String str = "hello world";

Map<Character, Long> charFreq = str.chars()
                                   .mapToObj(c -> (char) c)
                                   .filter(c -> c != ' ')
                                   .collect(Collectors.groupingBy(Function.identity(),
                                                                  Collectors.counting()));
```

### Given a list of strings, find the element that occurs most frequently.

```java
List<String> input = List.of("apple", "banana", "apple", "orange", "banana", "apple");

String mostFrequent = input.stream()
                           .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                           .entrySet()
                           .stream()
                           .max(Map.Entry.comparingByValue())
                           .map(Map.Entry::getKey)
                           .orElse(null);
// Output: apple
```

### Given a list of lowercase strings, return the list of characters that appear in every string.

```java
List<String> words = List.of("bella", "label", "roller");
List<Character> commonChars = words.stream()
                                   .map(word -> word.chars()
                                                    .mapToObj(c -> (char) c)
                                                    .collect(Collectors.groupingBy(c -> c, Collectors.counting())))
                                   .reduce((map1, map2) -> {
                                     map1.keySet()
                                         .retainAll(map2.keySet());
                                     map1.replaceAll((k, v) -> Math.min(v, map2.get(k)));
                                     return map1;
                                   })
                                   .orElse(Map.of())
                                   .entrySet()
                                   .stream()
                                   .flatMap(e -> Collections.nCopies(e.getValue()
                                                                      .intValue(), e.getKey())
                                                            .stream())
                                   .collect(Collectors.toList());
// Output: [e, l, l]
```

### Reverse a list of elements using streams only.

```java
List<Integer> list = List.of(1, 2, 2, 3, 4, 4, 5);
List<Integer> reversed = IntStream.range(0, list.size())
                                  .mapToObj(i -> list.get(list.size() - i - 1))
                                  .collect(Collectors.toList());
```