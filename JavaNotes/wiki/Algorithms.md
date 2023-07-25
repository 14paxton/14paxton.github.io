---  
title: Algorithms    
category: JavaNotes/wiki  
share: true    
share: true    
shortRepo:   
- default    
- java  
---  
  
testing full dual  
# Algos  
  
## binary search  
  
```java  
public class BinarySearch {  
  
    public static int find(int[] numbers, int target) {  
        int min = 0, max = numbers.length - 1;  
  
        while (min <= max) {  
            int pos = (min + max) / 2;  
            if (numbers[pos] == target) {  
                return pos;  
            }  
            if (numbers[pos] < target) {  
                min = pos + 1;  
            } else {  
                max = pos - 1;  
            }  
        }  
  
        // +1, because 0 belongs to positive indices  
        return -(min + 1);  
    }  
}  
```  
  
## Selection Sort  
  
```java  
public void sort(int[]values){  
        // 1. Iteration over the input data   
        for(int i=0;i<values.length;i++){  
// 2. Find the index of the smallest element          
        int minPos=indexOfMinimum(values,i);  
// 3. Move the smallest element into the current position          
        swap(values,i,minPos);  
        }  
        }  
```  
  
## filter string  
  
```java  
public static Boolean QuestionsMarks(String str){  
        AtomicBoolean returnVal=new AtomicBoolean(Boolean.FALSE);  
        LinkedHashMap<Integer, Character> indexForNumberMap=new LinkedHashMap<>();  
        AtomicInteger index=new AtomicInteger(0);  
  
        List<Character> theList=str.chars()  
        .filter(w->{  
        boolean isDigit=(w>=47&&w<=57);  
        boolean isQuestionMark=w==63;  
  
        if(isDigit||isQuestionMark){  
        if(isDigit){  
        indexForNumberMap.put(index.get(),(char)w);  
        }  
  
        index.getAndIncrement();  
        return true;  
        }  
  
        return false;  
        })  
        .mapToObj(o->(char)o)  
        .toList();  
  
        if(theList.stream().anyMatch(Character::isDigit)){  
        Set<Integer> keys=indexForNumberMap.keySet();  
        Integer[]arr=keys.toArray(new Integer[0]);  
        boolean enoughQuestionMarks=true;  
  
        for(int i=0;i<arr.length-1;i++){  
        int firstIndex=indexForNumberMap.get(arr[i]);  
        int nextIndex=indexForNumberMap.get(arr[i+1]);  
  
        if(enoughQuestionMarks&&Character.getNumericValue(firstIndex)+Character.getNumericValue(nextIndex)==10){  
        enoughQuestionMarks=arr[i+1]-arr[i]==4;  
        returnVal.set(enoughQuestionMarks);  
        }  
        }  
        }  
  
        return returnVal.get();  
        }  
```  
