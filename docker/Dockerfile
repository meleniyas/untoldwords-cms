FROM node:20

ARG APP_NAME

RUN npm install -g @angular/cli

WORKDIR /
RUN mkdir $APP_NAME
WORKDIR /$APP_NAME

ENV APP_NAME $APP_NAME
ENV STANDALONE 'false'
ENV STRICT 'true'
ENV STYLE 'scss'

COPY start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]

EXPOSE 4200