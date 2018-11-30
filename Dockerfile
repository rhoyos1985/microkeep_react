FROM ubuntu:bionic

LABEL author="Richard Hoyos"

ENV METEOR_VERSION 1.7.0.5

RUN apt-get update -q -q && \
  # Get curl in order to download curl
  apt-get --yes --allow-change-held-packages install curl python build-essential git && \
  # Allow superuser
  export METEOR_ALLOW_SUPERUSER=true && \
  # Download meteor
  curl https://install.meteor.com/?release=${METEOR_VERSION} | sed s/--progress-bar/-sL/g | sh && \
  # Add user meteor
  adduser --system --group meteor --home / && \
  export "NODE=$(find /root/.meteor/ -path '*bin/node' | grep '/root/.meteor/packages/meteor-tool/' | sort | head -n 1)" && \
  ln -sf ${NODE} /usr/local/bin/node && \
  ln -sf "$(dirname "$NODE")/npm" /usr/local/bin/npm

ADD . /source
WORKDIR /source
RUN meteor npm install 

ENV PORT 3000
ENV NODE_ENV development
EXPOSE 3000
USER meteor
CMD meteor