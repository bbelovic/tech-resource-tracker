#!/bin/bash

source ./helpers.sh
hostname="n/a"

#parse_hostname() {
#  echo "Processing input url: $1"
#  if [[ $1 =~ .*//(.+:[0-9]{4}).* ]]; then
#    hostname=${BASH_REMATCH[1]}
#else
#    hostname="Unable to parse url: $1"
#fi
#}

javaCmd="java --enable-preview -cp /app/resources:/app/classes:/app/libs/* org.bbelovic.techresourcetracker.TechResourceTrackerApplication"

parse_hostname $URL_TO_WAIT
${cmdToExecute}
wait_and_execute $hostname "${cmdToExecute}"

#RES=$(./wait-for-it.sh $hostname --timeout=50 -q)
#RES=$?
#
#if [[ $RES -eq 0 ]]; then
#	java --enable-preview -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -cp /app/resources:/app/classes:/app/libs/* org.bbelovic.techresourcetracker.TechResourceTrackerApplication
#else
#	echo "Unable to ping: $hostname"
#fi
