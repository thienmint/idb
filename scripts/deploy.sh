#!/bin/bash


echo "START PRE-DEPLOYMENT: Authentication"
echo "CURRENT PATH: `pwd`"

# [START auth]
# Decrypt the credentials we added to the repo using the key we added with the Travis command line tool
  openssl aes-256-cbc -K $encrypted_baae4e866404_key -iv $encrypted_baae4e866404_iv -in authentications.tar.gz.enc -out authentications.tar.gz -d

  tar -xzf authentications.tar.gz
  echo "MAKING SURE THAT THE KEYS ARE THERE"
#  ls -l dev-client-secret.json
  ls -l prod-client-secret.json
# [END auth]

# Set the correct project to deploy to
if [ "$1" == "master" ]; then
  echo "Authenticating with master project"
  gcloud auth activate-service-account --key-file prod-client-secret.json
  echo "Set deployment to master"
  gcloud config set project esportguru-181021

 echo "START DEPLOYMENT: deploy.sh"
 echo "CURRENT PATH: `pwd`"
# echo "Install the Python dependencies"
# pip install -r requirements.txt -t project/lib/

 cd idb
 echo "Inside `pwd` now"
    echo "---- Deployment starts"
    gcloud app deploy app.yaml
    echo "---- Deployment ends"
 cd ..
 echo "Back in `pwd` directory now"
fi

if [ "$1" == "dev" ]; then
  echo "Authenticating with for deployment of dev project"
  gcloud auth activate-service-account --key-file prod-client-secret.json
  echo "Set deployment to dev"
  gcloud config set project esportguru-181021

  cd idb
   echo "Inside `pwd` now"
      echo "---- Building artifact"
      npm install
      npm run build
      echo "---- Done building artifact"
      sleep 5
      echo "---- SCP to CE host"
      gcloud compute scp build/ dev-frontend:/home/tvo --recurse --zone=us-central1-c
      echo "---- Done copying to remote"
      sleep 10
      echo "---- Opening remote file"
      gcloud compute ssh dev-frontend --command=". /home/tvo/deploy_apache.sh" --zone=us-central1-c
      echo "---- Done opening remote file"
      sleep 10
   cd ..
   echo "Back in `pwd` directory now"
fi

