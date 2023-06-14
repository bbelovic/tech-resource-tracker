--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Debian 12.13-1.pgdg110+1)
-- Dumped by pg_dump version 12.13 (Debian 12.13-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tech_resource_tracker_db; Type: DATABASE; Schema: -; Owner: db_user
--

CREATE DATABASE tech_resource_tracker_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE tech_resource_tracker_db OWNER TO db_user;

\connect tech_resource_tracker_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO db_user;

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO db_user;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.tags (
    id bigint NOT NULL,
    name character varying(32) NOT NULL
);


ALTER TABLE public.tags OWNER TO db_user;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO db_user;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: technology_resources; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.technology_resources (
    id bigint NOT NULL,
    title character varying(256) NOT NULL,
    link character varying(512) DEFAULT ''::character varying NOT NULL,
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(64) DEFAULT 'NEW'::character varying NOT NULL,
    type character varying(64) DEFAULT 'ARTICLE'::character varying NOT NULL,
    username character varying(64)
);


ALTER TABLE public.technology_resources OWNER TO db_user;

--
-- Name: technology_resources_id_seq; Type: SEQUENCE; Schema: public; Owner: db_user
--

CREATE SEQUENCE public.technology_resources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.technology_resources_id_seq OWNER TO db_user;

--
-- Name: technology_resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: db_user
--

ALTER SEQUENCE public.technology_resources_id_seq OWNED BY public.technology_resources.id;


--
-- Name: technology_resources_tags; Type: TABLE; Schema: public; Owner: db_user
--

CREATE TABLE public.technology_resources_tags (
    resource_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE public.technology_resources_tags OWNER TO db_user;

--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: technology_resources id; Type: DEFAULT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.technology_resources ALTER COLUMN id SET DEFAULT nextval('public.technology_resources_id_seq'::regclass);


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
11	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2021-02-25 21:38:30.870135	11	EXECUTED	8:800234d28d259f2f9e5069b0f3519ac4	dropTable tableName=user_details		\N	3.10.3	\N	\N	4289110767
1	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2017-09-17 20:43:34.591938	1	EXECUTED	8:7435c35086ff676c763491802f739769	createTable tableName=technology_resources		\N	3.5.3	\N	\N	5681014544
2	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2017-09-17 20:43:34.649059	2	EXECUTED	8:a556ebe3d5cedb855f3141007879c78f	addColumn tableName=technology_resources		\N	3.5.3	\N	\N	5681014544
3	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-01-11 21:20:05.795009	3	EXECUTED	8:e5c1c76b765ab4c9945eecea97a1b0ed	addColumn tableName=technology_resources		\N	3.5.3	\N	\N	5705605572
4	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-01-17 21:22:59.508137	4	EXECUTED	8:127dfca5d7decaf85210041676a88ea7	addColumn tableName=technology_resources		\N	3.5.3	\N	\N	6224179435
5	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-01-31 20:51:54.115309	5	EXECUTED	8:16bf3ec732dbe5605c70c9bac7732c5c	addColumn tableName=technology_resources		\N	3.5.3	\N	\N	7431914015
6	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-02-16 20:56:27.773522	6	EXECUTED	8:4d33295c454e65ead62a2656520246a5	createTable tableName=tags		\N	3.5.3	\N	\N	8814587688
7	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-02-16 20:56:27.826249	7	EXECUTED	8:0b67f34c7d10d237e2989eb7643d95a7	createTable tableName=technology_resources_tags		\N	3.5.3	\N	\N	8814587688
8	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-02-28 20:16:01.314816	8	EXECUTED	8:3c9599dc776825f2d06b0a5c9a382085	addForeignKeyConstraint baseTableName=technology_resources_tags, constraintName=fk_technology_resources, referencedTableName=technology_resources		\N	3.5.3	\N	\N	9848961242
9	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2018-02-28 20:16:01.386017	9	EXECUTED	8:1edfca76f888096f8af7c64a53a1ff81	addForeignKeyConstraint baseTableName=technology_resources_tags, constraintName=fk_tags, referencedTableName=tags		\N	3.5.3	\N	\N	9848961242
10	bbelovic	classpath:/db/changelog/db.changelog-master.xml	2020-05-20 20:26:56.845025	10	EXECUTED	8:f5bfcf1e444b0db266007957cdd560a0	createTable tableName=user_details		\N	3.8.9	\N	\N	0006416753
12	bbelovic	db/changelog/db.changelog-master.xml	2023-02-05 19:54:01.541158	12	EXECUTED	8:1d961c79f123735e507414a6fd566541	addColumn tableName=technology_resources		\N	4.9.1	\N	\N	5626841447
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.tags (id, name) FROM stdin;
1	javascript
2	valhalla
3	java
4	spring-data
5	spring-boot
6	angular 5
7	java-10
8	java-9
9	varhandle
10	baeldung
11	hibernate
12	jep
13	jep 328
14	spring-security
15	jdk-11
16	java-11
17	spring-cloud
18	jdk
19	travis-ci
20	optional-bikeshedding
21	var keyword
22	frontend
23	spring-mvc
24	jvm
25	spring-ldap
26	react
27	linux
28	apache-beam
29	apache-kafka
30	spring-boot-2
31	spring 5
32	graalVM
33	security
34	SOLID
35	spring-state-machine
36	concurrency
37	java-12
38	websocket
39	new-http-client
40	spectre
41	switch-expression
42	jdk-12
43	kotlin
44	pattern-matching
77	sql
110	machine-learning
111	tomcat
112	jdbc
113	actuator
114	aot
115	quarkus
116	spring
117	Graal
118	future-java
119	jdk-14
120	java-14
121	http2
122	jdk-13
123	performance
124	performance-testing
125	gatling
126	JFR
131	coroutines
132	dropwizard
133	fork-join
134	dzone
135	loom
136	oom
137	brian-goetz
138	genrics
139	clean-code
140	optional
141	interview
142	advent-of-code
143	jdk-15
144	podcast
145	graalvm
146	nurkiewicz
147	mockito
148	medium
149	docker
150	algorithms
151	generics
152	maven
153	learning
154	side-projects
155	garbage-collection
156	modules
157	okta
158	testcontainers
159	string-templates
160	investice
161	czech
162	investing
163	virtual-threads
164	KeePass
165	containers
166	Oracle XE database
167	java-17
168	java-16
169	cooking
170	validation
\.


--
-- Data for Name: technology_resources; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.technology_resources (id, title, link, created_on, status, type, username) FROM stdin;
1	Everything you wanted to know about Stack Traces and Heap Dumps	https://t.co/FWJyRihlFL	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
2	9 Java Champions on Java 9: Part 2	https://t.co/z5BWHCxjEI	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
3	Using Gmail as SMTP server from Java, Spring Boot apps	https://www.javacodegeeks.com/2017/09/using-gmail-smtp-server-java-spring-boot-apps.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
4	How to become a data scientist	https://opensource.com/article/17/9/data-scientist	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
266	Advent of Code: How to Leaderboard	https://blog.vero.site/post/advent-leaderboard	2020-12-18 19:44:48	NEW	BLOG	hideo.k@seznam.cz
6	The Past, Present, and Future of the Angular CLI	https://blog.angular.io/the-past-present-and-future-of-the-angular-cli-13cf55e455f8	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
7	Small Language Changes in JDK9 	http://video.oracle.com/detail/video/5582429021001	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
8	There’s not a moment to lose!	https://mreinhold.org/blog/jigsaw-complete	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
9	Java 9 Expert Insights 	https://www.oracle.com/java/java9-screencasts.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
10	https://dzone.com/articles/event-driven-architecture-over-polling-architecture	https://dzone.com/articles/event-driven-architecture-over-polling-architecture	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
11	Code First Java 9 Module System Tutorial	https://blog.codefx.org/java/java-module-system-tutorial/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
12	Spring Framework 5.0 Released	https://www.infoq.com/news/2017/10/spring-5-released	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
13	Project Loom: Fibers and Continuations for the Java Virtual Machine	http://cr.openjdk.java.net/~rpressler/loom/Loom-Proposal.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
14	Secure Spring Boot REST API using Basic Authentication	https://www.javacodegeeks.com/2017/10/secure-spring-boot-rest-api-using-basic-authentication.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
15	Spring Boot with Java 9	https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-with-Java-9	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
16	From Zero to Open Source Hero: Contributing to Spring projects	https://speakerdeck.com/vpavic/from-zero-to-open-source-hero-contributing-to-spring-projects-2	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
17	Maven on Java 8 and 9	https://medium.com/codefx-weekly/maven-on-java-8-and-9-b47eff0645b7	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
18	Java Performance Optimization Tips: How to Avoid Common Pitfalls	https://dzone.com/articles/java-performance-optimization-tips-how-to-avoid-co	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
19	How to run integration tests at warp speed using Docker and tmpfs	https://vladmihalcea.com/2017/02/09/how-to-run-integration-tests-at-warp-speed-with-docker-and-tmpfs/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
20	Reactive Spring	https://blog.jetbrains.com/idea/2017/10/reactive-spring/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
22	Machine Learning with Java - Part 3 (k-Nearest Neighbor)	https://tech.io/playgrounds/5439/machine-learning-with-java---part-3-k-nearest-neighbor	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
23	VIM AFTER 15 YEARS	https://statico.github.io/vim3.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
24	Servlet 4.0 Features	https://readlearncode.com/servlet-4-features/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
25	How to Create an Execution Plan	https://blogs.oracle.com/sql/how-to-create-an-execution-plan	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
26	Becoming Fully Buzzword Compliant	https://www.infoq.com/presentations/advice-technology?utm_source=twitter&utm_medium=link&utm_campaign=calendar	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
27	Primer on Neural Networks	https://www.infoq.com/presentations/neural-networks-introduction?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
28	PROTECTING ROUTES USING GUARDS IN ANGULAR	https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
29	ROUTING IN ANGULAR REVISITED	https://blog.thoughtram.io/angular/2016/06/14/routing-in-angular-2-revisited.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
30	JAVA 9: JSHELL	https://mirocupak.com/java-9-jshell/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
31	Data Classes for Java	http://cr.openjdk.java.net/~briangoetz/amber/datum.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
33	First Contact With ‘var’ In Java 10	https://blog.codefx.org/java/java-10-var-type-inference/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
34	Designing polymorphic identity-free values in the JVM	http://cr.openjdk.java.net/~dlsmith/values-notes.html	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
35	Integrating Angular 2 with Spring Boot, JWT, and CORS, Part 1	http://chariotsolutions.com/blog/post/angular-2-spring-boot-jwt-cors_part1/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
36	Integrating Angular 2 with Spring Boot, JWT, and CORS, Part 2	https://chariotsolutions.com/blog/post/angular-2-spring-boot-jwt-cors_part2/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
37	 Exploring the jlink plug-in API in Java 9	http://in.relation.to/2017/12/12/exploring-jlink-plugin-api-in-java-9/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
38	Vimdiff – nástroj drsňáků	https://www.zdrojak.cz/clanky/vimdiff-nastroj-drsnaku/	2018-01-11 21:20:05.699821	NEW	ARTICLE	hideo.k@seznam.cz
39	Java 10 Checklist: Meet the Declaration That Will Change the Way You Code	https://blog.takipi.com/java-10-checklist-meet-the-declaration-that-will-change-the-way-you-code/	2018-01-11 21:36:06	NEW	ARTICLE	hideo.k@seznam.cz
40	Spring, Reactor and ElasticSearch: from callbacks to reactive streams	http://www.nurkiewicz.com/2018/01/spring-reactor-and-elasticsearch-from.html	2018-01-11 21:46:53	NEW	ARTICLE	hideo.k@seznam.cz
42	How to Persist Creation and Update Timestamps with Hibernate	https://t.co/l52LA8f4Lj	2018-01-12 10:07:13	NEW	ARTICLE	hideo.k@seznam.cz
44	I’m harvesting credit card numbers and passwords from your site. Here’s how.	https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5	2018-01-12 12:35:38	NEW	ARTICLE	hideo.k@seznam.cz
45	Most Important Penetration Testing commands Cheat Sheet for Linux Machine	https://techincidents.com/important-penetration-testing-cheat-sheet/	2018-01-15 14:10:28	NEW	ARTICLE	hideo.k@seznam.cz
41	Maven on Java 9 – Six Things You Need To Know	https://blog.codefx.org/tools/maven-on-java-9/	2018-01-12 10:05:36	PROCESSED	ARTICLE	hideo.k@seznam.cz
21	State of Gradle Java 9 Support	https://blog.gradle.org/java-9-support-update	2018-01-11 21:20:05.699	PROCESSED	ARTICLE	hideo.k@seznam.cz
43	Spring with Maven BOM	http://www.baeldung.com/spring-maven-bom	2018-01-12 10:48:46	PROCESSED	ARTICLE	hideo.k@seznam.cz
32	Performance measurement with JMH – Java Microbenchmark Harness	https://blog.codecentric.de/en/2017/10/performance-measurement-with-jmh-java-microbenchmark-harness/	2018-01-11 21:20:05.699	PROCESSED	ARTICLE	hideo.k@seznam.cz
267	Most commonly available JDKs	https://blog.frankel.ch/common-jdks/	2020-12-18 19:45:20	NEW	BLOG	hideo.k@seznam.cz
268	 Introducing Hibernate Reactive	https://in.relation.to/2020/12/03/hibernate-reactive/	2020-12-18 19:45:57	NEW	ARTICLE	hideo.k@seznam.cz
47	Bootiful Development With Spring Boot and React	https://dzone.com/articles/bootiful-development-with-spring-boot-and-react?edition=352124&utm_source=Daily%20Digest&utm_medium=email&utm_campaign=Daily%20Digest%202018-01-15	2018-01-17 14:31:58	NEW	ARTICLE	hideo.k@seznam.cz
48	Angular 2/5 - Alert (Toaster) Notifications	http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications	2018-01-21 20:56:07	NEW	ARTICLE	hideo.k@seznam.cz
49	An Overview of JavaScript Testing in 2017	https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a	2018-01-21 21:31:19	NEW	ARTICLE	hideo.k@seznam.cz
50	Unit testing node applications with TypeScript — using mocha and chai	https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2	2018-01-21 21:31:50	NEW	ARTICLE	hideo.k@seznam.cz
51	JUnit 5: New Opportunities for Testing on the JVM	https://www.youtube.com/watch?time_continue=2&v=-mIrA5cVfZ4	2018-01-23 08:02:06	NEW	ARTICLE	hideo.k@seznam.cz
52	Oracle to End Free Support for Past Java Versions Much Sooner	https://www.infoq.com/news/2018/01/JavaSupportJan18	2018-01-30 21:50:03	NEW	ARTICLE	hideo.k@seznam.cz
53	What's New in Spring Boot 2.0	https://www.infoq.com/presentations/spring-boot-2?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row3	2018-01-30 21:50:33	NEW	ARTICLE	hideo.k@seznam.cz
54	Serverless Spring	https://www.infoq.com/presentations/spring-cloud-function?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row3	2018-01-30 21:51:43	NEW	ARTICLE	hideo.k@seznam.cz
55	How to get HTTPS working on your local development environment in 5 minutes	https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec	2018-02-04 21:07:54	NEW	ARTICLE	hideo.k@seznam.cz
56	Jak na TDD v JavaScriptu	https://www.zdrojak.cz/clanky/jak-na-tdd-v-javascriptu/	2018-02-04 21:10:53	NEW	ARTICLE	hideo.k@seznam.cz
57	Code First Java 9 Tutorial	https://blog.codefx.org/java/java-9-tutorial/	2018-02-05 09:22:03	NEW	BLOG	hideo.k@seznam.cz
58	Java 9 has six weeks to live	http://blog.joda.org/2018/02/java-9-has-six-weeks-to-live.html	2018-02-05 14:51:30	NEW	BLOG	hideo.k@seznam.cz
59	Oracle Extends Free Support Lifetime of Java 8	https://www.infoq.com/news/2018/02/Java8SupportJan18	2018-02-06 10:08:08	NEW	ARTICLE	hideo.k@seznam.cz
60	Project Loom: Fibers and Continuations for the Java Virtual Machine with Ron Pressler	https://www.youtube.com/watch?time_continue=1181&v=fpyub8fbrVE	2018-02-06 10:08:24	NEW	PRESENTATION	hideo.k@seznam.cz
61	CI/CD for SpringBoot applications using Travis-CI	https://www.javacodegeeks.com/2018/01/ci-cd-springboot-applications-using-travis-ci.html	2018-02-06 10:16:00	NEW	ARTICLE	hideo.k@seznam.cz
63	Monitoring and measuring reactive application with Dropwizard Metrics	https://www.javacodegeeks.com/2018/01/monitoring-measuring-reactive-application-dropwizard-metrics.html	2018-02-06 10:17:57	NEW	ARTICLE	hideo.k@seznam.cz
64	JDK http client - examples and recipes	http://openjdk.java.net/groups/net/httpclient/recipes.html	2018-02-07 07:45:59	NEW	ARTICLE	hideo.k@seznam.cz
65	Modern CSS Explained For Dinosaurs	https://medium.com/actualize-network/modern-css-explained-for-dinosaurs-5226febe3525	2018-02-07 09:08:46	NEW	ARTICLE	hideo.k@seznam.cz
66	20 Examples of Using Java’s CompletableFuture	https://mahmoudanouti.wordpress.com/2018/01/26/20-examples-of-using-javas-completablefuture/	2018-02-07 09:52:26	NEW	BLOG	hideo.k@seznam.cz
67	CSS selectors	https://www.youtube.com/watch?time_continue=1040&v=AjqFMjdtwwQ	2018-02-08 09:39:26	NEW	PRESENTATION	hideo.k@seznam.cz
68	Writing a video player with Java Swing	http://blog.disy.net/swing-player/?utm_content=buffer21d6e&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer	2018-02-12 07:09:29	NEW	BLOG	hideo.k@seznam.cz
69	Reactive Streams in Java 9	https://dzone.com/articles/reactive-streams-in-java-9	2018-02-12 07:20:36	NEW	ARTICLE	hideo.k@seznam.cz
71	Spring Boot 2 Applications and OAuth 2 – Setting up an Authorization Server	https://www.javacodegeeks.com/2018/02/spring-boot-2-applications-oauth-2-setting-authorization-server.html	2018-02-12 11:19:42	NEW	ARTICLE	hideo.k@seznam.cz
72	Integration With Zapier	https://www.javacodegeeks.com/2018/02/integration-with-zapier.html	2018-02-13 07:35:28	NEW	ARTICLE	hideo.k@seznam.cz
73	Docker for Java Developers: Deploy on Docker	https://www.javacodegeeks.com/2018/02/docker-java-developers-deploy-docker.html	2018-02-13 10:10:19	NEW	ARTICLE	hideo.k@seznam.cz
74	Front End Interview Handbook	https://github.com/yangshun/front-end-interview-handbook?utm_content=buffercf3eb&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer	2018-02-13 10:12:06	NEW	ARTICLE	hideo.k@seznam.cz
75	Moving Java Forward Faster	https://t.co/JLBnTTNZXB	2018-02-13 14:18:41	NEW	PRESENTATION	hideo.k@seznam.cz
76	Testovací trio Mocha, Chai a Sinon	https://www.zdrojak.cz/clanky/testovaci-trio-mocha-chai-sinon/	2018-02-15 07:57:43	NEW	ARTICLE	hideo.k@seznam.cz
77	Designing, Implementing and Using Reactive APIs	https://www.infoq.com/presentations/cloud-foundry-reactive-api?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2018-02-15 09:23:11	NEW	PRESENTATION	hideo.k@seznam.cz
78	Service Testing with Docker Containers	https://www.javacodegeeks.com/2018/02/service-testing-docker-containers.html	2018-02-15 15:10:59	NEW	ARTICLE	hideo.k@seznam.cz
79	Build a JavaScript Dev Environment in 1 hour	https://www.infoq.com/presentations/javascript-dev-environment?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2018-02-19 07:10:06	NEW	ARTICLE	hideo.k@seznam.cz
80	Brian Goetz Speaks to InfoQ on Data Classes for Java	https://www.infoq.com/news/2018/02/data-classes-for-java	2018-02-22 07:50:28	NEW	ARTICLE	hideo.k@seznam.cz
269	From Reactor to Coroutines	https://blog.frankel.ch/reactor-to-coroutines/	2020-12-18 19:46:39	NEW	ARTICLE	hideo.k@seznam.cz
82	Spring Boot & Angular 5 & Spring Data & Rest Example (CRUD)	https://www.javacodegeeks.com/2018/03/spring-boot-angular-5-spring-data-rest-example-crud.html	2018-03-13 08:24:28	NEW	ARTICLE	hideo.k@seznam.cz
83	4 Ways to Deploy Spring Boot Angular App (Maven & Tomcat)	https://www.javacodegeeks.com/2018/03/4-ways-to-deploy-spring-boot-angular-app-maven-tomcat.html	2018-03-13 11:13:44	NEW	ARTICLE	hideo.k@seznam.cz
70	An Early Look at Features Targeted for Java 11	http://marxsoftware.blogspot.cz/2018/02/early-jeps-java-11.html?utm_content=bufferef3f0&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer	2018-02-12 07:21:19	PROCESSED	BLOG	hideo.k@seznam.cz
84	Improve Launch Times On Java 10 With Application Class-Data Sharing	https://blog.codefx.org/java/application-class-data-sharing/	2018-03-13 11:14:25	PROCESSED	BLOG	hideo.k@seznam.cz
62	How Http Basic Authentication works in Spring Security?	https://www.javacodegeeks.com/2018/01/http-basic-authentication-works-spring-security.html	2018-02-06 10:17:10	PROCESSED	ARTICLE	hideo.k@seznam.cz
85	Java 9 Variable Handles Demystified	http://www.baeldung.com/java-variable-handles	2018-03-13 13:09:46	PROCESSED	ARTICLE	hideo.k@seznam.cz
283	20+ Algorithms Coding Problems to Crack You Next Technical Interviews	https://medium.com/javarevisited/20-algorithms-coding-problems-to-crack-you-next-technical-interviews-23191f229788	2020-12-20 20:50:55	NEW	ARTICLE	hideo.k@seznam.cz
81	Asynchronní JavaScript pod pokličkou aneb Eventloop v praxi	https://www.zdrojak.cz/clanky/asynchronni-javascript-poklickou-aneb-eventloop-praxi/	2018-03-12 09:19:04	PROCESSED	ARTICLE	hideo.k@seznam.cz
87	JEP 328: Flight Recorder	http://openjdk.java.net/jeps/328	2018-03-15 08:44:39	NEW	ARTICLE	hideo.k@seznam.cz
88	Angular5 JWT Authentication (Spring Boot Security)	https://www.javacodegeeks.com/2018/03/angular5-jwt-authentication-spring-boot-security.html	2018-03-15 11:24:46	NEW	ARTICLE	hideo.k@seznam.cz
92	Spring Cloud Configuration – Externalize Application Configuration	https://www.javacodegeeks.com/2018/03/spring-cloud-configuration-externalize-application-configuration.html	2018-03-16 08:36:41	NEW	ARTICLE	hideo.k@seznam.cz
93	MicroServices – Part 5 : Spring Cloud Zuul Proxy as API Gateway	https://www.javacodegeeks.com/2018/03/microservices-part-5-spring-cloud-zuul-proxy-as-api-gateway.html	2018-03-16 08:37:17	NEW	ARTICLE	hideo.k@seznam.cz
94	JDK Matrix on Travis CI	https://sormuras.github.io/blog/2018-01-28-jdk-matrix.html	2018-03-16 08:38:10	NEW	ARTICLE	hideo.k@seznam.cz
91	Java Nestmates Makes Progress	https://www.infoq.com/news/2018/03/Nestmates	2018-03-16 08:36:03	PROCESSED	ARTICLE	hideo.k@seznam.cz
86	How to enable Hibernate logging	https://medium.com/@scadge/how-to-enable-hibernate-logging-dc11545efd3d	2018-03-15 08:43:23	PROCESSED	BLOG	hideo.k@seznam.cz
5	JPA 2.2’s new getResultStream() method and how you should NOT use it	https://www.thoughts-on-java.org/jpa-2-2s-new-stream-method-and-how-you-should-not-use-it/	2018-01-11 21:20:05.699	PROCESSED	ARTICLE	hideo.k@seznam.cz
96	Migrating a Spring Boot application to Java 9 - Modules	https://blog.frankel.ch/migrating-to-java-9/2/	2018-03-21 10:12:20	NEW	BLOG	hideo.k@seznam.cz
97	Optional - The Mother of All Bikesheds by Stuart Marks	https://www.youtube.com/watch?time_continue=19&v=Ej0sss6cq14	2018-03-21 21:12:41	NEW	PRESENTATION	hideo.k@seznam.cz
98	Style Guidelines for Local Variable Type Inference in Java	http://openjdk.java.net/projects/amber/LVTIstyle.html	2018-03-23 10:49:01	NEW	ARTICLE	hideo.k@seznam.cz
95	Migrating a Spring Boot application to Java 9 - Compatibility	https://blog.frankel.ch/migrating-to-java-9/1/	2018-03-21 10:05:46	PROCESSED	BLOG	hideo.k@seznam.cz
99	Modern Frontend Developer in 2018	https://medium.com/tech-tajawal/modern-frontend-developer-in-2018-4c2072fa2b9c?mkt_tok=eyJpIjoiWlRrNE16azJZVEZqTURNMyIsInQiOiJ3YzlERlZ3NUJoakRuSTNKNmprVVNtMEdtVUZlUFwvWkpEbTFjd2FZMlwvSGN6RHk3Z2JzNXVWaWJUUktKeXc5RUVCOHZEV1JvRVEyVFA4MUdSVHdBZGk3ZXduaEh2eHEzeFwvVElIS1ZSbVFta0syd1lFRXpxVmVjQTZucEo5ZVIrYyJ9	2018-03-31 18:40:45	PROCESSED	BLOG	hideo.k@seznam.cz
90	Java 11 Will Include More Than Just Features	https://blog.takipi.com/java-11-will-include-more-than-just-features/	2018-03-15 21:49:05	PROCESSED	BLOG	hideo.k@seznam.cz
89	Duke Takes His Last Tumble	https://www.azul.com/duke-takes-his-last-tumble/	2018-03-15 15:22:42	PROCESSED	ARTICLE	hideo.k@seznam.cz
100	Spring MVC Tutorial	https://www.javacodegeeks.com/2018/04/spring-mvc-tutorial-2.html	2018-04-17 06:22:29	NEW	ARTICLE	hideo.k@seznam.cz
101	JVM Architecture 101: Get to Know Your Virtual Machine	https://blog.takipi.com/jvm-architecture-101-get-to-know-your-virtual-machine/?utm_source=social&utm_medium=maintweet&utm_content=jvmarchitecture101	2018-04-18 10:16:50	NEW	BLOG	hideo.k@seznam.cz
103	Bootiful Development with Spring Boot and React	https://www.infoq.com/presentations/java8-boot-react-web-dev?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row2	2018-04-24 07:06:13	NEW	PRESENTATION	hideo.k@seznam.cz
104	New zine: Profiling & tracing with perf!!	https://jvns.ca/blog/2018/04/16/new-perf-zine/	2018-04-24 07:58:23	NEW	ARTICLE	hideo.k@seznam.cz
105	Streaming SQL Foundations: Why I ❤ Streams+Tables	https://www.infoq.com/presentations/sql-streaming?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row3	2018-05-09 08:39:46	NEW	PRESENTATION	hideo.k@seznam.cz
106	Spring Security with Spring Boot 2.0: Simple authentication using the Servlet Stack	https://www.javacodegeeks.com/2018/05/spring-security-with-spring-boot-2-0-simple-authentication-using-the-servlet-stack.html	2018-05-09 10:11:09	NEW	ARTICLE	hideo.k@seznam.cz
107	Spring Framework 5: Hidden Gems	https://www.infoq.com/presentations/new-spring-framework-5?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2018-05-21 14:20:39	NEW	PRESENTATION	hideo.k@seznam.cz
108	Instant Netty Startup using GraalVM Native Image Generation	https://medium.com/graalvm/instant-netty-startup-using-graalvm-native-image-generation-ed6f14ff7692	2018-05-22 12:04:34	PROCESSED	BLOG	hideo.k@seznam.cz
109	The Benefits of Side Projects	https://www.javacodegeeks.com/2018/05/the-benefits-of-side-projects.html	2018-05-23 11:27:45	PROCESSED	ARTICLE	hideo.k@seznam.cz
46	IntelliJ IDEA Tips & Tricks: Testing RESTful web services with integrated HTTP Client	http://vojtechruzicka.com/intellij-idea-tips-tricks-testing-restful-web-services/?utm_content=buffer69666&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer	2018-01-17 11:40:16	PROCESSED	ARTICLE	hideo.k@seznam.cz
111	Why Use char[] Array Over a String for Storing Passwords in Java?	http://www.baeldung.com/java-storing-passwords	2018-06-04 20:24:56	PROCESSED	ARTICLE	hideo.k@seznam.cz
112	Structuring and Testing Modules and Layers with Spring Boot	https://reflectoring.io/testing-verticals-and-layers-spring-boot/	2018-06-06 06:38:56	PROCESSED	BLOG	hideo.k@seznam.cz
115	Proč Dagi není programátor	https://calavera.info/v3/blog/2018/03/06/proc-dagi-neni-programator.html	2018-07-04 21:07:23	PROCESSED	BLOG	hideo.k@seznam.cz
116	Is Boilerplate Code Really so Bad?	https://www.infoq.com/presentations/java-kotlin-boilerplate?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row3	2018-07-09 11:10:53	NEW	PRESENTATION	hideo.k@seznam.cz
114	SOLID Principles Around You	https://medium.com/@trekhleb/solid-principles-around-you-6db2f0e12139	2018-06-23 21:54:15	PROCESSED	BLOG	hideo.k@seznam.cz
117	Spring State Machine: what is it and do you need it?	https://www.javacodegeeks.com/2018/07/spring-state-machine.html	2018-07-10 06:59:21	PROCESSED	ARTICLE	hideo.k@seznam.cz
270	Immutable Collections in Java using Sealed Types	https://medium.com/javarevisited/immutable-collections-in-java-using-sealed-types-ae8eb580fc1e	2020-12-20 20:23:29	NEW	ARTICLE	hideo.k@seznam.cz
119	Project Loom with Ron Pressler and Alan Bateman	https://www.youtube.com/watch?time_continue=1&v=J31o0ZMQEnI	2018-07-31 07:44:18	NEW	PRESENTATION	hideo.k@seznam.cz
120	Dynamic compilation and performance measurement	https://www.ibm.com/developerworks/java/library/j-jtp12214/	2018-08-07 12:32:41	NEW	ARTICLE	hideo.k@seznam.cz
121	JVM Language Summit 2018	https://www.youtube.com/playlist?list=PLX8CzqL3ArzVnxC6PYxMlngEMv3W1pIkn&app=desktop	2018-08-08 07:04:02	NEW	PRESENTATION	hideo.k@seznam.cz
284	Lambdas and Clean Code	https://blog.frankel.ch/lambdas-clean-code/	2020-12-20 20:51:24	NEW	BLOG	hideo.k@seznam.cz
113	Retryable operations	https://www.javacodegeeks.com/2015/10/retryable-operations.html	2018-06-07 13:48:49	PROCESSED	ARTICLE	hideo.k@seznam.cz
110	Using the Spring RestTemplate Interceptor	http://www.baeldung.com/spring-rest-template-interceptor	2018-05-30 12:12:27	PROCESSED	ARTICLE	hideo.k@seznam.cz
102	2 Ways to Setup LDAP Active Directory Authentication in Java Spring Security Example Tutorial	https://www.javacodegeeks.com/2018/04/2-ways-to-setup-ldap-active-directory-authentication-in-java-spring-security-example-tutorial.html	2018-04-24 06:09:00	PROCESSED	ARTICLE	hideo.k@seznam.cz
118	CountDownLatch vs Phaser	https://www.javaspecialists.eu/archive/Issue257.html	2018-07-31 07:43:14	PROCESSED	BLOG	hideo.k@seznam.cz
123	A Look at Server-Sent Events	https://medium.com/conectric-networks/a-look-at-server-sent-events-54a77f8d6ff7	2018-08-20 07:50:44	PROCESSED	ARTICLE	hideo.k@seznam.cz
122	JDK 12, Merging Collectors, and the Challenge of Naming	https://www.javacodegeeks.com/2018/08/jdk-12-merging-collectors.html	2018-08-08 13:32:33	PROCESSED	ARTICLE	hideo.k@seznam.cz
124	Java 11: Standardized HTTP Client API	https://dzone.com/articles/java-11-standardized-http-client-api	2018-08-26 20:50:21	NEW	ARTICLE	hideo.k@seznam.cz
125	JEP 342: The JVM and Spectre	https://www.javacodegeeks.com/2018/09/jep-342-the-jvm-and-spectre.html	2018-09-13 07:54:17	NEW	ARTICLE	hideo.k@seznam.cz
126	JDK 12 Switch Expression Encountering Unanticipated Enum Value	https://www.javacodegeeks.com/2018/09/jdk-12-switch-expression-encountering-unanticipated-enum-value.html	2018-09-13 07:55:08	NEW	ARTICLE	hideo.k@seznam.cz
127	JDK 12: Switch Statements/Expressions in Action	https://www.javacodegeeks.com/2018/09/jdk-12-switch-statements-expressions.html	2018-09-13 07:55:36	NEW	ARTICLE	hideo.k@seznam.cz
128	Ajax File Upload with Servlet and Bootstrap	https://www.javacodegeeks.com/2018/09/ajax-file-upload-servlet-bootstrap.html	2018-09-13 07:56:11	NEW	ARTICLE	hideo.k@seznam.cz
129	Implementing White-Labelling	https://www.javacodegeeks.com/2018/07/implementing-white-labelling.html	2018-09-13 07:56:39	NEW	ARTICLE	hideo.k@seznam.cz
130	Use Kotlin to Build a Basic Android CRUD App	https://www.javacodegeeks.com/2018/09/kotlin-build-basic-android-crud-app.html	2018-09-24 08:50:18	NEW	ARTICLE	hideo.k@seznam.cz
131	Pattern Matching for Java	http://cr.openjdk.java.net/~briangoetz/amber/pattern-match.html	2018-10-10 07:04:31	NEW	ARTICLE	hideo.k@seznam.cz
132	Pattern Matching for Java -- Semantics	http://cr.openjdk.java.net/~briangoetz/amber/pattern-semantics.html	2018-10-10 07:04:53	NEW	ARTICLE	hideo.k@seznam.cz
164	Java 11 HTTP/2 API Tutorial	https://blog.codefx.org/java/http-2-api-tutorial/	2018-10-15 07:04:28	NEW	BLOG	hideo.k@seznam.cz
165	Futures, cancellation and coroutines	https://medium.com/@elizarov/futures-cancellation-and-coroutines-b5ce9c3ede3a	2018-10-22 08:56:16	NEW	BLOG	hideo.k@seznam.cz
166	Invest in Your Java Katalogue	https://www.infoq.com/presentations/java-katas?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2018-10-22 08:56:44	NEW	PRESENTATION	hideo.k@seznam.cz
167	Spring, Kotlin and the Functional Way	https://www.infoq.com/presentations/spring-kotlin-functional?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row2	2018-11-30 07:41:09	NEW	PRESENTATION	hideo.k@seznam.cz
168	FP vs OOP: Choose Two by Brian Goetz	https://www.youtube.com/watch?v=HSk5fdKbd3o	2018-12-04 20:30:35	NEW	PRESENTATION	hideo.k@seznam.cz
169	How Modern SQL Databases Come up with Algorithms that You Would Have Never Dreamed Of by Lukas Eder	https://www.youtube.com/watch?v=wTPGW1PNy_Y&feature=youtu.be	2018-12-19 11:11:04	NEW	PRESENTATION	hideo.k@seznam.cz
202	Implementing an Artificial Neural Network in Pure Java (No external dependencies)	https://medium.com/coinmonks/implementing-an-artificial-neural-network-in-pure-java-no-external-dependencies-975749a38114	2019-01-15 20:31:21	NEW	ARTICLE	hideo.k@seznam.cz
203	TomcatJdbcConnectionTest	https://github.com/gnosly/TomcatJdbcConnectionTest	2019-01-18 13:37:15	NEW	BLOG	hideo.k@seznam.cz
204	Mastering Spring Boot's Actuator	https://www.infoq.com/presentations/spring-boot-actuator?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1	2019-02-05 11:51:56	NEW	PRESENTATION	hideo.k@seznam.cz
207	Java Valhalla Project	https://www.baeldung.com/java-valhalla-project	2019-02-26 07:42:18	NEW	ARTICLE	hideo.k@seznam.cz
211	Memory footprint of the JVM	https://spring.io/blog/2019/03/11/memory-footprint-of-the-jvm	2019-03-12 08:49:23	NEW	BLOG	hideo.k@seznam.cz
212	Hacking Spring Boot Applications Using Visual Studio Code	https://www.infoq.com/presentations/spring-boot-studio-visual-code?itm_source=infoq&itm_medium=videos_homepage&itm_campaign=videos_row2	2019-03-12 08:52:04	NEW	PRESENTATION	hideo.k@seznam.cz
213	Teeing Collector in Java 12	https://blog.codefx.org/java/teeing-collector/	2019-03-12 08:55:41	PROCESSED	BLOG	hideo.k@seznam.cz
206	Ahead of Time Compilation (AoT)	https://www.baeldung.com/ahead-of-time-compilation	2019-02-22 14:34:24	PROCESSED	ARTICLE	hideo.k@seznam.cz
214	Java 10 Performance Improvements	https://www.baeldung.com/java-10-performance-improvements	2019-03-12 10:00:53	NEW	ARTICLE	hideo.k@seznam.cz
215	Deep Dive Into the New Java JIT Compiler – Graal	https://www.baeldung.com/graal-java-jit-compiler	2019-03-12 10:01:25	NEW	ARTICLE	hideo.k@seznam.cz
216	A Java Web Application Without a web.xml	https://www.baeldung.com/java-web-app-without-web-xml	2019-03-19 08:41:10	NEW	ARTICLE	hideo.k@seznam.cz
217	Enhanced-For Statement Should Allow Streams	http://cr.openjdk.java.net/~smarks/reviews/8148917/IterableOnce0.html	2019-03-19 08:43:23	NEW	ARTICLE	hideo.k@seznam.cz
218	Data Classes and Sealed Types for Java	http://cr.openjdk.java.net/~briangoetz/amber/datum.html	2019-03-19 08:43:53	NEW	ARTICLE	hideo.k@seznam.cz
210	Why Quarkus	http://in.relation.to/2019/03/08/why-quarkus/	2019-03-12 08:48:28	PROCESSED	BLOG	hideo.k@seznam.cz
205	Java Valhalla Project	https://www.baeldung.com/java-valhalla-project	2019-02-22 14:33:58	PROCESSED	ARTICLE	hideo.k@seznam.cz
208	Kotlin pearls: Lambdas with a Context	https://proandroiddev.com/kotlin-pearls-lambdas-with-a-context-58f26ab2eb1d	2019-02-26 07:42:55	PROCESSED	BLOG	hideo.k@seznam.cz
209	Kotlin pearls: Sealed Class Override	https://proandroiddev.com/kotlin-pearls-sealed-class-override-b951dcd752c6	2019-02-26 07:43:25	PROCESSED	BLOG	hideo.k@seznam.cz
219	Kotlin DSL design with VillageDSL	https://zsmb.co/kotlin-dsl-design-with-village-dsl/	2020-01-06 14:22:06	NEW	BLOG	hideo.k@seznam.cz
220	JEP 305: Pattern Matching for instanceof (Preview)	https://openjdk.java.net/jeps/305	2020-01-06 14:25:54	NEW	ARTICLE	hideo.k@seznam.cz
221	Java Annotated Monthly – January 2020	https://blog.jetbrains.com/idea/2020/01/java-annotated-monthly-january-2020/	2020-01-06 14:26:24	NEW	BLOG	hideo.k@seznam.cz
222	FROM JAVA BUILDERS TO KOTLIN DSLS	https://kotlinexpertise.com/java-builders-kotlin-dsls/	2020-01-06 14:27:24	NEW	ARTICLE	hideo.k@seznam.cz
223	JEP 359: Records (Preview)	https://openjdk.java.net/jeps/359	2020-01-06 14:28:16	NEW	ARTICLE	hideo.k@seznam.cz
224	JEP 361: Switch Expressions (Standard)	https://openjdk.java.net/jeps/361	2020-01-06 14:28:51	NEW	ARTICLE	hideo.k@seznam.cz
225	JEP 368: Text Blocks (Second Preview)	https://openjdk.java.net/jeps/368	2020-01-06 14:29:11	NEW	ARTICLE	hideo.k@seznam.cz
226	Java records by nipafx	https://www.twitch.tv/videos/529899179	2020-01-06 14:33:03	NEW	PRESENTATION	hideo.k@seznam.cz
271	Write-Ahead Log	https://martinfowler.com/articles/patterns-of-distributed-systems/wal.html	2020-12-20 20:24:41	NEW	BLOG	hideo.k@seznam.cz
228	A Bottom-Up View of Kotlin Coroutines	https://www.infoq.com/articles/kotlin-coroutines-bottom-up/	2020-01-13 13:19:43	NEW	ARTICLE	hideo.k@seznam.cz
229	Performance testing HTTP/1.1 vs HTTP/2 vs HTTP/2 + Server Push for REST APIs	https://evertpot.com/h2-parallelism/	2020-01-14 09:30:12	NEW	ARTICLE	hideo.k@seznam.cz
230	Project Valhalla: Fast and Furious Java	https://medium.com/javarevisited/project-valhalla-fast-and-furious-java-ce2e46b4ee59	2020-01-14 11:40:39	NEW	BLOG	hideo.k@seznam.cz
231	Making Kotlin Ready for Data Science	https://blog.jetbrains.com/kotlin/2019/12/making-kotlin-ready-for-data-science/	2020-01-14 20:43:14	NEW	BLOG	hideo.k@seznam.cz
232	Java Application Remote Debugging	https://www.baeldung.com/java-application-remote-debugging	2020-01-14 20:45:22	NEW	ARTICLE	hideo.k@seznam.cz
234	Performance Testing Spring Boot with Gatling	https://www.opsian.com/blog/performance-test-spring-boot-gatling/	2020-01-15 07:57:10	NEW	BLOG	hideo.k@seznam.cz
227	Manage multiple Java SDKs with SDKMAN! with ease	https://blog.codeleak.pl/2020/01/manage-multiple-java-sdks-with-sdkman.html	2020-01-10 11:21:03	PROCESSED	BLOG	hideo.k@seznam.cz
233	Using Java 13 Text Blocks (Only) for Your Tests	https://www.morling.dev/blog/using-java-13-text-blocks-for-tests/	2020-01-15 07:56:06	PROCESSED	BLOG	hideo.k@seznam.cz
235	Kotlin coroutines in depth 	https://www.raywenderlich.com/5443783-kotlin-coroutines-in-depth	2020-01-29 16:39:01	NEW	PRESENTATION	hideo.k@seznam.cz
236	Monitoring REST APIs with Custom JDK Flight Recorder Events	https://www.morling.dev/blog/rest-api-monitoring-with-custom-jdk-flight-recorder-events/	2020-01-29 16:40:32	NEW	BLOG	hideo.k@seznam.cz
241	Designing a Reactive System	https://www.infoq.com/presentations/present-future-reactive-systems/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=Java	2020-01-31 17:34:05	NEW	PRESENTATION	hideo.k@seznam.cz
242	Inline Functions	https://www.atomiccommits.io/inline-functions/	2020-02-02 20:55:02	NEW	ARTICLE	hideo.k@seznam.cz
243	Coroutines and Java Synchronization Don't Mix	https://blog.danlew.net/2020/01/28/coroutines-and-java-synchronization-dont-mix/	2020-02-02 20:55:34	NEW	ARTICLE	hideo.k@seznam.cz
244	RxJava to Coroutines: end-to-end feature migration	https://medium.com/transferwise-engineering/rxjava-to-coroutines-tw-96506fba5fb2	2020-02-03 13:29:19	NEW	BLOG	hideo.k@seznam.cz
245	Coroutines explained	https://www.youtube.com/watch?v=dWBsdh0BndM	2020-02-03 20:47:00	NEW	PRESENTATION	hideo.k@seznam.cz
246	Introduction to Dropwizard	https://www.baeldung.com/java-dropwizard	2020-02-09 09:35:29	NEW	ARTICLE	hideo.k@seznam.cz
247	Guide to Work Stealing in Java	https://www.baeldung.com/java-work-stealing	2020-02-09 09:36:16	NEW	ARTICLE	hideo.k@seznam.cz
248	Does Java Need Inline Types? What Project Valhalla Can Bring to Java	https://www.infoq.com/presentations/java-valhalla-inline-types/?utm_source=twitter&utm_medium=link&utm_campaign=qcon	2020-02-13 19:42:28	NEW	PRESENTATION	hideo.k@seznam.cz
249	Quarkus – A New Age of Modern Java Frameworks is Here	https://4comprehension.com/quarkus-a-new-age-of-modern-java-frameworks-is-here/	2020-03-11 21:25:03	NEW	ARTICLE	hideo.k@seznam.cz
250	How a URL Shortening Application Works	https://dzone.com/articles/how-a-url-shortening-application-works?edition=575294&utm_source=Daily%20Digest&utm_medium=email&utm_campaign=Daily%20Digest%202020-02-23	2020-03-11 21:25:46	NEW	ARTICLE	hideo.k@seznam.cz
251	Pros and Cons for Using GraalVM Native-Images	https://dzone.com/articles/profiling-native-images-in-java?edition=583296&utm_source=Daily%20Digest&utm_medium=email&utm_campaign=Daily%20Digest%202020-03-07	2020-03-11 21:26:29	NEW	ARTICLE	hideo.k@seznam.cz
252	Getting Started with Quarkus	https://www.infoq.com/articles/getting-started-with-quarkus/	2020-04-09 10:06:41	NEW	ARTICLE	hideo.k@seznam.cz
253	Create a CRUD App With React, Kotlin, and Spring Boot	https://dzone.com/articles/create-a-crud-app-with-react-kotlin-and-spring-boot?edition=592342&utm_source=Daily%20Digest&utm_medium=email&utm_campaign=Daily%20Digest%202020-04-27	2020-04-28 20:41:38	NEW	ARTICLE	hideo.k@seznam.cz
254	Managing Transactions with Spring and Spring Data JPA	https://thoughts-on-java.org/transactions-spring-data-jpa/	2020-04-28 20:42:22	NEW	BLOG	hideo.k@seznam.cz
255	Project Loom: virtual threads in Java	https://medium.com/@alexey.soshin/project-loom-virtual-threads-in-java-371dccc88b0f	2020-05-19 08:33:16	NEW	BLOG	hideo.k@seznam.cz
256	State of Loom	http://cr.openjdk.java.net/~rpressler/loom/loom/sol1_part1.html	2020-05-19 08:33:44	NEW	ARTICLE	hideo.k@seznam.cz
257	State of Loom: Part 2	http://cr.openjdk.java.net/~rpressler/loom/loom/sol1_part2.html	2020-05-19 08:34:03	NEW	ARTICLE	hideo.k@seznam.cz
258	Native Memory — The Silent JVM Killer	https://medium.com/swlh/native-memory-the-silent-jvm-killer-595913cba8e7	2020-05-22 07:47:04	NEW	ARTICLE	hideo.k@seznam.cz
259	Background: how we got the generics we have	http://cr.openjdk.java.net/~briangoetz/valhalla/erasure.html	2020-06-30 19:29:02	NEW	ARTICLE	hideo.k@seznam.cz
260	It's probably time to stop recommending Clean Code	https://qntm.org/clean	2020-06-30 19:29:45	NEW	BLOG	hideo.k@seznam.cz
261	12 recipes for using the Optional class as it’s meant to be used	https://blogs.oracle.com/javamagazine/12-recipes-for-using-the-optional-class-as-its-meant-to-be-used	2020-06-30 19:32:54	NEW	ARTICLE	hideo.k@seznam.cz
262	Java vs. Kotlin — Part 1: Performance	https://medium.com/rsq-technologies/comparative-evaluation-of-selected-constructs-in-java-and-kotlin-part-1-dynamic-metrics-2592820ce80	2020-06-30 19:34:42	NEW	ARTICLE	hideo.k@seznam.cz
263	Linux Job Control: &, disown, and	https://www.baeldung.com/linux/job-control-disown-nohup	2020-06-30 19:35:20	NEW	ARTICLE	hideo.k@seznam.cz
264	20+ Algorithms Coding Problems to Crack You Next Technical Interviews	https://medium.com/javarevisited/20-algorithms-coding-problems-to-crack-you-next-technical-interviews-23191f229788	2020-06-30 19:36:08	NEW	ARTICLE	hideo.k@seznam.cz
265	HOW TO WRITE A (TOY) JVM	https://zserge.com/posts/jvm/	2020-06-30 19:36:34	NEW	ARTICLE	hideo.k@seznam.cz
272	How Figma’s multiplayer technology works	https://www.figma.com/blog/how-figmas-multiplayer-technology-works/	2020-12-20 20:26:02	NEW	BLOG	hideo.k@seznam.cz
273	Multiple modules in Spring Boot apps	https://blog.frankel.ch/multiple-modules-spring-boot-apps/	2020-12-20 20:26:43	NEW	BLOG	hideo.k@seznam.cz
274	#19: GraalVM	https://256.nurkiewicz.com/19	2020-12-20 20:28:53	NEW	BLOG	hideo.k@seznam.cz
275	Using Mockito in Kotlin projects	https://kotlintesting.com/using-mockito-in-kotlin-projects/	2020-12-20 20:29:44	NEW	ARTICLE	hideo.k@seznam.cz
276	Refactoring Java, Part 1: Driving agile development with test-driven development	https://blogs.oracle.com/javamagazine/refactoring-java-part-1-driving-agile-development-with-test-driven-development?source=:em:nw:mt:::RC_WWMK200429P00043:NSL400097336&elq_mid=175678&sh=162609181316181313222609291604350235&cmid=WWMK200429P00043C0010	2020-12-20 20:30:17	NEW	BLOG	hideo.k@seznam.cz
277	Why we chose Java for our High-Frequency Trading application	https://medium.com/@jadsarmo/why-we-chose-java-for-our-high-frequency-trading-application-600f7c04da94	2020-12-20 20:30:48	NEW	ARTICLE	hideo.k@seznam.cz
278	Processing Files With Java 8 Streams	https://reflectoring.io/processing-files-using-java-8-streams/	2020-12-20 20:32:12	NEW	ARTICLE	hideo.k@seznam.cz
279	Creating Optimized Docker Images for a Spring Boot Application	https://reflectoring.io/spring-boot-docker/	2020-12-20 20:39:13	NEW	ARTICLE	hideo.k@seznam.cz
280	A Dockerfile for Maven-based Github projects	https://blog.frankel.ch/dockerfile-maven-based-github-projects/	2020-12-20 20:40:00	NEW	BLOG	hideo.k@seznam.cz
281	What is JVM Bytecode?	https://foojay.io/today/what-is-jvm-bytecode/	2020-12-20 20:42:19	NEW	ARTICLE	hideo.k@seznam.cz
282	Creating Efficient Docker Images with Spring Boot 2.3	https://spring.io/blog/2020/08/14/creating-efficient-docker-images-with-spring-boot-2-3	2020-12-20 20:44:35	NEW	BLOG	hideo.k@seznam.cz
285	Java vs. Kotlin — Part 1: Performance	https://medium.com/rsq-technologies/comparative-evaluation-of-selected-constructs-in-java-and-kotlin-part-1-dynamic-metrics-2592820ce80	2020-12-20 20:52:02	NEW	ARTICLE	hideo.k@seznam.cz
286	12 recipes for using the Optional class as it’s meant to be used	https://blogs.oracle.com/javamagazine/12-recipes-for-using-the-optional-class-as-its-meant-to-be-used	2020-12-20 20:52:45	NEW	BLOG	hideo.k@seznam.cz
287	Kotlin weekly 204	https://mailchi.mp/kotlinweekly/kotlin-weekly-204	2020-12-20 20:53:15	NEW	ARTICLE	hideo.k@seznam.cz
288	Generics in Kotlin	https://magdamiu.com/2020/06/21/generics-in-kotlin/	2020-12-20 20:54:01	NEW	BLOG	hideo.k@seznam.cz
289	UNDERSTANDING APACHE MAVEN – PART 6 – POM REFERENCE	https://cguntur.me/2020/06/20/understanding-apache-maven-part-6/	2020-12-20 20:54:47	NEW	BLOG	hideo.k@seznam.cz
290	Working with Kotlin Coroutines	https://medium.com/swlh/working-with-kotlin-coroutines-507433ddd9e3	2020-12-20 20:55:59	NEW	ARTICLE	hideo.k@seznam.cz
291	Building a self-updating profile README for GitHub	https://simonwillison.net/2020/Jul/10/self-updating-profile-readme/	2020-12-20 20:56:27	NEW	BLOG	hideo.k@seznam.cz
292	Project Loom: Getting started	https://wiki.openjdk.java.net/display/loom/Getting+started	2020-12-20 20:57:03	NEW	ARTICLE	hideo.k@seznam.cz
293	The Feynman Technique: The Best Way to Learn Anything	https://fs.blog/2012/04/feynman-technique/	2020-12-20 20:58:19	NEW	BLOG	hideo.k@seznam.cz
296	OpenJDK Migrates to GitHub	https://www.infoq.com/news/2020/07/openjdk-github-migration/	2020-12-20 21:00:02	NEW	ARTICLE	hideo.k@seznam.cz
297	JVM 101: Garbage Collection and Heap (Part 2)	https://medium.com/javarevisited/jvm-101-garbage-collection-and-heap-part-2-dc36b710638d	2020-12-20 21:00:56	NEW	ARTICLE	hideo.k@seznam.cz
298	Build a Spring Boot Application Using Java Modules	https://developer.okta.com/blog/2020/07/27/spring-boot-using-java-modules	2020-12-20 21:01:44	PROCESSED	ARTICLE	hideo.k@seznam.cz
295	Creating Docker Images With Spring Boot	https://www.youtube.com/watch?v=1w1Jv9qssqg&feature=emb_logo	2020-12-20 20:59:35	PROCESSED	PRESENTATION	hideo.k@seznam.cz
294	6 Tips to finish your Side Project	https://thomas-sojka.tech/6-tips-to-finish-your-side-project.html	2020-12-20 20:59:05	PROCESSED	ARTICLE	hideo.k@seznam.cz
299	10 best practices to build a Java container with Docker	https://snyk.io/blog/best-practices-to-build-java-containers-with-docker/	2022-06-09 19:55:40	NEW	BLOG	hideo.k@seznam.cz
300	Spring Boot Tips : Part 5 - Integration Testing using Testcontainers	https://www.youtube.com/watch?v=osw9dz2ZhhQ	2022-06-09 19:57:19	NEW	PRESENTATION	hideo.k@seznam.cz
301	Time-Series Compression Algorithms, Explained	https://www.timescale.com/blog/time-series-compression-algorithms-explained/	2022-06-09 19:58:59	NEW	ARTICLE	hideo.k@seznam.cz
302	JEP draft: String Templates (Preview)	https://openjdk.java.net/jeps/8273943	2022-06-09 20:06:08	NEW	ARTICLE	hideo.k@seznam.cz
303	Akcie TESLA, GM, MICROSOFT - Kdy nakupovat? Praktická analýza AKCIÍ - ANNA PÍCHOVÁ	https://www.youtube.com/watch?v=pfV62UwhX5A	2022-06-09 20:09:29	NEW	ARTICLE	hideo.k@seznam.cz
304	Income Statement: How to Understand & Analyse Financial Statements	https://www.youtube.com/watch?v=Qle_zjl7toY	2022-06-09 20:11:12	NEW	ARTICLE	hideo.k@seznam.cz
305	Getting started with Virtual Threads	https://javahippie.net/java/concurrency/2022/04/12/getting-started-with-virtual-threads.html	2022-06-09 20:14:05	NEW	BLOG	hideo.k@seznam.cz
306	Linux SysOps Handbook	https://abarrak.gitbook.io/linux-sysops-handbook/	2022-06-09 20:20:19	NEW	ARTICLE	hideo.k@seznam.cz
307	KeePassXC Advanced Usage // 8 features you might have not heard about	https://www.youtube.com/watch?v=o6Bk0HLPLzo	2022-06-09 20:21:17	NEW	ARTICLE	hideo.k@seznam.cz
308	What Is a Standard Container (2021 edition)	https://iximiuz.com/en/posts/oci-containers/	2022-06-09 20:24:13	NEW	BLOG	hideo.k@seznam.cz
309	Cleaning Docker Disk Space Usage	https://www.percona.com/blog/2019/08/21/cleaning-docker-disk-space-usage/	2022-06-09 20:30:41	NEW	ARTICLE	hideo.k@seznam.cz
310	Oracle test images ~ 2.5 GB	https://hub.docker.com/r/gvenzl/oracle-xe	2022-06-09 20:32:55	NEW	ARTICLE	hideo.k@seznam.cz
311	Demystifying Spring Security setup	https://boudhayan-dev.medium.com/demystifying-spring-security-setup-e0491acc7df7	2022-06-09 20:36:02	NEW	BLOG	hideo.k@seznam.cz
312	Hidden gems in Java 16 and Java 17, from Stream.mapMulti to HexFormat	https://blogs.oracle.com/javamagazine/post/the-hidden-gems-in-java-16-and-java-17-from-streammapmulti-to-hexformat	2022-06-10 17:01:00	NEW	BLOG	hideo.k@seznam.cz
313	Marcella Hazan’s Tomato Sauce	https://cooking.nytimes.com/recipes/1015178-marcella-hazans-tomato-sauce	2022-06-10 17:01:35	NEW	ARTICLE	hideo.k@seznam.cz
314	Validation with Spring Boot - the Complete Guide	https://reflectoring.io/bean-validation-with-spring-boot/	2022-06-10 17:09:22	NEW	ARTICLE	hideo.k@seznam.cz
\.


--
-- Data for Name: technology_resources_tags; Type: TABLE DATA; Schema: public; Owner: db_user
--

COPY public.technology_resources_tags (resource_id, tag_id) FROM stdin;
79	1
80	3
80	2
76	1
81	1
82	3
82	5
82	6
82	4
83	6
83	5
84	7
85	9
85	8
85	10
86	11
87	13
87	12
88	6
88	14
89	15
89	16
90	15
90	16
91	16
92	17
93	17
94	18
94	19
69	8
5	11
41	8
95	8
96	8
97	3
97	20
98	7
98	21
99	22
100	23
101	24
102	25
103	26
103	5
104	27
105	28
105	29
106	30
106	14
107	31
108	32
111	33
112	5
114	34
117	35
119	36
118	36
120	24
121	24
122	37
124	38
124	39
124	15
124	16
125	40
125	37
126	42
126	41
126	37
127	42
127	41
127	37
130	43
131	44
132	44
164	39
164	15
165	43
167	43
169	77
202	110
203	111
203	112
204	113
204	5
205	2
206	114
207	2
208	43
209	43
210	115
211	116
212	3
212	5
212	116
213	37
214	7
214	10
215	117
215	10
216	10
217	118
218	118
219	43
220	120
220	119
222	43
223	120
223	119
224	120
224	12
224	119
225	120
225	12
225	119
226	120
226	119
228	43
229	121
230	2
231	43
232	10
233	122
234	123
234	125
234	124
235	43
236	120
236	126
236	119
241	30
241	5
242	43
243	43
244	43
245	131
245	43
246	132
247	3
247	36
247	133
248	2
249	115
251	117
251	32
252	115
253	134
253	26
253	5
253	43
254	4
255	135
256	135
257	135
258	136
259	138
259	137
261	139
261	20
261	140
262	123
262	43
263	27
263	10
264	141
265	24
266	142
268	11
270	143
273	5
274	144
274	145
274	146
275	147
275	43
277	148
270	148
279	149
279	5
280	149
281	24
282	149
282	5
283	150
283	148
284	139
285	123
285	148
285	43
286	20
286	140
287	43
288	138
288	151
288	43
289	152
290	148
290	43
290	131
292	135
293	153
294	153
294	154
295	149
295	5
297	24
297	148
297	155
298	156
298	5
298	157
299	3
299	149
300	158
300	3
300	5
301	150
302	3
302	159
302	12
303	160
303	161
304	162
305	3
305	163
305	135
306	27
307	164
308	149
308	165
309	149
310	149
310	166
311	14
312	3
312	167
312	168
313	169
314	5
314	170
\.


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.tags_id_seq', 170, true);


--
-- Name: technology_resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: db_user
--

SELECT pg_catalog.setval('public.technology_resources_id_seq', 314, true);


--
-- Name: databasechangeloglock pk_databasechangeloglock; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT pk_databasechangeloglock PRIMARY KEY (id);


--
-- Name: tags pk_tags; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT pk_tags PRIMARY KEY (id);


--
-- Name: technology_resources pk_technology_resources; Type: CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.technology_resources
    ADD CONSTRAINT pk_technology_resources PRIMARY KEY (id);


--
-- Name: technology_resources_tags fk_tags; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.technology_resources_tags
    ADD CONSTRAINT fk_tags FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: technology_resources_tags fk_technology_resources; Type: FK CONSTRAINT; Schema: public; Owner: db_user
--

ALTER TABLE ONLY public.technology_resources_tags
    ADD CONSTRAINT fk_technology_resources FOREIGN KEY (resource_id) REFERENCES public.technology_resources(id);


--
-- PostgreSQL database dump complete
--

