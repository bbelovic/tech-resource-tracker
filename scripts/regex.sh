#!/bin/bash

hostname="n/a"
parse_hostname() {
  echo "Processing input url: $1"
  if [[ $1 =~ .*//(.+:[0-9]{4}).* ]]; then
    hostname=${BASH_REMATCH[1]}
else
    hostname="unable to parse string $1"
fi
}

test_fn() {
  vars=$1
  cmd=($vars)
  ${cmd[@]}
}

#source ./helpers.sh

input="postgres://rvwxqhvtvwgqmv:0c43a8597dd04d7efe966ffc64a0892d787e07d4151242109c2c204afb701772@ec2-107-21-109-15.compute-1.amazonaws.com:5432/d4fq7bp9lrok90"
#parse_hostname $input

jparam="java --enable-preview -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -cp /app/resources:/app/classes:/app/libs/* org.bbelovic.techresourcetracker.TechResourceTrackerApplication"

test_fn "$jparam"

#cmd=(echo blabol blabol2 blabol3)

#${cmd[@:2]}

#vhostname2="unknown"
#parse_input "blabol"

#echo "hostname: $vhostname2"


#strname="jdbc:postgresql://127.0.0.1:5432/notes_db"
#if [[ $input =~ .*//(.+):5432.* ]]; then
#    echo "result: ${BASH_REMATCH[1]}"
#else
#    echo "unable to parse string $strname"
#fi

