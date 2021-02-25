#!/bin/bash

curl https://cli-assets.heroku.com/install.sh | sh
/usr/local/bin/heroku -v
docker tag bbelovic/tech-resource-tracker registry.heroku.com/tech-resource-tracker/web
echo "$HEROKU_REGISTRY_PASSWORD" | docker login registry.heroku.com -u "$HEROKU_REGISTRY_USERNAME" --password-stdin
docker push registry.heroku.com/tech-resource-tracker/web
/usr/local/bin/heroku container:release web -a tech-resource-tracker -v
