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

input="postgres://rvwxqhvtvwgqmv:0c43a8597dd04d7efe966ffc64a0892d787e07d4151242109c2c204afb701772@ec2-107-21-109-15.compute-1.amazonaws.com:5432/d4fq7bp9lrok90"
parse_hostname $input
echo "hostname: $hostname"

#strname="jdbc:postgresql://127.0.0.1:5432/notes_db"
#if [[ $input =~ .*//(.+):5432.* ]]; then
#    echo "result: ${BASH_REMATCH[1]}"
#else
#    echo "unable to parse string $strname"
#fi

