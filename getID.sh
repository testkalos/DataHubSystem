COUNTER=0
rundir=$PWD
SPLITNUMBER=$2
NAMEFILE=`basename $1 .txt`
NUMBEROFPRODUCTS=`wc -l $1 | cut -f1 -d' '`
NUMBEROFPRODUCTSFORFILE=$((NUMBEROFPRODUCTS/SPLITNUMBER))
MODDIVISION=$((NUMBEROFPRODUCTS%SPLITNUMBER))
         while [  $COUNTER -lt $SPLITNUMBER ]; do
             if [ $COUNTER -eq $((SPLITNUMBER-1)) ];then
                 if [ $MODDIVISION -ne 0 ];then
                    head -n$((MODDIVISION+NUMBEROFPRODUCTSFORFILE+COUNTER*NUMBEROFPRODUCTSFORFILE)) $1 | tail -n$((MODDIVISION+NUMBEROFPRODUCTSFORFILE)) > ${NAMEFILE}"_"${COUNTER}".txt"
                 else
                    head -n$((NUMBEROFPRODUCTSFORFILE+COUNTER*NUMBEROFPRODUCTSFORFILE)) $1 | tail -n$((NUMBEROFPRODUCTSFORFILE)) > ${NAMEFILE}"_"${COUNTER}".txt"
                 fi
             else
                 head -n$((NUMBEROFPRODUCTSFORFILE+COUNTER*NUMBEROFPRODUCTSFORFILE)) $1 | tail -n$((NUMBEROFPRODUCTSFORFILE)) > ${NAMEFILE}"_"${COUNTER}".txt"
             fi
             sel="select UUID,identifier from products where"
             n=$(wc -l ${NAMEFILE}"_"${COUNTER}".txt" | awk '{print$1}')
             id="identifier='$(head -n1 ${NAMEFILE}"_"${COUNTER}".txt" | sed 's/ $//')'"
             for i in $(tail -n$((n-1)) ${NAMEFILE}"_"${COUNTER}".txt"); do
             id="$id OR identifier='$i'"
             done
             sel="$sel $id"
             echo "$sel" > "QUERY_"${COUNTER}".txt"
             cd /PUP/shared/tools
             echo "`date +%s%N` Executing query, present in "QUERY_"${COUNTER}".txt", on ${NAMEFILE}"_"${COUNTER}".txt"" >> $rundir"/"${NAMEFILE}"_"${COUNTER}".log"
             echo "$sel" | ./query_db.sh "$rundir/$3" > "$rundir/QUERYRESULT_"$COUNTER".txt"
             echo "`date +%s%N` Executed query, present in "QUERY_"${COUNTER}".txt", on ${NAMEFILE}"_"${COUNTER}".txt"" >> $rundir"/"${NAMEFILE}"_"${COUNTER}".log"
             cd "$rundir"
             NUMBEROFRESULT=`wc -l "QUERYRESULT_"$COUNTER".txt" | cut -f1 -d' '`
             tail -n$((NUMBEROFRESULT-3)) "QUERYRESULT_"$COUNTER".txt" | cut -f1 -d'|' > "UUID_"${COUNTER}".txt"
             tail -n$((NUMBEROFRESULT-3)) "QUERYRESULT_"$COUNTER".txt" | cut -f2 -d'|' > "NAMEBYQUERY_"${COUNTER}".txt"
             grep -F -x -v -f "NAMEBYQUERY_"${COUNTER}".txt" ${NAMEFILE}"_"${COUNTER}".txt" > "PRODUCTSNOTFOUND_"${COUNTER}".txt"
             let COUNTER=COUNTER+1 
         done
