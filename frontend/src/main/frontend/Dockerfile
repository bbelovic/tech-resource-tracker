FROM httpd:2.4
LABEL maintainer="bbelovic@gmail.com" \
      version="0.1"
RUN sed -i "s/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g" /usr/local/apache2/conf/httpd.conf
RUN sed -i '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteRule ^ /index.html' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteRule ^ - [L]' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/Directory "\/usr\/local\/apache2\/htdocs"/a RewriteEngine On' /usr/local/apache2/conf/httpd.conf

COPY ["dist/", "/usr/local/apache2/htdocs/"]