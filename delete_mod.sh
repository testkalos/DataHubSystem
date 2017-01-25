#!/bin/bash

par=2
if [ ! -z $1 ];then
  par=$1
fi

c=0
for i in $(cat $2); do   
  let c=$c+1
  # sleep 5 &
  # echo "curl -X \"DELETE\" --basic -u root:password \"http://localhost:8081/odata/v1/Products('$i')\"" &
  #curl -X "DELETE" --basic -u root:password "http://localhost:8081/odata/v1/Products('$i')" &
  bash ./del_prod_mod.sh $i $2 &
  if [ $c -ge $par ]; then 
    c=0
    while [ ! "$(jobs | wc -l)" -le 1 ]; do 
      # echo $(jobs)
      sleep 0.5
    done
  fi
done
