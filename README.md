## Commands 

```
ENV=gc REACT_APP_NETDATA_SERVER=https://netdata.internal.egopulse.com  npm run build
node server.js

haproxy -f haconfig.conf

docker build -t egopulse/netdata-dashboard .
docker push egopulse/netdata-dashboard

docker run --rm --name netdata-dashboard -itd -p 5000:5000 -e ENV=gc -e REACT_APP_NETDATA_SERVER=http://139.162.54.172:9999 egopulse/netdata-dashboard:latest
```