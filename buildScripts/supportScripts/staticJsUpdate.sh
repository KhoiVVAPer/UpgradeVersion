#!/bin/sh
# This script is to create/replace the src/config/libs/versionDetails.js, this is used inside the app for diplaying the version.
# This script will ensure that the version mentioned on the package.json is the single source of version information.

chmod +x src/config/libs/versionDetails.js
chmod +x src/config/libs/globals.js

line_number=$(awk '/appVersion/{print NR}' package.json)

line_number1=$((line_number+1))
line_number2=$((line_number+6))

eval "awk 'NR>="$line_number1" && NR<="$line_number2"' package.json" >> tes.js

input="tes.js"
while IFS= read -r line
do
  echo "$line" | xargs >> temp
done < "$input"


sed -i '.bak' "s/:/: '/g" temp
sed -i '.bak' "s/' /'/g" temp
sed -i '.bak' "s/,/',/g" temp
sed "/,[0-9]*$/ ! s/$/'/" temp > temp1

echo "// This file is used to store the version information and provide that in the settings screen, please do not update this file manually" > src/config/libs/versionDetails.js
echo "// this should be run as a script from package.json script name is - updateVersionDetails"  >> src/config/libs/versionDetails.js
echo ""  >> src/config/libs/versionDetails.js
echo "export default {" >> src/config/libs/versionDetails.js
cat temp1 >> src/config/libs/versionDetails.js
echo "};" >> src/config/libs/versionDetails.js

rm tes.js
rm temp
rm temp1
rm temp.bak

realpath src/config/libs/versionDetails.js
echo "-------"
cat src/config/libs/versionDetails.js
echo "-------"

#### Updating globals flag
sed -i.bak 's/const LIVE = false;/const LIVE = true;/g' src/config/libs/globals.js
rm src/config/libs/globals.js.bak


#### updating react-native-material-dropdown
cp -fr buildScripts/supportScripts/react-native-material-dropdown/index.js node_modules/react-native-material-dropdown/src/components/dropdown/index.js