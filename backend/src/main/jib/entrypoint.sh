#!/bin/bash

hostname="n/a"

parse_hostname() {
  echo "Processing input url: $1"
  if [[ $1 =~ .*//(.+:[0-9]{4}).* ]]; then
    hostname=${BASH_REMATCH[1]}
else
    hostname="Unable to parse url: $1"
fi
}

parse_hostname $SPRING_DATASOURCE_URL

RES=$(./wait-for-it.sh $hostname --timeout=5 -q)
RES=$?

if [[ $RES -eq 0 ]]; then
	java --enable-preview -cp /app/resources:/app/classes:/app/libs/* org.bbelovic.techresourcetracker.TechResourceTrackerApplication
else
	echo "Unable to ping: $hostname"
fi	
