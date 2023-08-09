# Technology resource tracker

## Description

Technology resource tracker is a pet project dedicated to practising development skills with Spring Boot, Docker, (latest) Java, and Angular.
This user-friendly web application is designed to help users bookmark and organize their favorite links from the internet. 
With technology resource tracker, you'll never lose track of interesting articles, blogs, presentations, or any valuable online 
content again. Say goodbye to browser clutter and messy bookmarks – technology resource tracker provides a centralized and 
intuitive platform to store, categorize, and access your saved links with ease.


### Key features

* **Effortless Link Saving:** Whenever users come across a captivating link, they can simply copy its URL and paste it into Technology resource tracker. Add relevant tags, a descriptive type (presentation, video, article, etc.), or a brief description to make it easy to find later.

* **Organize with Tags:** Tags help users categorize their saved links and create a personalized organization system. Seamlessly sort and search through links based on topics, interests, or any custom categories.

* **Simple and Intuitive Interface:** Technology resource tracker boasts a clean and user-friendly interface, making the process of saving and managing links a breeze. Its minimalist design ensures an intuitive experience for users of all technical levels.

* **Accessible Anywhere, Anytime:** Technology resource tracker is a web-based application, accessible from any device with an internet connection. Access your saved links on your desktop, laptop, tablet, or smartphone – perfect for on-the-go browsing.

* **Privacy and Security:** We prioritize the privacy and security of our users. All data is encrypted and stored securely, ensuring that your saved links remain confidential and accessible only to you.

* **Search and Discover:** Easily find saved links using the powerful search functionality. Whether you need to revisit a specific link or explore saved content based on specific criteria, Technology resource tracker has you covered.

## Installation and Usage

Project is Maven-based. Compile, run (integration) tests and build Docker image.
```
mvn -f backend/pom.xml clean verify -Pcompose
```
Run technology resource tracker in Docker container (requires previous step). 
```
docker-compose up tech-resource-tracker-be
```
To quickly rebuild docker container without running tests use
```
mvn -f backend/pom.xml clean compile jib:dockerBuild -Pcompose -DskipTests
```
