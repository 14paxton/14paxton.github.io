---  
title:        TidBits    
permalink:    SpringNotes/TidBits    
category:     SpringNotes    
parent:       SpringNotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - springnotes    
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
    
***    
    
<br/>    
  
# Spring find annotated classes  
=============================  
  
How to find annotated classes using**Spring Framework**and read metadata from them? Sometimes you may want to attach metadata to your classes using custom annotations. Here’s an example how you can leverage**Spring**’s classpath scanning mechanism to do that.  
  
[The Spring Bean problem](https://farenda.com/spring-find-annotated-classes/#the-spring-bean-problem)  
-----------------------------------------------------------------------------------------------------  
  
If you use Spring annotations like**@Component**,**@Repository**or**@Service**, then Spring will find such classes, but will make them Spring beans.  
  
[Classpath Scanner customization](https://farenda.com/spring-find-annotated-classes/#classpath-scanner-customization)  
---------------------------------------------------------------------------------------------------------------------  
  
Good news is that Spring classpath scanning mechanism is configurable and available in any Spring application. To use custom annotations we have to create an instance of ClassPathScanningCandidateComponentProvider and set appropriate filter - here it is**AnnotationTypeFilter**. It returns**BeanDefinitions**that contains names of found class from which we can get detailed information. The following example will clarify that.  
  
[Own annotations](https://farenda.com/spring-find-annotated-classes/#own-annotations)  
-------------------------------------------------------------------------------------  
  
We create our custom annotation that allows us to attach some metatdata:  
  
```java    
  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
// Make the annotation available at runtime:    
@Retention(RetentionPolicy.RUNTIME)  
// Allow to use only on types:    
@Target(ElementType.TYPE)  
public @interface Findable {  
  
    /**  
     * User friendly name of annotated class.    
     */  
    String name();  
  
}    
```    
  
---  
  
## Adding metadata to own classes  
  
### Sample classes annotated with the custom annotation:  
  
```java    
    
@Findable(name = "Find me")    
public class FirstAnnotatedClass {    
}    
```    
    
```java    
    
@Findable(name = "Find me too")    
public class SecondAnnotatedClass {    
}    
```    
  
### Spring dependency  
  
The classpath scanner is provided by spring-context project.    
Here’s the relevant Maven dependency:    
    
```xml    
    
<dependency>    
    <groupId>org.springframework</groupId>    
    <artifactId>spring-context</artifactId>    
    <version>4.2.0.RELEASE</version>    
</dependency>    
```    
  
### The Scanner  
  
The Java code below is using ClassPathScanningCandidateComponentProvider to scan classes in com.farenda.java.lang package.    
    
```java    
    
import org.springframework.beans.factory.config.BeanDefinition;    
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;    
import org.springframework.core.type.filter.AnnotationTypeFilter;    
    
public class SpringClassScanner {    
    
    public static void main(String[] args) throws Exception {    
        System.out.println("Finding annotated classes using Spring:");    
        new SpringClassScanner().findAnnotatedClasses("com.farenda.java.lang");    
    }    
    
    public void findAnnotatedClasses(String scanPackage) {    
        ClassPathScanningCandidateComponentProvider provider = createComponentScanner();    
        for (BeanDefinition beanDef : provider.findCandidateComponents(scanPackage)) {    
            printMetadata(beanDef);    
        }    
    }    
    
    private ClassPathScanningCandidateComponentProvider createComponentScanner() {    
        // Don't pull default filters (@Component, etc.):    
        ClassPathScanningCandidateComponentProvider provider    
                = new ClassPathScanningCandidateComponentProvider(false);    
        provider.addIncludeFilter(new AnnotationTypeFilter(Findable.class));    
        return provider;    
    }    
    
    private void printMetadata(BeanDefinition beanDef) {    
        try {    
            Class<?> cl = Class.forName(beanDef.getBeanClassName());    
            Findable findable = cl.getAnnotation(Findable.class);    
            System.out.printf("Found class: %s, with meta name: %s%n",    
                    cl.getSimpleName(), findable.name());    
        } catch (Exception e) {    
            System.err.println("Got exception: " + e.getMessage());    
        }    
    }    
    
}    
```    
    
The code is straightforward.    
The hardest thing is to type and read very long names of Spring classes.    
;-)    
    
And here’s the output of running the code:    
    
```    
Finding annotated classes using Spring:    
Found class: SecondAnnotatedClass, with meta name: Find me too    
Found class: FirstAnnotatedClass, with meta name: Find me    
```    
    
> Summary    
> This sort of scanning is very good fit for applications that already use Spring Framework.    
> However, in the future, we’ll see how to solve the same problem, but without Spring.    
    
---  
    
# How to exclude classes/packages from Component Scan in Spring Framework    
    
> The task is a bit tricky, especially when regexp is involved. Say that we've got the following two classes    
    
```java    
    
import org.springframework.stereotype.Service;    
    
@Service    
public class ExcludedService {    
    public ExcludedService() {    
        System.out.println("Instantiating " + getClass().getSimpleName());    
    }    
}      
```    
    
```java    
    
    
import org.springframework.stereotype.Service;    
    
@Service    
public class IncludedService {    
    public IncludedService() {    
        System.out.println("Instantiating " + getClass().getSimpleName());    
    }    
}    
```    
    
We want to scan the whole package and include every component except ExcludedService.    
In our case, included beans should contain only IncludedService.    
    
ComponentScan exclude—using annotations    
To exclude some beans we can use excludeFilters on the @ComponentScan annotation like this:    
    
```java    
    
import org.springframework.boot.SpringApplication;    
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;    
import org.springframework.context.ApplicationContext;    
import org.springframework.context.annotation.*;    
import org.springframework.context.annotation.ComponentScan.Filter;    
    
import java.util.Arrays;    
    
@ComponentScan(basePackages = "com.farenda.java.spring.excludescan",    
        excludeFilters = @Filter(    
                type = FilterType.REGEX,    
                pattern = "com\\.farenda\\.java\\.spring\\.excludescan\\.Excluded.*"))    
@EnableAutoConfiguration    
public class ExcludingFromComponentScanExample {    
    
    public static void main(String[] args) throws Exception {    
        ApplicationContext context =    
                SpringApplication.run(ExcludingFromComponentScanExample.class, args);    
    
        String[] beans = context.getBeanDefinitionNames();    
    
        // sort names only to make output more readable:    
        Arrays.sort(beans);    
    
        System.out.println("Defined beans: ");    
        for (String bean : beans) {    
            System.out.println(bean);    
        }    
    }    
    
}    
```    
    
We apply REGEX FilterType that allows us nicely exclude single classes and whole packages.    
When we run the application you can see that only includedService is among beans in ApplicationContext built    
    
> from ComponentScan:    
    
```shell    
:: Spring Boot ::        (v1.2.3.RELEASE)    
    
2015-12-20 13:08:37.601 INFO 4077 --- [           main] .f.j.s.ExcludingFromComponentScanExample    
2015-12-20 13:08:37.660 INFO 4077 --- [           main] s.c.a.AnnotationConfigApplicationContext    
Instantiating IncludedService    
...    
2015-12-20 13:08:39.292 INFO 4077 --- [           main] .f.j.s.ExcludingFromComponentScanExample : Started ExcludingFromComponentScanExample in 2.204 seconds (JVM running for 2.841)    
Defined beans:    
excludingFromComponentScanExample    
includedService    
mbeanExporter    
mbeanServer    
objectNamingStrategy    
org.springframework.boot.autoconfigure.AutoConfigurationPackages    
org.springframework.boot.autoconfigure.PropertyPlaceholderAutoConfiguration    
org.springframework.boot.autoconfigure.condition.BeanTypeRegistry    
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration    
org.springframework.context.annotation.ConfigurationClassPostProcessor.enhancedConfigurationProcessor    
org.springframework.context.annotation.ConfigurationClassPostProcessor.importAwareProcessor    
org.springframework.context.annotation.internalAutowiredAnnotationProcessor    
org.springframework.context.annotation.internalCommonAnnotationProcessor    
org.springframework.context.annotation.internalConfigurationAnnotationProcessor    
org.springframework.context.annotation.internalRequiredAnnotationProcessor    
propertySourcesPlaceholderConfigurer    
2015-12-20 13:08:39.295 INFO 4077 --- [       Thread-1] s.c.a.AnnotationConfigApplicationContext : Closing org.springframework.context.annotation.AnnotationConfigApplicationContext@7a187f14: startup    
date [Sun Dec 20 13:08:37 CET 2015]; root of context hierarchy    
2015-12-20 13:08:39.298 INFO 4077 --- [       Thread-1] o.s.j.e.a.AnnotationMBeanExporter        : Unregistering JMX-exposed beans on shutdown    
    
Process finished with exit code 0    
The same filtering mechanism can be used with includeFilters attribute, to select classes/packages that should be included in Spring ApplicationContext.    
    
ComponentScan exclude - XML version    
If you happen to still work with XML Spring Configuration, then the same thing can be done in the following way:    
    
<context:component-scan    
base-package="com.farenda.java.spring.excludescan">    
    
<context:exclude-filter type="regex"    
expression="com\.farenda\.java\.spring\.excludescan\.Excluded.*"/>    
    
</context:component-scan>    
```    
    
---  
    
# Spring Constructor Injection    
    
```java    
    
public interface BookRepository {    
    String titleById(int id);    
}     
```    
    
# Spring Constructor Injection    
    
This is one of the simplest and cleanest types of Dependency Injection in the Spring Framework.    
In this post we show how to use it with help of Spring annotations.    
    
Spring bean to inject as dependency    
Let’s specify an interface for dependency:    
    
```java    
    
public interface BookRepository {    
    String titleById(int id);    
}    
```    
    
And the actual Spring Bean implementation that will be injected:    
    
```java    
    
import org.springframework.stereotype.Repository;    
    
import java.util.HashMap;    
import java.util.Map;    
    
@Repository    
public class InMemoryBookRepository implements BookRepository {    
    
    // It's our local database ;-)    
    private final Map<Integer, String> books = new HashMap<>();    
    
    {    
        books.put(1, "Effective Java, 2nd edition");    
        books.put(2, "Java Concurrency in Practice");    
        books.put(3, "Spring in Action");    
    }    
    
    @Override    
    public String titleById(int id) {    
        return books.get(id);    
    }    
    
}    
```    
    
# Spring component with dependency injected by constructor    
    
Here we define another Spring Bean, but this time we are going to inject BookRepository through constructor, using    
```@Autowired``` annotation:    
    
```java    
    
import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.stereotype.Component;    
    
@Component    
public class Library {    
    
    private final BookRepository bookRepository;    
    
    @Autowired    
    public Library(BookRepository bookRepository) {    
        this.bookRepository = bookRepository;    
    }    
    
    public String findBook(int id) {    
        return bookRepository.titleById(id);    
    }    
    
}    
```    
    
Spring resolves dependencies using argument’s type.    
If it finds a bean matching the type, then the bean is instantiated and injected.    
Else exception is thrown.    
    
Example App using Spring Boot    
Here’s the simplest Spring Boot application to run the above code:    
    
```java    
    
import org.springframework.boot.SpringApplication;    
import org.springframework.context.ApplicationContext;    
import org.springframework.context.annotation.ComponentScan;    
import org.springframework.context.annotation.Configuration;    
    
@Configuration    
@ComponentScan // scan this package for Spring beans    
public class ConstructorInjection {    
    
    public static void main(String[] args) {    
        ApplicationContext context = SpringApplication    
                .run(ConstructorInjection.class, args);    
    
        // Get bean from the Spring Application Context:    
        Library library = context.getBean(Library.class);    
    
        System.out.println("Title 1: " + library.findBook(1));    
        System.out.println("Title 2: " + library.findBook(2));    
    }    
    
}    
```    
    
The above code produces the following output:    
    
```shell    
Title 1: Effective Java, 2nd edition    
Title 2: Java Concurrency in Practice    
```     
    
---  
    
# Spring Field Injection    
    
This is the form of Dependency Injection that requires almost no boilerplate code,    
contrary to setter or constructor injections.    
    
we’ll specify an interface for the dependency:    
    
```java    
    
public interface BookRepository {    
    String titleById(int id);    
}    
```    
    
And the actual Spring Bean implementation that will be injected:    
    
```java    
    
import org.springframework.stereotype.Repository;    
    
import java.util.HashMap;    
import java.util.Map;    
    
@Repository    
public class InMemoryBookRepository implements BookRepository {    
    
    // It's our local database ;-)    
    private final Map<Integer, String> books = new HashMap<>();    
    
    {    
        books.put(1, "Effective Java, 3rd edition");    
        books.put(2, "Java Concurrency in Practice");    
        books.put(3, "Spring in Action");    
    }    
    
    @Override    
    public String titleById(int id) {    
        return books.get(id);    
    }    
    
}    
```    
    
# Spring component with dependency injected using field injection    
    
Here we define another Spring Bean, but we are going to inject /BookRepository/ using field injection.    
To do that we have to annotate appropriate fields using @Autowired (or @Inject or @Resource)    
annotation:    
    
```java    
    
import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.stereotype.Component;    
    
@Component    
public class Library {    
    
    @Autowired    
    private BookRepository bookRepository;    
    
    public String findBook(int id) {    
        return bookRepository.titleById(id);    
    }    
    
}    
```    
    
It works without any setter, because underneath Spring is using reflection to inject dependencies.    
    
# Constructor or field injection    
    
Although [constructor injection](https://farenda.com/spring/spring-constructor-injection) allows to create beans as immutable objects (fields can be marked using final modifier) and makes dependencies    
explicit it requires to write some boilerplate code.    
Because of that, in practice, field injection is used.    
    
Example App using Spring Boot    
Here’s the simplest Spring Boot application to run the above code:    
    
```java    
    
import org.springframework.boot.SpringApplication;    
import org.springframework.context.ApplicationContext;    
import org.springframework.context.annotation.ComponentScan;    
import org.springframework.context.annotation.Configuration;    
    
@Configuration    
@ComponentScan    
public class FieldInjection {    
    
    public static void main(String[] args) {    
        ApplicationContext context = SpringApplication    
                .run(FieldInjection.class, args);    
    
        Library library = context.getBean(Library.class);    
    
        System.out.println("Title 1: " + library.findBook(1));    
        System.out.println("Title 2: " + library.findBook(2));    
    }    
    
}    
```    
    
The above code produces the following output:    
    
```    
Title 1: Effective Java, 3rd edition    
Title 2: Java Concurrency in Practice    
```    
    
---  
    
# Circular Reference - BeanCurrentlyInCreationException    
    
BeanCurrentlyInCreationException is thrown by Spring Framework when it meets circular reference while setting up application context.    
Here we show what is it and how to fix it!    
    
Beans with circular reference    
Bean A with constructor injected Bean B    
Library is a Spring Bean that is using another bean - BookRepository - as a dependency [injected through constructor](https://farenda.com/spring/spring-constructor-injection):    
    
```java    
    
import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.stereotype.Component;    
    
@Component    
public class Library {    
    
    private final BookRepository bookRepository;    
    
    @Autowired    
    public Library(BookRepository bookRepository) {    
        this.bookRepository = bookRepository;    
    }    
    
    public String findBook(int id) {    
        return bookRepository.titleById(id);    
    }    
    
    public String name() {    
        return "Public library #1";    
    }    
    
}    
```    
    
Bean B with constructor injected Bean A - circular reference    
BookRepository, for some reason, want’s to have Library injected, also through constructor:    
    
```java    
    
import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.stereotype.Repository;    
    
import java.util.HashMap;    
import java.util.Map;    
    
@Repository    
public class BookRepository {    
    
    private final Library library;    
    
    @Autowired    
    public BookRepository(Library library) {    
        this.library = library;    
    }    
    
    // It's our local database ;-)    
    private final Map<Integer, String> books = new HashMap<>();    
    
    {    
        books.put(1, "Effective Java, 2nd edition");    
        books.put(2, "Java Concurrency in Practice");    
        books.put(3, "Spring in Action");    
    }    
    
    public String titleById(int id) {    
        System.out.println("In a library: " + library.name());    
        return books.get(id);    
    }    
    
}    
```    
    
The application runner    
The simplest [Spring Boot](http://farenda.com/java/spring-boot-hello-world) app to run the code:    
    
```java    
    
import org.springframework.boot.SpringApplication;    
import org.springframework.context.ApplicationContext;    
import org.springframework.context.annotation.ComponentScan;    
import org.springframework.context.annotation.Configuration;    
    
@Configuration    
@ComponentScan    
public class InjectionConflict {    
    
    public static void main(String[] args) {    
        ApplicationContext context = SpringApplication    
                .run(InjectionConflict.class, args);    
    
        Library library = context.getBean(Library.class);    
    
        System.out.println("Title 2: " + library.findBook(2));    
    }    
    
}    
```    
    
When we run the above code the application will fail during startup with UnsatisfiedDependencyException exception, which is caused by BeanCurrentlyInCreationException:    
    
```shell    
2016-08-09 23:29:01.530 INFO 11796 --- [           main] c.f.s.t.i.conflict.InjectionConflict     : Starting InjectionConflict on namek with PID 11796 (    
/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main started by przemek in /home/przemek/Dropbox/projekty/farenda/java/spring-tutorial)    
2016-08-09 23:29:01.535 INFO 11796 --- [           main] c.f.s.t.i.conflict.InjectionConflict     : No active profile set, falling back to default profiles: default    
2016-08-09 23:29:01.612 INFO 11796 --- [           main] s.c.a.AnnotationConfigApplicationContext : Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@2eda0940:    
startup date [Tue Aug 09 23:29:01 CEST 2016]; root of context hierarchy    
2016-08-09 23:29:02.147 WARN 11796 --- [           main] s.c.a.AnnotationConfigApplicationContext : Exception encountered during context initialization - cancelling refresh attempt:    
org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'bookRepository' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/BookRepository.class]: Unsatisfied dependency expressed through    
constructor argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.Library]: Error creating bean with name 'library' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/Library.class]: Unsatisfied dependency expressed through constructor    
argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.BookRepository]: Error creating bean with name 'bookRepository': Requested bean is currently in creation: Is there an    
unresolvable circular reference?; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'bookRepository': Requested bean is currently in    
creation: Is there an unresolvable circular reference?; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'library' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/Library.class]: Unsatisfied dependency expressed through constructor    
argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.BookRepository]: Error creating bean with name 'bookRepository': Requested bean is currently in creation: Is there an    
unresolvable circular reference?; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'bookRepository': Requested bean is currently in    
creation: Is there an unresolvable circular reference?    
2016-08-09 23:29:02.166 ERROR 11796 --- [           main] o.s.boot.SpringApplication               : Application startup failed    
    
org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'bookRepository' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/BookRepository.class]: Unsatisfied dependency expressed through    
constructor argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.Library]: Error creating bean with name 'library' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/Library.class]: Unsatisfied dependency expressed through constructor    
argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.BookRepository]: Error creating bean with name 'bookRepository': Requested bean is currently in creation: Is there an    
unresolvable circular reference?; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'bookRepository': Requested bean is currently in    
creation: Is there an unresolvable circular reference?; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'library' defined in    
file [/home/przemek/Dropbox/projekty/farenda/java/spring-tutorial/build/classes/main/com/farenda/spring/tutorial/injection/conflict/Library.class]: Unsatisfied dependency expressed through constructor    
argument with index 0 of type [com.farenda.spring.tutorial.injection.conflict.BookRepository]: Error creating bean with name 'bookRepository': Requested bean is currently in creation: Is there an    
unresolvable circular reference?; nested exception is org.springframework.beans.factory.BeanCurrentlyInCreationException: Error creating bean with name 'bookRepository': Requested bean is currently in    
creation: Is there an unresolvable circular reference?    
at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:749) ~[spring-beans-4.2.6.RELEASE.jar:4.2.6.RELEASE]    
at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:185) ~[spring-beans-4.2.6.RELEASE.jar:4.2.6.RELEASE]    
```    
    
The reason is that Spring Framework first tries to instantiate all the beans and then inject them.    
When constructor dependency is used, Spring Framework cannot instantiate mutually dependent beans.    
To fix that the beans participating in circular reference have to use field/setter injection.    
    
Field/setter injection to break constructor circular references    
To fix that let’s use [field injection](https://farenda.com/spring/spring-field-injection) in the beans:    
    
```java    
    
@Repository    
public class BookRepository {    
    
    @Autowired    
    private Library library;    
    
// @Autowired    
// public BookRepository(Library library) {    
// this.library = library;    
// }    
    
//...    
}    
    
public class Library {    
    
    @Autowired    
    private BookRepository bookRepository;    
    
// public Library(BookRepository bookRepository) {    
// this.bookRepository = bookRepository;    
// }    
    
//...    
}    
```    
    
Now Spring Framewokr can instantiate BookRepository, inject it through the constructor into the Library, and then inject it back to the BookRepository:    
    
```shell    
2016-08-09 23:55:54.594 INFO 12472 --- [           main] c.f.s.t.i.conflict.InjectionConflict     : Started InjectionConflict in 1.553 seconds (JVM running for 2.679)    
In a library: Public library #1    
Title 2: Java Concurrency in Practice    
2016-08-09 23:55:54.605 INFO 12472 --- [       Thread-1] s.c.a.AnnotationConfigApplicationContext : Closing org.springframework.context.annotation.AnnotationConfigApplicationContext@2eda0940: startup    
date [Tue Aug 09 23:55:54 CEST 2016]; root of context hierarchy    
```