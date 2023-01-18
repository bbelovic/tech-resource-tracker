FROM cypress/included:12.0.2
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"


WORKDIR /e2e

RUN mv /root/.cache /home/node/.cache
RUN chown -R node /home/node/.cache
USER node