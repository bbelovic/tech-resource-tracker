#!/bin/bash

parse_hostname() {
  echo "Processing input url: $1"
  if [[ $1 =~ .*//(.+:[0-9]{4}).* ]]; then
    hostname=${BASH_REMATCH[1]}
else
    hostname="Unable to parse url: $1"
fi
}

wait_and_execute() {
RES=$(./wait-for-it.sh $1 --timeout=50 -q)
RES=$?

if [[ $RES -eq 0 ]]; then
  cmdToRun=($2)
  echo "Running: $cmdToRun"
  ${cmdToRun[@]}
#	java --enable-preview -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -cp /app/resources:/app/classes:/app/libs/* org.bbelovic.techresourcetracker.TechResourceTrackerApplication
else
	echo "Unable to ping: $1"
fi
}