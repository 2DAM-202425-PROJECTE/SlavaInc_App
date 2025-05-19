#!/bin/bash

# Instal·la dependències
npm install

# Construeix els assets
npm run build

# Copia els arxius necessaris
cp -R public/* dist/
