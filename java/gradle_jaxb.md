# Setup JAXWS on Gradle Groovy

## Setup Configuration

```groovy
configurations {
    //....
    
    compileOnly {
        extendsFrom annotationProcessor
    }
    //Register Deps Here
    jaxws
}
```

## Setup OutDir
```groovy
/* Configure Out Dir */
ext.jaxwsSourceDir = "${buildDir}/generated/sources/jaxws" as GStringImpl
```

## Setup Dependencies

```groovy
dependencies {
    //....
    
    //WS Deps
    implementation('org.springframework.boot:spring-boot-starter-web-services') {
        exclude group: 'org.springframework.boot', module: 'spring-boot-starter-tomcat'
        exclude group: 'org.springframework.boot', module: 'spring-boot-starter-web'
    }

    //jaxws deps
    jaxws 'com.sun.xml.ws:jaxws-tools:3.0.0',
            'jakarta.xml.ws:jakarta.xml.ws-api:3.0.0',
            'jakarta.xml.bind:jakarta.xml.bind-api:3.0.0',
            'jakarta.activation:jakarta.activation-api:2.0.0',
            'com.sun.xml.ws:jaxws-rt:3.0.0'
}
```

## Register WSDL Processor to Compile Task

```groovy
// Register Task to Gradle
tasks.register('wsimport') {
    description = 'Generate classes from wsdl using wsimport'

    doLast {
        project.mkdir(jaxwsSourceDir)
        ant {
            taskdef(name: 'wsimport',
                    classname: 'com.sun.tools.ws.ant.WsImport',
                    classpath: configurations.jaxws.asPath
            )
            wsimport(
                    keep: true,
                    destdir: jaxwsSourceDir,
                    extension: true,
                    verbose: true,
                    /* Change */ wsdl: "http://localhost:5555/ws/ws.provider:validateLicenseProvider?WSDL",
                    xnocompile: true,
                    package: "com.example.wm.wsdl") {
                xjcarg(value: "-XautoNameResolution")
            }
        }
    }
}

sourceSets {
    main {
        java.srcDirs += jaxwsSourceDir
    }
}

compileJava {
    dependsOn wsimport
}
```