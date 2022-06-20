#!/usr/bin/env bash -e
#! version-IOS.sh

PROJECT_DIR="ios/AK_DCA_App"
INFOPLIST_FILE="Info.plist"
INFOPLIST_DIR="${PROJECT_DIR}/${INFOPLIST_FILE}"

PACKAGE_VERSION=$(cat package.json | grep versionIOS | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "${INFOPLIST_DIR}")
# BUILD_NUMBER=$(($BUILD_NUMBER + 1))
BUILD_NUMBER=$(grep -m1 buildNoIOS package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

# Update plist with new values
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${PACKAGE_VERSION#*v}" "${INFOPLIST_DIR}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "${INFOPLIST_DIR}"
cat $INFOPLIST_DIR;
