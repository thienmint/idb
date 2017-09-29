#!/bin/bash

# Set the correct project to deploy to
if [ "$1" == "master" ]; then
  echo "Authenticating with master project"
  gcloud auth activate-service-account --key-file prod-client-secret.json
  echo "Set deployment to master"
  gcloud config set project esportguru-181021
fi

if [ "$1" == "dev" ]; then
  echo "Authenticating with master project"
  gcloud auth activate-service-account --key-file dev-client-secret.json
  echo "Set deployment to dev"
  gcloud config set project esportguru-dev
fi

 echo "Install the Python dependencies"
 pip install -r requirements.txt -t project/lib/

 cd project
 echo "Inside project now"
    echo "---- Deployment starts"
    gcloud app deploy app.yaml
    echo "---- Deployment ends"
 cd ..
 echo "In root directory now"
