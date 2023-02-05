FROM cypress/included:12.0.2
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"

RUN chmod 755 /root
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

USER node

WORKDIR /e2e
