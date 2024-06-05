#!/bin/bash

# Verifica si el proyecto ya existe
if [ ! -d "$APP_NAME" ]; then
    # Si el proyecto no existe, crea uno nuevo
    ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE --skip-git
    mv $APP_NAME/* .
    rm -rf $APP_NAME
fi

# Inicia el servidor de desarrollo de Angular
ng serve --host 0.0.0.0 --port 4200
