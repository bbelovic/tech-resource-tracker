FROM httpd:2.4
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"
RUN sed -i "s/#ErrorDocument 404 \/missing.html/ErrorDocument 404 \/index.html/g" /usr/local/apache2/conf/httpd.conf
COPY ["dist/", "/usr/local/apache2/htdocs/"]