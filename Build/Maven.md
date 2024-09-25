---
title:        Maven
permalink:    Build/Maven
category:     Build
parent:       Build
layout:       default
has_children: false
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

# [Settings](https://maven.apache.org/settings.html)

> Remember that there are two locations where a settings.xml file may live:

- Maven installation directory :```$M2_HOME/conf/settings.xml```

- User-specific settings file : ```~/.m2/settings.xml```

## Example with Keys

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<!--
 | This is the configuration file for Maven. It can be specified at two levels:
 |
 | 1. User Level. These settings.xml files provide configuration for a single
 | user, and are normally provided in
 |                 ${user.home}/.m2/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -s /path/to/user/settings.xml
 |
 |  2. Global Level. These settings.xml files provide configuration for all
 | Maven users on a machine (assuming they're all using the
 | same Maven installation). It's normally provided in
 | ${maven.home}/conf/settings.xml.
 |
 | NOTE: This location can be overridden with the CLI option:
 |
 |                 -gs /path/to/global/settings.xml
 |
 | The sections in this sample file are intended to give you a running start
 | at getting the most out of your Maven installation. Where appropriate, the
 | default values (values used when the setting is not specified) are provided.
 |
 |-->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <!-- localRepository
     | The path to the local repository maven will use to store artifacts.
     |
     | Default: ~/.m2/repository
    <localRepository>/path/to/local/repo</localRepository>
    -->

    <!-- interactiveMode
     | This will determine whether maven prompts you when it needs input. If set
     | to false, maven will use a sensible default value, perhaps based on some
     | other setting, for the parameter in question.
     |
     | Default: true
    <interactiveMode>true</interactiveMode>
    -->

    <!-- offline
     | Determines whether maven should attempt to connect to the network when
     | executing a build. This will have an effect on artifact downloads,
     | artifact deployment, and others.
     |
     | Default: false
    <offline>false</offline>
    -->

    <!-- pluginGroups
     | This is a list of additional group identifiers that will be searched when
     | resolving plugins by their prefix, i.e., when invoking a command line like
     | "mvn prefix:goal". Maven will automatically add the group identifiers
     | "org.apache.maven.plugins" and "org.codehaus.mojo" if these are not
     | already contained in the list.
     |-->
    <pluginGroups>
        <!-- pluginGroup
         | Specifies a further group identifier to use for plugin lookup.
        <pluginGroup>com.your.plugins</pluginGroup>
        -->
    </pluginGroups>

    <!-- proxies
     | This is a list of proxies which can be used on this machine to connect to
     | the network. Unless otherwise specified (by system property or command-
     | line switch), the first proxy specification in this list marked as active
     | will be used.
     |-->
    <proxies>
        <!-- proxy
         | Specification for one proxy, to be used in connecting to the network.
         |
        <proxy>
          <id>optional</id>
          <active>true</active>
          <protocol>http</protocol>
          <username>proxyuser</username>
          <password>proxypass</password>
          <host>proxy.host.net</host>
          <port>80</port>
          <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
        </proxy>
        -->
    </proxies>

    <!-- servers
     | This is a list of authentication profiles, keyed by the server-id used
     | within the system. Authentication profiles can be used whenever maven must
     | make a connection to a remote server.
     |-->
    <servers>
        <!-- server
         | Specifies the authentication information to use when connecting to a
         | particular server, identified by a unique name within the system
         | (referred to by the 'id' attribute below).
         |
         | NOTE: You should either specify username/password OR
         | privateKey/passphrase, since these pairings are used together.
         |
        <server>
          <id>deploymentRepo</id>
          <username>repouser</username>
          <password>repopwd</password>
        </server>
        -->

        <!-- Another sample, using keys to authenticate.
        <server>
          <id>siteServer</id>
          <privateKey>/path/to/private/key</privateKey>
          <passphrase>optional; leave empty if not used.</passphrase>
        </server>
        -->
    </servers>

    <!-- mirrors
     | This is a list of mirrors to be used in downloading artifacts from remote
     | repositories.
     |
     | It works like this: a POM may declare a repository to use in resolving
     | certain artifacts. However, this repository may have problems with heavy
     | traffic at times, so people have mirrored it to several places.
     |
     | That repository definition will have a unique id, so we can create a
     | mirror reference for that repository, to be used as an alternate download
     | site. The mirror site will be the preferred server for that repository.
     |-->
    <mirrors>
        <!-- mirror
         | Specifies a repository mirror site to use instead of a given repository.
         | The repository that this mirror serves has an ID that matches the
         | mirrorOf element of this mirror. IDs are used for inheritance and direct
         | lookup purposes and must be unique across the set of mirrors.
         |
        <mirror>
          <id>mirrorId</id>
          <mirrorOf>repositoryId</mirrorOf>
          <name>Human Readable Name for this Mirror.</name>
          <url>http://my.repository.com/repo/path</url>
        </mirror>
         -->
    </mirrors>

    <!-- profiles
     | This is a list of profiles which can be activated in a variety of ways,
     | and which can modify the build process. Profiles provided in the
     | settings.xml are intended to provide local machine-specific paths and
     | repository locations which allow the build to work in the local
     | environment.
     |
     | For example, if you have an integration testing plugin - like cactus -
     | that needs to know where your Tomcat instance is installed, you can
     | provide a variable here such that the variable is dereferenced during the
     | build process to configure the cactus plugin.
     |
     | As noted above, profiles can be activated in a variety of ways. One
     | way - the activeProfiles section of this document (settings.xml) - will be
     | discussed later. Another way essentially relies on the detection of a
     | system property, either matching a particular value for the property, or
     | merely testing its existence. Profiles can also be activated by JDK
     | version prefix, where a value of '1.4' might activate a profile when the
     | build is executed on a JDK version of '1.4.2_07'. Finally, the list of
     | active profiles can be specified directly from the command line.
     |
     | NOTE: For profiles defined in the settings.xml, you are restricted to
     | specifying only artifact repositories, plugin repositories, and
     | free-form properties to be used as configuration variables for
     | plugins in the POM.
     |
     |-->

    <profiles>
        <!-- profile
         | Specifies a set of introductions to the build process, to be activated
         | using one or more of the mechanisms described above. For inheritance
         | purposes, and to activate profiles via <activatedProfiles/> or the
         | command line, profiles have to have an ID that is unique.
         |
         | An encouraged best practice for profile identification is to use a
         | consistent naming convention for profiles, such as 'env-dev',
         | 'env-test', 'env-production', 'user-jdcasey', 'user-brett', etc. This
         | will make it more intuitive to understand what the set of introduced
         | profiles is attempting to accomplish, particularly when you only have a
         | list of profile id's for debug.
         |
         | This profile example uses the JDK version to trigger activation, and
         | provides a JDK-specific repo.
        <profile>
          <id>jdk-1.4</id>

          <activation>
            <jdk>1.4</jdk>
          </activation>

          <repositories>
            <repository>
              <id>jdk14</id>
              <name>Repository for JDK 1.4 builds</name>
              <url>http://www.myhost.com/maven/jdk14</url>
              <layout>default</layout>
              <snapshotPolicy>always</snapshotPolicy>
            </repository>
          </repositories>
        </profile>
        -->

        <!--
         | Here is another profile, activated by the system property 'target-env'
         | with a value of 'dev', which provides a specific path to the Tomcat
         | instance. To use this, your plugin configuration might hypothetically
         | look like:
         |
         | ...
         | <plugin>
         |   <groupId>org.myco.myplugins</groupId>
         |   <artifactId>myplugin</artifactId>
         |
         |   <configuration>
         |     <tomcatLocation>${tomcatPath}</tomcatLocation>
         |   </configuration>
         | </plugin>
         | ...
         |
         | NOTE: If you just wanted to inject this configuration whenever someone
         |       set 'target-env' to anything, you could just leave off the
         |       <value/> inside the activation-property.
         |
        <profile>
          <id>env-dev</id>

          <activation>
            <property>
              <name>target-env</name>
              <value>dev</value>
            </property>
          </activation>

          <properties>
            <tomcatPath>/path/to/tomcat/instance</tomcatPath>
          </properties>
        </profile>
        -->
    </profiles>

    <!-- activeProfiles
     | List of profiles that are active for all builds.
     |
    <activeProfiles>
      <activeProfile>alwaysActiveProfile</activeProfile>
      <activeProfile>anotherAlwaysActiveProfile</activeProfile>
    </activeProfiles>
    -->
</settings>
```

## [Custom Repo](https://maven.apache.org/settings.html#Repositories)

> [Maven Server Setting](https://maven.apache.org/settings.html#Servers)

```xml

<settings xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <activeProfiles>
        <activeProfile>local-build</activeProfile>
    </activeProfiles>
    <servers>
        <server>
            <id>nexus-repository-group-local</id>
            <username>${username}</username>
            <password>${password}</password>
        </server>
    </servers>
    <profiles>
        <profile>
            <id>local-build</id>
            <repositories>
                <repository>
                    <id>nexus-repository-group-local</id>
                    <layout>default</layout>
                    <url>https://nexus.apps.dla.mil/repository/devsecops-local/</url>
                    <releases>
                        <enabled>true</enabled>
                        <updatePolicy>never</updatePolicy>
                    </releases>
                    <snapshots>
                        <enabled>true</enabled>
                        <updatePolicy>never</updatePolicy>
                    </snapshots>
                </repository>
            </repositories>
        </profile>
    </profiles>
</settings>
```

## Create project-specific Maven settings

> After maven 3.3.1, use the project-settings-extension to load the project settings,
> and put project-specific mirrors into ${basedir}/.mvn/settings.xml in each project.

- ```${basedir}/.mvn/extensions.xml```

```xml

<extensions xmlns="http://maven.apache.org/EXTENSIONS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/EXTENSIONS/1.0.0 http://maven.apache.org/xsd/core-extensions-1.0.0.xsd">
    <extension>
        <groupId>com.github.gzm55.maven</groupId>
        <artifactId>project-settings-extension</artifactId>
        <version>0.3.5</version>
    </extension>
</extensions>
```

- ```${basedir}/.mvn/settings.xml```

```xml

<settings>

    <mirrors>
        <mirror>
            <id>id</id>
            <url>https://url-for-this-project/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>

    <profiles>
        <!-- profiles for this project, such as corp internal repositories -->
    </profiles>

</settings>
```

### IntelliJ

> you can set a different settings file for any project:

- Go to ```Settings``` -> `Build, Execution, Deployment` -> `Build tools` -> `Maven`
- Set the user settings file to `local-settings.xml`

# Add Local Repo

## Settings

```xml

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <localRepository>${user.home}/personal-wks/.m2/repository</localRepository>
    <interactiveMode>true</interactiveMode>
    <offline>false</offline>
</settings>
```

## Jar file

> Install the JAR into your local Maven repository (typically .m2 in your home folder) as follows:

```shell
  mvn install:install-file \
   -Dfile=<path-to-file> \
   -DgroupId=<group-id> \
   -DartifactId=<artifact-id> \
   -Dversion=<version> \
   -Dpackaging=<packaging> \
   -DgeneratePom=true
```

- Where each refers to:

  ```<path-to-file>```: the path to the file to load e.g → ```c:\kaptcha-2.3.jar```

  ```<group-id>```: the group that the file should be registered under e.g →``` com.google.code```

  ```<artifact-id>```: the artifact name for the file e.g →``` kaptcha```

  ```<version>```: the version of the file e.g →``` 2.3```

  ```<packaging>```: the packaging of the file e.g. → ```jar```

## pom.xml

> Step 1: Configure the maven-install-plugin with the goal install-file in your pom.xml

```xml

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-install-plugin</artifactId>
    <executions>
        <execution>
            <id>install-external-non-maven-jar-MWS-Client-into-local-maven-repo</id>
            <phase>clean</phase>
            <configuration>
                <repositoryLayout>default</repositoryLayout>
                <groupId>com.amazonservices.mws</groupId>
                <artifactId>mws-client</artifactId>
                <version>1.0</version>
                <file>${project.basedir}/lib/MWSClientJavaRuntime-1.0.jar</file>
                <packaging>jar</packaging>
                <generatePom>true</generatePom>
            </configuration>
            <goals>
                <goal>install-file</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

> Step 2: Once you have configured the maven-install-plugin as shown above in your pom.xml file, you have to use these jars in your pom.xml as usual:

```xml

<dependency>
    <groupId>com.amazonservices.mws</groupId>
    <artifactId>mws-client</artifactId>
    <version>1.0</version>
</dependency>
```

## jar

> The really quick and dirty way is to point to a local file, please note "system" is deprecated by now:

```xml

<dependency>
    <groupId>com.sample</groupId>
    <artifactId>samplifact</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>C:\DEV\myfunnylib\yourJar.jar</systemPath>
</dependency>
```

> However, this will only live on your machine (obviously), for sharing it usually makes sense to use a proper m2 archive (nexus/artifactory) or if
> you do not have any of these or don't want to set
> one
> up a local maven structured archive and configure a "repository" in your pom:

- local:

```xml

<repositories>
    <repository>
        <id>my-local-repo</id>
        <url>file://C:/DEV//mymvnrepo</url>
    </repository>
</repositories>
```

- remote:

```xml

<repositories>
    <repository>
        <id>my-remote-repo</id>
        <url>http://192.168.0.1/whatever/mavenserver/youwant/repo</url>
    </repository>
</repositories>
```

> for this solution, a relative path is also possible using the basedir variable:

```xml

<url>file:${basedir}</url>
```