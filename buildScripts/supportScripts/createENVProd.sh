#!/usr/bin/env bash
# This file need not to run from here, this is only for bitrise
# This script is to create a .env file at the source path using the Env Vars

echo "Add .env file to the source"
echo "PROFESSIONAL_DATABASE="$PROFESSIONAL_DATABASE >> .env
echo "HOME_AND_GARDEN_DATABASE="$HOME_AND_GARDEN_DATABASE >> .env
echo "COMMON_DATABASE="$COMMON_DATABASE >> .env
echo "LOCAL_DATABASE="$LOCAL_DATABASE >> .env
echo "WEBSITE_LINK="$WEBSITE_LINK >> .env
echo "BITRISEIO_ANDROID_KEYSTORE_ALIAS="$BITRISEIO_ANDROID_KEYSTORE_ALIAS >> .env
echo "BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD="$BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD >> .env
echo "BITRISEIO_ANDROID_KEYSTORE_PASSWORD="$BITRISEIO_ANDROID_KEYSTORE_PASSWORD >> .env
echo "GRAPHQL_API_URL="$GRAPHQL_API_URL_PROD >> .env
echo "COGNITO_USERNAME="$COGNITO_USERNAME_PROD >> .env
echo "COGNITO_PASSWORD="$COGNITO_PASSWORD_PROD >> .env
echo "AWS_REGION="$AWS_REGION >> .env
echo "AWS_USER_POOL_ID="$AWS_USER_POOL_ID_PROD >> .env
echo "AWS_USER_POOL_WEB_CLIENT_ID="$AWS_USER_POOL_WEB_CLIENT_ID_PROD >> .env
echo "ADOBE_ENV_ID="$ADOBE_ENV_ID_PROD >> .env

realpath .env
echo "-------"
cat .env
echo "-------"
