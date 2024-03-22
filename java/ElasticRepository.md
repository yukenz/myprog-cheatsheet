# Spring Data Elastic

<!-- TOC -->
* [Spring Data Elastic](#spring-data-elastic)
    * [Dependencies](#dependencies)
    * [Configuration](#configuration)
    * [RestHighLevelClient Object](#resthighlevelclient-object)
    * [Static Resources](#static-resources)
    * [POJO Entity](#pojo-entity)
    * [Repository Class](#repository-class)
<!-- TOC -->

## Dependencies
- Spring Data Elasticsearch (Access + Driver)

## Configuration
- Extend **AbstractElasticsearchConfiguration**
- Annotation **@EnableElasticsearchRepositories** With basePackages="repository""
- Configure application.properties with prefix elasticsearch.url and inject with @Value

## RestHighLevelClient Object
- Override method **RestHighLevelClient** elasticsearchClient()
- Marking this method as **@Bean**
- Use **ClientConfiguration** class Builder to connect
- Use **RestClient** class to **create(config)** **rest()** based on config.

## Static Resources
- Create **static/es-settings.json**
```json
{
  "index": {
    
  }
}
```

## POJO Entity
- Create POJO Class Entity
- The Annotation
```java
@Document(indexName = "indexName")
@Setting(settingPath = "static/es-settings.json")
class example{
    
}

// ---
@Id
@Field(type = FieldType.Text)
private String example;
```

## Repository Class
- Create Repository Interface
- Then extends ElasticsearchRepository<POJOEntity,@Id>