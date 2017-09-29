#!/bin/bash

 echo "START DEPLOYMENT: deploy.sh"
 echo "CURRENT PATH: `pwd`"

 echo "Install the Python dependencies"
 pip install -r requirements.txt -t project/lib/

 cd project
 echo "Inside project now"
    echo "---- Deployment starts"
    gcloud app deploy app.yaml
    echo "---- Deployment ends"
 cd ..
 echo "In root directory now"
