#!/bin/bash

# Author : Syed Shoaib Abidi
# Script follows here:
echo " <<<<<<<<<<<<<<<<<<<< Building Docker Containers >>>>>>>>>>>>>>>>>>>>"
docker-compose build --no-cache
echo " <<<<<<<<<<<<<<<<<<<< Running the Docker Containers now >>>>>>>>>>>>>>>>>>>>"
docker-compose up --force-recreate