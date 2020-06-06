FROM httpd:2.4
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"
COPY ["httpd.conf", "/usr/local/apache2/conf/httpd.conf"]
COPY ["dist/", "/usr/local/apache2/htdocs/"]