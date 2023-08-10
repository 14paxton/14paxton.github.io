---  
title:        Spock    
permalink:    TestingFrameworks/Spock    
category:     TestingFrameworks    
parent:       TestingFrameworks    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - testingframeworks    
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
    
# Config    
    
## Gradle    
    
### [setup for both spock and junit](https://github.com/14paxton/TestingFrameworks/tree/master/Spock/RunSpockJUnitConcurrently)    
    
## Use db in memory to run tests    
    
```groovy    
    
@shared Sql sql = Sql.newInstance(“ jdbc: h2 : mem: ”, “ org.h2.Driver ”)    
    
```    
    
## Maven    
    
### CLI    
    
#### Run all the unit test classes.    
    
```shell    
mvn test    
```    
    
#### Run a single test class.    
    
```shell    
mvn -Dtest=TestApp1 test    
```    
    
#### Run multiple test classes.    
    
```shell    
mvn -Dtest=TestApp1,TestApp2 test    
```    
    
#### Run a single test method from a test class.    
    
```shell    
mvn -Dtest=TestApp1#methodname test    
```    
    
#### Run all test methods that match pattern 'testHello*' from a test class.    
    
```shell    
mvn -Dtest=TestApp1#testHello* test    
```    
    
#### Run all test methods match pattern 'testHello*' and 'testMagic*' from a test class.    
    
```shell    
mvn -Dtest=TestApp1#testHello*+testMagic* test    
```    
    
---  
    
- Don’t run tests:    
    
> Note: the test classes in the project will be compiled!    
    
```shell    
mvn clean package -DskipTests    
```    
    
- Don’t compile and don’t run the tests:    
    
> maven.test.skip is honored by the Surefire, Failsafe and the Compiler Plugin    
    
```shell    
maven clean package -Dmaven.test.skip=true    
```    
    
#### Run a single test:    
    
> Sometimes you would like to execute a single test instead of all your tests.    
    
```shell    
mvn test -Dtest="NameOfYourTest"    
Run build offline    
```    
    
<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">                
           Both -o and --offline are equivalent. Your local Maven repository will is used to resolve dependencies. No connection to the internet is made to download dependencies. Your build will fail in case dependencies are not found in your local repository!    
</div>    
```shell    
mvn clean package -o    
```    
    
### Dependencies    
    
#### Search for dependencies in your project    
    
> List all the dependencies    
    
```shell    
mvn dependency:list    
```    
    
#### Check whether or not you have specific dependencies in your project    
    
```shell    
mvn dependency:list | grep log4j    
```    
    
#### Get a single dependency    
    
```shell    
mvn dependency:get -Dartifact=org.springframework:spring-core:5.3.15    
```    
    
### Local repository    
    
The default location of your local repo is `~/.m2`    
    
#### Install a (3rd party) jar file into your local Maven repository    
    
> since it doesn’t exist in any public repository like [Maven Central](http://search.maven.org/).    
    
```shell    
mvn install:install-file    
-Dfile=<path-to-file>    
-DgroupId=<group-id>    
-DartifactId=<artifact-id>    
-Dversion=<version>    
-Dpackaging=<packaging>    
-DgeneratePom=true    
```    
    
##### Where:    
    
```<path-to-file> ``` : the path to the file to load    
    
```<group-id> ``` : the group that the file should be registered under    
    
```<artifact-id> ``` : the artifact name for the file    
    
```<version> ``` : the version of the file    
    
```<packaging>``` :  the packaging of the file, e.g., jar    
    
> Example:    
    
```shell    
mvn install:install-file -Dfile=lang-groovy-5.2.2.jar \    
-DgroupId=org.elasticsearch.module \    
-DartifactId=lang-groovy \    
-Dversion=5.2.2 \    
-Dpackaging=jar \    
-DgeneratePom=true    
    
```    
    
---  
    
### Pom for running both spock and junit    
    
- [Code For Reference ](https://github.com/SanderSmee/spock-jupiter/blob/master/pom.xml)    
    
```xml    
    
<build>    
    <build>    
        <defaultGoal>verify</defaultGoal>    
        <plugins>    
            <!-- Mandatory plugins for using Spock -->    
            <plugin>    
                <groupId>org.apache.maven.plugins</groupId>    
                <artifactId>maven-compiler-plugin</artifactId>    
                <version>3.10.1</version>    
            </plugin>    
            <plugin>    
                <groupId>org.codehaus.gmavenplus</groupId>    
                <artifactId>gmavenplus-plugin</artifactId>    
                <version>3.0.0</version>    
                <executions>    
                    <execution>    
                        <goals>    
                            <goal>compile</goal>    
                            <goal>compileTests</goal>    
                            <!--                            <goal>addSources</goal>-->    
                            <!--                            <goal>addTestSources</goal>-->    
                            <!--                            <goal>generateStubs</goal>-->    
                            <!--                            <goal>generateTestStubs</goal>-->    
                            <!--                            <goal>removeStubs</goal>-->    
                            <!--                            <goal>removeTestStubs</goal>-->    
                        </goals>    
                    </execution>    
                </executions>    
                <configuration>    
                    <invokeDynamic>true</invokeDynamic>    
                </configuration>    
            </plugin>    
            <plugin>    
                <groupId>org.apache.maven.plugins</groupId>    
                <artifactId>maven-surefire-plugin</artifactId>    
                <version>3.0.0-M7</version>    
                <dependencies>    
                    <dependency>    
                        <groupId>org.junit.jupiter</groupId>    
                        <artifactId>junit-jupiter-engine</artifactId>    
                        <version>5.9.3</version>    
                    </dependency>    
                    <dependency>    
                        <groupId>org.junit.vintage</groupId>    
                        <artifactId>junit-vintage-engine</artifactId>    
                        <version>5.9.3</version>    
                    </dependency>    
                </dependencies>    
                <configuration>    
                    <detail>true</detail>    
                    <includes>    
                        <include>%regex[.*]</include>    
                    </includes>    
                    <!--                    <useModulePath>false</useModulePath> &lt;!&ndash; https://issues.apache.org/jira/browse/SUREFIRE-1809 &ndash;&gt;-->    
                    <!--                    <useFile>false</useFile>-->    
                    <!--                    <includes>-->    
                    <!--                        <include>**/*Spec.class</include>-->    
                    <!--                        <include>**/*Test.java</include>-->    
                    <!--                        <include>**/*Test.groovy</include>-->    
                    <!--                        <include>**/*Spec.groovy</include>-->    
                    <!--                    </includes>-->    
                    <!--                    <statelessTestsetReporter implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5Xml30StatelessReporter">-->    
                    <!--                        <disable>false</disable>-->    
                    <!--                        <version>3.0</version>-->    
                    <!--                        <usePhrasedFileName>false</usePhrasedFileName>-->    
                    <!--                        <usePhrasedTestSuiteClassName>true</usePhrasedTestSuiteClassName>-->    
                    <!--                        <usePhrasedTestCaseClassName>true</usePhrasedTestCaseClassName>-->    
                    <!--                        <usePhrasedTestCaseMethodName>true</usePhrasedTestCaseMethodName>-->    
                    <!--                    </statelessTestsetReporter>-->    
                </configuration>    
            </plugin>    
            <plugin>    
                <artifactId>maven-failsafe-plugin</artifactId>    
                <version>3.0.0-M7</version>    
            </plugin>    
            <plugin>    
                <groupId>org.springframework.boot</groupId>    
                <artifactId>spring-boot-maven-plugin</artifactId>    
            </plugin>    
        </plugins>    
    </build>    
    
    <repositories>    
        <repository>    
            <id>gitlab-maven</id>    
            <url>https://gitlab.guardianportal.us/api/v4/groups/5/-/packages/maven</url>    
        </repository>    
    </repositories>    
    <dependencyManagement>    
        <dependencies>    
            <dependency>    
                <groupId>org.spockframework</groupId>    
                <artifactId>spock-bom</artifactId>    
                <version>2.1-groovy-3.0</version>    
                <!-- use below for Groovy 4 -->    
                <!-- <version>2.2-M1-groovy-4.0</version> -->    
                <type>pom</type>    
                <scope>import</scope>    
            </dependency>    
            <dependency>    
                <groupId>org.junit</groupId>    
                <artifactId>junit-bom</artifactId>    
                <version>5.9.3</version>    
                <type>pom</type>    
                <scope>import</scope>    
            </dependency>    
        </dependencies>    
    </dependencyManagement>    
    <dependencies>    
        <dependency>    
            <groupId>org.spockframework</groupId>    
            <artifactId>spock-core</artifactId>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.apache.groovy</groupId>    
            <artifactId>groovy</artifactId>    
            <version>4.0.6</version>    
        </dependency>    
        <dependency>    
            <groupId>org.apache.groovy</groupId>    
            <artifactId>groovy-sql</artifactId>    
            <version>4.0.13</version>    
        </dependency>    
        <dependency> <!-- enables mocking of classes (in addition to interfaces) -->    
            <groupId>net.bytebuddy</groupId>    
            <artifactId>byte-buddy</artifactId>    
            <version>1.12.17</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency> <!-- enables mocking of classes without default constructor (together with CGLIB) -->    
            <groupId>org.objenesis</groupId>    
            <artifactId>objenesis</artifactId>    
            <version>3.3</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.junit.jupiter</groupId>    
            <artifactId>junit-jupiter</artifactId>    
            <version>5.9.3</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.junit.jupiter</groupId>    
            <artifactId>junit-jupiter-api</artifactId>    
            <version>5.9.3</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.junit.jupiter</groupId>    
            <artifactId>junit-jupiter-engine</artifactId>    
            <version>5.9.3</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.junit.platform</groupId>    
            <artifactId>junit-platform-launcher</artifactId>    
            <version>1.9.3</version>    
            <scope>test</scope>    
        </dependency>    
        <dependency>    
            <groupId>org.junit.platform</groupId>    
            <artifactId>junit-platform-engine</artifactId>    
        </dependency>    
    
    
        <!-- add dependencies to enable JUnit 4 style tests -->    
        <!-- add dependencies to enable JUnit 4 style tests -->    
    </dependencies>    
```    
    
---  
    
# Testing    
    
## Test Controller    
    
```groovy    
import grails.testing.web.controllers.ControllerUnitTest    
import spock.lang.Specification    
    
class StudentControllerSpec extends Specification implements ControllerUnitTest<StudentController> {    
    def 'Test the index action returns the correct model'() {    
        given:    
        List<Student> sampleStudents = [new Student(name: 'Nirav', grade: 100),    
                                        new Student(name: 'Jeff', grade: 95),    
                                        new Student(name: 'Sergio', grade: 90),]    
        controller.studentService = Stub(StudentService) {    
            list(_) >> sampleStudents    
            count() >> sampleStudents.size()    
        }    
    
        when: 'The index action is executed'    
        controller.index()    
    
        then: 'The model is correct'    
        model.studentList    
        model.studentList.size() == sampleStudents.size()    
        model.studentList.find { it.name == 'Nirav' && it.grade == 100 }    
        model.studentList.find { it.name == 'Jeff' && it.grade == 95 }    
        model.studentList.find { it.name == 'Sergio' && it.grade == 90 }    
        model.studentCount == sampleStudents.size()    
    }    
}    
```    
    
```groovy    
class StudentControllerSpec extends Specification implements ControllerUnitTest<StudentController> {    
    
    def 'If you save without supplying name and grade(both required) you remain in the create form'() {    
    
        when:    
        request.contentType = FORM_CONTENT_TYPE    
        request.method = 'POST'    
        controller.save()    
    
        then:    
        model.student    
        view == 'create'    
    }    
    
}    
```    
    
```groovy    
import grails.testing.web.controllers.ControllerUnitTest    
import spock.lang.Specification    
    
    
class StudentControllerSpec extends Specification implements ControllerUnitTest<StudentController> {    
    
    def 'if the users supplies both name and grade, save is successful '() {    
        given:    
        String name = 'Nirav'    
        BigDecimal grade = 100    
        Long id = 1L    
        controller.studentService = Stub(StudentService) {    
            save(_, _) >> new Student(name: name, grade: grade, id: id)    
            read(_) >> new Student(name: name, grade: grade, id: id)    
        }    
        when:    
        request.method = 'POST'    
        request.contentType = FORM_CONTENT_TYPE    
        params['name'] = name    
        params['grade'] = grade    
        controller.save()    
    
        then: 'a message indicating that the user has been saved is placed'    
        flash.message    
    
        and: 'the user is redirected to show the student'    
        response.redirectedUrl.startsWith('/student/show')    
    
        and: 'a found response code is used'    
        response.status == 302    
    }    
    
}    
```    
    
```groovy    
import grails.testing.web.controllers.ControllerUnitTest    
import spock.lang.Specification    
    
    
class StudentControllerSpec extends Specification implements ControllerUnitTest<StudentController> {    
    
    void 'JSON payload is bound to the command object. If the student is saved, a 201 is returned'() {    
        given:    
        String name = 'Nirav'    
        BigDecimal grade = 100    
        Long id = 1L    
        controller.studentService = Stub(StudentService) {    
            save(_, _) >> new Student(name: name, grade: grade, id: id)    
        }    
    
        when: 'json request is sent with domain conversion'    
        request.method = 'POST'    
        request.json = '{"name":"' + name + '","grade":' + grade + '}'    
        controller.save()    
    
        then: 'CREATED status code is set'    
        response.status == 201    
    }    
    
}    
```    
    
```groovy    
import static javax.servlet.http.HttpServletResponse.SC_METHOD_NOT_ALLOWED    
import static javax.servlet.http.HttpServletResponse.SC_OK    
import grails.testing.web.controllers.ControllerUnitTest    
import spock.lang.Specification    
import spock.lang.Unroll    
    
@SuppressWarnings(['JUnitPublicNonTestMethod', 'JUnitPublicProperty'])    
class StudentControllerAllowedMethodsSpec extends Specification implements ControllerUnitTest<StudentController> {    
    
    @Unroll    
    def "StudentController.save does not accept #method requests"(String method) {    
        when:    
        request.method = method    
        controller.save()    
    
        then:    
        response.status == SC_METHOD_NOT_ALLOWED    
    
        where:    
        method << ['PATCH', 'DELETE', 'GET', 'PUT']    
    }    
    
    def "StudentController.save accepts POST requests"() {    
        when:    
        request.method = 'POST'    
        controller.save()    
    
        then:    
        response.status == SC_OK    
    }    
}    
```    
    
> functional test    
    
- build.gradle    
    
```groovy    
dependencies {    
    ...    
    testImplementation "io.micronaut:micronaut-http-client"    
}    
```    
    
```groovy    
import grails.testing.mixin.integration.Integration    
import grails.testing.spock.OnceBefore    
import io.micronaut.core.type.Argument    
import io.micronaut.http.HttpRequest    
import io.micronaut.http.HttpResponse    
import io.micronaut.http.HttpStatus    
import io.micronaut.http.client.HttpClient    
import spock.lang.Shared    
import spock.lang.Specification    
    
@SuppressWarnings(['JUnitPublicNonTestMethod', 'JUnitPublicProperty'])    
@Integration    
class StudentControllerIntSpec extends Specification {    
    
    @Shared    
    HttpClient client    
    
    StudentService studentService    
    
    @OnceBefore    
    void init() {    
        String baseUrl = "http://localhost:$serverPort"    
        this.client = HttpClient.create(baseUrl.toURL())    
    }    
    
    def 'test json in URI to return students'() {    
        given:    
        List<Serializable> ids = []    
        Student.withNewTransaction {    
            ids << studentService.save('Nirav', 100 as BigDecimal).id    
            ids << studentService.save('Jeff', 95 as BigDecimal).id    
            ids << studentService.save('Sergio', 90 as BigDecimal).id    
        }    
    
        expect:    
        studentService.count() == 3    
    
        when:    
        HttpRequest request = HttpRequest.GET('/student.json')    
        HttpResponse<List<Map>> resp = client.toBlocking().exchange(request, Argument.of(List, Map))    
    
        then:    
        resp.status == HttpStatus.OK    
        resp.body()    
        resp.body().size() == 3    
        resp.body().find { it.grade == 100 && it.name == 'Nirav' }    
        resp.body().find { it.grade == 95 && it.name == 'Jeff' }    
        resp.body().find { it.grade == 90 && it.name == 'Sergio' }    
    
        cleanup:    
        Student.withNewTransaction {    
            ids.each { id ->    
                studentService.delete(id)    
            }    
        }    
    }    
}    
```    
    
## Testing Secured app    
    
```groovy    
import grails.testing.mixin.integration.Integration    
import io.micronaut.core.type.Argument    
import io.micronaut.http.HttpRequest    
import io.micronaut.http.HttpResponse    
import io.micronaut.http.HttpStatus    
import io.micronaut.http.client.HttpClient    
import io.micronaut.http.client.exceptions.HttpClientException    
import spock.lang.AutoCleanup    
import spock.lang.Shared    
import spock.lang.Specification    
import grails.testing.spock.OnceBefore    
    
@SuppressWarnings(['MethodName', 'DuplicateNumberLiteral', 'Instanceof'])    
@Integration    
class ApiAnnouncementControllerSpec extends Specification {    
    
    @Shared    
    @AutoCleanup    
    HttpClient client    
    
    @OnceBefore    
    void init() {    
        client = HttpClient.create(new URL("http://localhost:$serverPort"))    
    }    
    
    def 'test /api/announcements url is secured'() {    
        when:    
        HttpRequest request = HttpRequest.GET('/api/announcements')    
        client.toBlocking().exchange(request,    
                Argument.of(List, AnnouncementView),    
                Argument.of(CustomError))    
    
        then:    
        HttpClientException e = thrown(HttpClientException)    
        e.response.status == HttpStatus.UNAUTHORIZED    
    
        when:    
        Optional<CustomError> jsonError = e.response.getBody(CustomError)    
    
        then:    
        jsonError.isPresent()    
        jsonError.get().status == 401    
        jsonError.get().error == 'Unauthorized'    
        jsonError.get().message == null    
        jsonError.get().path == '/api/announcements'    
    }    
    
    def "test a user with the role ROLE_BOSS is able to access /api/announcements url"() {    
        when: 'login with the sherlock'    
        UserCredentials credentials = new UserCredentials(username: 'sherlock', password: 'elementary')    
        HttpRequest request = HttpRequest.POST('/api/login', credentials)    
        HttpResponse<BearerToken> resp = client.toBlocking().exchange(request, BearerToken)    
    
        then:    
        resp.status.code == 200    
        resp.body().roles.find { it == 'ROLE_BOSS' }    
    
        when:    
        String accessToken = resp.body().accessToken    
    
        then:    
        accessToken    
    
        when:    
        HttpResponse<List> rsp = client.toBlocking().exchange(HttpRequest.GET('/api/announcements')    
                .header('Authorization', "Bearer ${accessToken}"), Argument.of(List, AnnouncementView))    
    
        then:    
        rsp.status.code == 200    
        rsp.body() != null    
        ((List) rsp.body()).size() == 1    
        ((List) rsp.body()).get(0) instanceof AnnouncementView    
        ((AnnouncementView) ((List) rsp.body()).get(0)).message == 'The Hound of the Baskervilles'    
    }    
    
    def "test a user with the role ROLE_EMPLOYEE is NOT able to access /api/announcements url"() {    
        when: 'login with the watson'    
    
        UserCredentials creds = new UserCredentials(username: 'watson', password: '221Bbakerstreet')    
        HttpRequest request = HttpRequest.POST('/api/login', creds)    
        HttpResponse<BearerToken> resp = client.toBlocking().exchange(request, BearerToken)    
    
        then:    
        resp.status.code == 200    
        !resp.body().roles.find { it == 'ROLE_BOSS' }    
        resp.body().roles.find { it == 'ROLE_EMPLOYEE' }    
    
        when:    
        String accessToken = resp.body().accessToken    
    
        then:    
        accessToken    
    
        when:    
        resp = client.toBlocking().exchange(HttpRequest.GET('/api/announcements')    
                .header('Authorization', "Bearer ${accessToken}"))    
    
        then:    
        def e = thrown(HttpClientException)    
        e.response.status == HttpStatus.FORBIDDEN    
    }    
}    
```    
    
### with GEB    
    
```groovy    
import geb.Page    
    
class LoginPage extends Page {    
    static url = '/login/auth'    
    
    static at = {    
        title == 'Login'    
    }    
    
    static content = {    
        loginButton { $('#submit', 0) }    
        usernameInputField { $('#username', 0) }    
        passwordInputField { $('#password', 0) }    
    }    
    
    void login(String username, String password) {    
        usernameInputField << username    
        passwordInputField << password    
        loginButton.click()    
    }    
}    
```    
    
```groovy    
import geb.Page    
    
class AnnouncementListingPage extends Page {    
    static url = '/announcement/index'    
    
    static at = {    
        $('#list-announcement').text()?.contains 'Announcement List'    
    }    
}    
```    
    
```groovy    
import geb.spock.GebSpec    
import grails.testing.mixin.integration.Integration    
    
@SuppressWarnings('MethodName')    
@Integration    
class AnnouncementControllerSpec extends GebSpec {    
    
    void 'test /announcement/index is secured, but accesible to users with role ROLE_BOSS'() {    
        when: 'try to visit announcement listing without login'    
        go '/announcement/index'    
    
        then: 'it is redirected to login page'    
        at LoginPage    
    
        when: 'signs in with a ROLE_BOSS user'    
        LoginPage page = browser.page(LoginPage)    
        page.login('sherlock', 'elementary')    
    
        then: 'he gets access to the announcement listing page'    
        at AnnouncementListingPage    
    }    
    
    void 'test /announcement/index is secured, but accesible to users with role ROLE_EMPLOYEE'() {    
        when: 'try to visit announcement listing without login'    
        go '/announcement/index'    
    
        then: 'it is redirected to login page'    
        at LoginPage    
    
        when: 'signs in with a ROLE_EMPLOYEE user'    
        LoginPage page = browser.page(LoginPage)    
        page.login('watson', '221Bbakerstreet')    
    
        then: 'he gets access to the announcement listing page'    
        at AnnouncementListingPage    
    }    
}    
```    
    
## Mocking service and then method call, setting dummy data for the return(put in test method)    
    
```groovy    
   controller.openweathermapService = Mock(OpenweathermapService)    
    
controller.openweathermapService.currentWeatherByGeoID(_) >> currentWeather    
```    
    
## Mocking Service used in a service you are testing(put at beginning of the test class)    
    
```groovy    
    
Closure doWithSpring() {    
    { ->    
        assessmentOrderService AssessmentOrderService    
    }    
}    
    
AssessmentOrderService assessmentOrderService    
```    
    
## Mocking Method in service you are testing    
    
```groovy    
 @Shared    
GroupCompareJoinUserGroupService groupCompareJoinUserGroupService    
    
setupSpec() {    
    mockDomain GroupCompareJoinUserGroup    
    
}    
    
def "some test"() {    
    service.groupCompareJoinUserGroupService = Mock(GroupCompareJoinUserGroupService)    
    service.groupCompareJoinUserGroupService.fetchAssociatedAssessments(_ as GroupCompare, true) >> { groupCompare, removeRelationships -> groupCompareJoinUserGroupService.fetchAssociatedAssessments(groupCompare, true) }    
    
}    
    
```    
    
## Testing a webpage with spock and geb    
    
```groovy    
import geb.Page    
import geb.module.TextInput    
    
class SignUpPage extends Page {    
    
    static url = '/signup'    
    
    static content = {    
        firstNameInput { $(name: "firstName").module(TextInput) }    
        lastNameInput { $(name: "lastName").module(TextInput) }    
        emailInput { $(name: "email").module(TextInput) }    
        submitButton { $('#submit') }    
    }    
    
    void submit(String firstName, String lastName, String email) {    
        firstNameInput.text = firstName    
        lastNameInput.text = lastName    
        emailInput.text = email    
        submitButton.click()    
    }    
}    
```    
    
```groovy    
import geb.spock.GebSpec    
import grails.gorm.transactions.Rollback    
import grails.testing.mixin.integration.Integration    
    
@Integration    
class RegisterControllerSpec extends GebSpec {    
    
    NotificationService notificationService    
    
    UserService userService    
    
    @Rollback    
    def "If you signup a User, an Event triggers which causes a Notification to be saved"() {    
        when: 'you signup with a non existing user'    
        SignUpPage page = to SignUpPage    
        page.submit('Sergio', 'del Amo', 'delamos@email.com')    
    
        then: 'the user gets created and a notification is saved due to the event being triggered'    
        userService.count() == old(userService.count()) + 1    
        notificationService.count() == old(notificationService.count()) + 1    
    
        when: 'you try to signup with a user which is already in the database'    
        page = to SignUpPage    
        page.submit('Sergio', 'del Amo', 'delamos@email.com')    
    
        then: 'The user is not saved and no event gets triggered'    
        noExceptionThrown()    
        userService.count() == old(userService.count())    
        notificationService.count() == old(notificationService.count())    
    
        cleanup:    
        userService.deleteByEmail('delamos@email.com')    
        notificationService.deleteByEmail('delamos@email.com')    
    }    
}    
```    
    
## Mocking method in domain    
    
```groovy    
    
[service / controller / domain].metaclass.’ static ’.[method] = {    
    [arguments] -> [what to    
    return ]    
}    
    
```    
    
## Checking validity of constraints    
    
```groovy    
!newScheduledInterview2.validate(['scheduledBy', 'scheduledDate'])    
!newScheduledInterview2.save(flush: true)    
newScheduledInterview2.errors['scheduledDate']?.code == 'unique'    
```    
    
## check if method was called for another service    
    
```groovy    
def called = false    
service.notifierService = Mock(NotifierService)    
service.notifierService.sendPostMarkEmail(_ as PostMarkEmail, _) >> { it -> called = true }    
```    
    
## check if method was called for same service    
    
```groovy    
service.metaClass.sendReminderEmail = { assessmentOrderId, templateId, sender, newTemplateBody, jobId -> calls++ }    
```    
    
## create an exception    
    
```groovy    
//create expando    
def testDelete = new Expando()    
    
// add exception to method call    
def exception = { new Exception("TEST") }    
testDelete.delete = { throw exception }    
    
// add class as return for a method    
service.metaClass.[method_to_throw_exception] = { testDelete }    
    
//example in CalenderServiceSpec.groovy / “test delete exception”    
//or    
service.metaClass.[yourMethod] >> { throw exception }    
```    
    
## catch exception    
    
```groovy    
def response = thrown(GraphServiceException)    
```    
    
## modify config during/for test    
    
```groovy    
   Holders.grailsApplication.config.outlook.clientId = "GUUNAR5"    
```    
    
## create a custom manager for a test    
    
```groovy    
    
def managerMap = [:]    
RoleGroup.findAll().each {    
    def myUser = User.build(clientSetupId: 1, email:    
            "${it.name}@mailinator.com", username: "${it.name}@mailinator.com")    
    UserRoleGroup.build(user: myUser, roleGroup: it)    
    def tokenAuthentication = new TokenAuthentication(decodedJwt(myUser), myUser)    
    tokenAuthentication.details = myUser    
    authMap[(it.name)] = tokenAuthentication    
    managerMap[(myUser.id)] = it.name ==~ /testManager.*/ ? [1, 2, 3] : []    
}    
service.userService = Mock(UserService)    
service.userService.fetchDirectReportIds(_) >> { it ->    
    managerMap.get(it[0])    
}    
```    
    
## Mocking hibernate used to test methods using where queriers / detached criteria / criteria builder    
    
```groovy    
 @Shared    
InterviewModelService interviewModelService    
    
@Shared    
HibernateDatastore hibernateDatastore    
    
@Shared    
PlatformTransactionManager transactionManager    
    
Map configuration = [    
        'hibernate.hbm2ddl.auto'              : 'create-drop',    
        'dataSource.url'                      : 'jdbc:h2:mem:myDB',    
        'hibernate.cache.region.factory_class': 'org.hibernate.cache.ehcache.EhCacheRegionFactory'    
]    
hibernateDatastore = new HibernateDatastore(configuration, CatalogDetail)    
transactionManager = hibernateDatastore.getTransactionManager()    
catalogDetailService = hibernateDatastore.getService(CatalogDetailService)    
    
    
//Set tests to rollback    
    
@Rollback    
void "test criteria builder for getting interview models should return all"() {    
    //test    
}    
```    
    
## Mock return value for service method used in the service you are testing    
    
```groovy    
service.springSecurityService = [authentication: [details: currentUser]]    
```    
    
## Mock a static method call from a domain    
    
```groovy    
ClientSetup.metaClass.static.fetchSecurityGroupLabelsByClientSetupId = { Long id, String en -> [secGroupNameLabel: 'secGroupNameLabel', secGroupCodeLabel: 'secGroupCodeLabel'] }    
```    
    
### Grails3    
    
[Controller](https://gist.github.com/14paxton/0d64ab846b4691d8d6f1ccd5ccc63b58)    
    
### Grails4    
    
#### Ex. Integrations test for controller    
    
```groovy    
package musicandcars    
    
import grails.testing.mixin.integration.Integration    
import grails.testing.spock.OnceBefore    
import io.micronaut.core.type.Argument    
import io.micronaut.http.HttpRequest    
import io.micronaut.http.HttpResponse    
import io.micronaut.http.HttpStatus    
import io.micronaut.http.MediaType    
import io.micronaut.http.client.HttpClient    
import spock.lang.Shared    
import spock.lang.Specification    
import spock.lang.Stepwise    
    
@Integration    
@Stepwise    
class CarFunctionalSpec extends Specification {    
    
    @Shared    
    HttpClient client    
    
    @OnceBefore    
    void init() {    
        String baseUrl = "http://localhost:$serverPort"    
        this.client = HttpClient.create(baseUrl.toURL())    
    }    
    
    void "test that no cars exist"() {    
        when:    
        HttpResponse<List<Map>> resp = client.toBlocking().exchange(HttpRequest.GET("/automobiles"), Argument.of(List, Map))    
    
        then:    
        resp.status == HttpStatus.OK    
        resp.body().size() == 0    
        resp.contentType.get().extension == MediaType.EXTENSION_JSON    
    }    
}    
```    
    
---  
    
# BuildTest plugin    
    
## Snippet from spock test    
    
> Pluggin for using test data builder    
    
- [BuildTestData](http://plugins.grails.org/plugin/longwa/build-test-data)    
    
```groovy    
    
import grails.buildtestdata.mixin.Build    
```    
    
<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">                
            use- implements BuildDomanTest\< \> instead of DomainUnitTest \< \>    
</div>                
    
```groovy    
    
@Build([Job, Tag, Type, Publisher])    
class StatisticsServiceSpec extends Specification implements AutowiredTest, DataTest, BuildDataTest, ServiceUnitTest<StatisticsService>, GrailsWebUnitTest {    
    
    def setupSpec() {    
        mockDomain Job    
        mockDomain Tag    
        mockDomain Type    
        mockDomain Publisher    
    }    
    
    def setup() {    
    }    
    
    def cleanup() {    
    }    
    
    void "get top publishers when we don't have nothing in our system"() {    
        given: "when we don't have any job published"    
    
        when: "we get top publishers"    
        def publishers = service.getTopPublishers()    
        then: "we will see 0 publishers"    
        publishers.size() == 0    
    }    
    
    void "get top publishers when we have multiple jobs published by the same publisher"() {    
        given: "when we have one 2 jobs published by the same publisher"    
        def tag = Tag.build()    
        def type = Type.build()    
        def publisher = Publisher.build()    
        Job.build(publisher: publisher, type: type, tags: [tag])    
        Job.build(publisher: publisher, type: type, tags: [tag])    
    
        when: "we get top publishers"    
        def publishers = service.getTopPublishers()    
        def pair = publishers.find { key, value ->    
            key.name.equals(http://publisher.name ) }    
                    then : "we will see 2 publishers"    
                    publishers.size() == 1    
                    pair?.value == 2    
        }    
    
    }    
```    
    
- config file test/resources/TestDataConfig    
    
```java    
import com.talentbank.core.ClientSetup    
    
import java.util.concurrent.ThreadLocalRandom    
    
//config file for test data plugin    
testDataConfig{    
        sampleData{    
        unitAdditionalBuild=['com.talentbank.core.assessmentOrder.AssessmentOrder':[com.talentbank.core.ClientSetup]]    
    
        'com.talentbank.core.ClientSetup'{    
        //work around for unique constraints    
        def i=55    
        clientId={->ThreadLocalRandom.current().nextLong(100000)}    
        companyCode={->"company${i}"}    
        clientName={->"clientName${i++}"}    
        }    
    
        'com.talentbank.core.User'{    
        def i=55    
        username={->"email${i++}@mailinator.com"}    
        email={->"email${i}@mailinator.com"}    
        }    
    
        'com.talentbank.core.assessmentOrder.AssessmentOrder'{    
        clientSetup={->ClientSetup.build()}    
        }    
        }    
        }    
```    
    
## Different ways to build    
    
```groovy    
    
def intviewModel = TestData.build(InterviewModel)    
def y = InterviewModel.build(source: Source.TBSIX)    
def z = build(InterviewModel, source: Source.TBSIX)    
```