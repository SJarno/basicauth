# Basic Auth with Spring Boot and Angular
Basic auth with Spring Security and Angular part 664

## About
Some testing and practice for future reference. Main goal is to update Spring Security from 5.8 to 6.x.

## Requirements
- Node v.16.14.2
- Angular v.14
- Spring Boot 3.0.2
- Java 17
- Gradle 7.6

## Running
From the front end root, run "ng build --configuration production --aot"
After this, from the root of the project run ".\gradlew bootRun"

## Issues
Currently unable to resolve situation with Cors configuration. But then again one can always use ng build --watch for local development.

## Status
Spring Boot 3.x and Spring Security 6.x now in place. 

## Authentication
Currently just with Basic auth, and with one pre-defined user

## Next steps
Use in memory user, next repo!
