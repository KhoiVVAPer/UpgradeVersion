rm -rf GoogleService-Info.plist
rm -rf android/app/google-services.json

STAGE_BUNDLE_ID="com.kaercher.programme.test"
PROD_BUNDLE_ID="com.kaercher.programme"
CURRENT_BUNDLE_ID=$(grep -m1 bundleId package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

cp -p GoogleService-Info-stage.plist GoogleService-Info.plist
cp -p google-services.json-stage android/app/google-services.json

sed -i.bak 's/"'bundleId'": "'"$CURRENT_BUNDLE_ID"'"/"bundleId": \"'"$STAGE_BUNDLE_ID"'"/g' package.json
sed -i.bak 's/'"$PROD_BUNDLE_ID"';/'"$STAGE_BUNDLE_ID"';/g' ios/AK_DCA_App.xcodeproj/project.pbxproj

rm -rf package.json.bak
rm -rf ios/AK_DCA_App.xcodeproj/project.pbxproj.bak
