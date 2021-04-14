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

parse_hostname $TECH_RESOURCE_TRACKER_URL

RES=$(./wait-for-it.sh $hostname --timeout=50 -q)
RES=$?

if [[ $RES -eq 0 ]]; then
	npm run e2e
else
	echo "Unable to ping: $hostname"
fi	
