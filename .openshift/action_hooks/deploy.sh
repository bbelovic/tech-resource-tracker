#!/bin/bash
set -x

pwd

if [ ! -d $OPENSHIFT_DATA_DIR/m2/repository ]
then
   mkdir -p $OPENSHIFT_DATA_DIR/m2/repository
fi

if [ ! -d $OPENSHIFT_DATA_DIR/jdk1.8.0_141 ]
then
   tar xvf $OPENSHIFT_DATA_DIR/jdk-8u141-*.tar.gz --directory $OPENSHIFT_DATA_DIR
fi

if [ ! -d $OPENSHIFT_DATA_DIR/apache-maven-3.5.0 ]
then
   tar xvf $OPENSHIFT_DATA_DIR/apache-maven*.tar.gz --directory $OPENSHIFT_DATA_DIR
fi

export JAVA_HOME=$OPENSHIFT_DATA_DIR/jdk1.8.0_141
export MAVEN_OPTS="-Xms384m -Xmx412m"
export PATH=$JAVA_HOME/bin:$OPENSHIFT_DATA_DIR/apache-maven-3.5.0/bin:$PATH

cd $OPENSHIFT_REPO_DIR

mvn -v
mvn -s settings.xml clean install -DskipTests
