#!/bin/bash

# Check if Realm CLI is installed
if ! command -v realm-cli &> /dev/null
then
    echo "Realm CLI is not installed. Please install it before running this script."
    exit
fi

# Prompt user for Atlas API key and MongoDB Cloud private API key
read -p "Enter your Atlas Public API key: " atlas_public_api_key
read -p "Enter your Atlas Private API key: " atlas_private_api_key

# Prompt user for cluster name and create data-source config file
read -p "Enter the name of the Atlas cluster to link the app service to: " cluster_name
echo "{
  \"version\": 1,  
  \"name\": \"mongodb-atlas\",
  \"type\": \"mongodb-atlas\",
  \"config\": {
    \"clusterName\": \"$cluster_name\",
    \"readPreference\": \"primary\"
  }
}" > AppService/data_sources/mongodb-atlas/config.json

# Authenticate with Realm CLI using private API key
realm-cli login --api-key=$atlas_public_api_key --private-api-key=$atlas_private_api_key

# Import app service from directory
realm-cli push --local AppService
