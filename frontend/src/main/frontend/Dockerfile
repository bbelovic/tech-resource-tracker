FROM cypress/included:12.0.2
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"

RUN whoami
RUN chmod 755 /root
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

USER node

RUN id

RUN ls -la /root/.cache/Cypress/*/Cypress

RUN cat /root/.cache/Cypress/12.0.2/binary_state.json

WORKDIR /e2e
