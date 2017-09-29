#!/bin/bash

# Set the correct project to deploy to
if [ "$1" == "master" ]; then
  gcloud config set project esportguru-181021
fi

if [ "$1" == "dev" ]; then
  gcloud config set project esportguru-dev
fi

# Install the Python dependencies
 pip install -r requirements.txt -t lib/

# Deployment starts
 gcloud app deploy
# Deployment ends