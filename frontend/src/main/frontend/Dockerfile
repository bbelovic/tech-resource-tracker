FROM httpd:2.4
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"

RUN sed -i -e 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
      -e '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteEngine On' \
      -e '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]' \
      -e '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d' \
      -e '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteRule ^ - [L]' \
      -e '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteRule ^ /index.html' /usr/local/apache2/conf/httpd.conf

COPY ["dist/", "/usr/local/apache2/htdocs/"]