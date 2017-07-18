#!/bin/bash
set -x

export JAVA_HOME=$OPENSHIFT_DATA_DIR/jdk1.8.0_141
export PATH=$JAVA_HOME/bin:$PATH

cd $OPENSHIFT_REPO_DIR
nohup java -Xms384m -Xmx412m -jar target/*.jar 
