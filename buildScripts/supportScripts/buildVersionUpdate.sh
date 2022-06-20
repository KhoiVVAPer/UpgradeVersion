VERSION_PALTFORM='versionAndroid'
if [ $2 = "android" ] || [ $2 = "ANDROID" ] || [ $2 = "Android" ]
then
    VERSION_PALTFORM="versionAndroid"
fi
if [ $2 = "ios" ] || [ $2 = "IOS" ] || [ $2 = "Ios" ]
then
    VERSION_PALTFORM="versionIOS"
fi

ANDROID_VERSION=$(grep -m1 $VERSION_PALTFORM package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
MAJOR_VERISON="$(cut -d'.' -f1 <<<"$ANDROID_VERSION")"
MINOR_VERISON="$(cut -d'.' -f2 <<<"$ANDROID_VERSION")"
PATCH_VERISON="$(cut -d'.' -f3 <<<"$ANDROID_VERSION")"

if [ $1 = "major" ]
then
    MAJOR_VERISON=$((${MAJOR_VERISON}+1))
    MINOR_VERISON=0
    PATCH_VERISON=0
fi
if [ $1 = "minor" ]
then
    MINOR_VERISON=$((${MINOR_VERISON}+1))
    PATCH_VERISON=0
fi
if [ $1 = "patch" ]
then
    PATCH_VERISON=$((${PATCH_VERISON}+1))
fi

sed -i.bak 's/"'"$VERSION_PALTFORM"'": "'"$ANDROID_VERSION"'"/"versionAndroid": \"'"$MAJOR_VERISON.$MINOR_VERISON.$PATCH_VERISON"'"/g' package.json

rm package.json.bak