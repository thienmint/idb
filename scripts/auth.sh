#!/bin/bash

 echo "START PRE-DEPLOYMENT: auth.sh"
 echo "CURRENT PATH: `pwd`"
# [START auth]
# Decrypt the credentials we added to the repo using the key we added with the Travis command line tool
  openssl aes-256-cbc -K $encrypted_baae4e866404_key -iv $encrypted_baae4e866404_iv -in authentications.tar.gz.enc -out authentications.tar.gz -d

  tar -xzf authentications.tar.gz
  echo "MAKING SURE THAT THE KEYS ARE THERE"
  ls -l dev-client-secret.json
  ls -l prod-client-secret.json
# [END auth]