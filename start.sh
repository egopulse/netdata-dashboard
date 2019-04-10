echo "================= $1 ================="
echo "================= $2 ================="
ENV=$1 REACT_APP_NETDATA_SERVER=$2 npm run build
echo "================= BUILD DONE ================="
echo "================= STARTING ================="
# serve -s build
node server.js