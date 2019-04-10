FROM node:8

RUN mkdir -p /opt/netdata-dashboard
WORKDIR /opt/netdata-dashboard

COPY . /opt/netdata-dashboard

ARG ENV_BUILD=local
ENV ENV $ENV_BUILD
ENV REACT_APP_NETDATA_SERVER $REACT_APP_NETDATA_SERVER

RUN npm install -g serve
RUN npm install 
RUN chmod +x /opt/netdata-dashboard/start.sh
# RUN ENV=$ENV_BUILD npm run build
EXPOSE 5000
ENTRYPOINT ["/bin/bash", "-c", "/opt/netdata-dashboard/start.sh $ENV $REACT_APP_NETDATA_SERVER"]


