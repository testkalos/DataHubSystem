START=$(date +%s%N)
echo "$START Deleting $1" >> del_$2.log
R_CODE=$(curl -L -w \"%{http_code}\" -X "DELETE" --basic -u root:password "http://localhost:8081/odata/v1/Products('$1')")
END=$(date +%s%N)
DURATION=$((END-START))
echo "$END Deleted $1 in "$((DURATION/1000000000))" s return code $R_CODE" >> del_$2.log
