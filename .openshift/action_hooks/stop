#!/bin/bash

PID=$(ps -ef | grep java.*\.jar | grep -v grep | awk '{ print $2 }')

if [ -z "$PID" ]
then
   echo "Application is already stopped"
else
   kill $PID
fi
