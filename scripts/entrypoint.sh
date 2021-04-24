#!/bin/bash

source ./helpers.sh
hostname="n/a"

cmdToExecute="@cmdToExecute@"

parse_hostname $URL_TO_WAIT

wait_and_execute $hostname "$cmdToExecute"
