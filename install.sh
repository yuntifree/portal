#!/bin/bash

if [ $# -lt 2 ]; then
    echo "not enough param"
    exit
fi

arr=($*)
length=${#arr[@]}
IPLIST="10.27.178.90 10.27.168.11"
DST=/data/server/html

for ((i=1;i<$length;i++)) 
do
    if [ "$1" = "test" ]; then
        cp -R ${arr[$i]} $DST
    elif [ "$1" = "deploy" ]; then
        for ip in $IPLIST 
        do
            scp -r ${arr[$i]} root@$ip:$DST
        done
    fi
done

