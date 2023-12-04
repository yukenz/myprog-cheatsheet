1. buat folder dengan nama repo di Root Project

2. file t24-specification-02-2023.jar letakan di Root Project

3. deploy Local Repo

``` bash
mvn deploy:deploy-file
-Durl=file:///c:/Users/p/IdeaProjects/autosave-emas/repo
-Dfile=t24-specification-02-2023.jar
-DgroupId=co.id.bankbsi
-DartifactId=t24-specification
-Dversion=02-2023
-Dpackaging=jar
```

4. Tambahkan Repository di pom.xml
```xml
<repository>
 <id>project.local</id>
 <name>project</name>
 <url>file:${project.basedir}/repo</url>
</repository>
```

5. Tambahkan Package
```xml
<dependency>
 <groupId>co.id.bankbsi</groupId>
 <artifactId>t24-specification</artifactId>
 <version>02-2023</version>
</dependency>
```