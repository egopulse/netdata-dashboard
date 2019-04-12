echo $@

ENV=$1 REACT_APP_NETDATA_SERVER=$2 CONFIG_PATH=$3 npm run build

echo "Build done"
echo "Server starting ....."

# serve -s build
node server.js