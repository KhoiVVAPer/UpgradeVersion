ANDROID_VERSION=$(grep -m1 versionAndroid package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

#### Incrementing version of android build
RELEASE_DATE=$(cat package.json \
  | grep androidReleaseDate \
  | head -1 \
  | awk -F: '{ print $2 }' )
RELEASE_YEAR="$(cut -d' ' -f3 <<<"$RELEASE_DATE")"
RELEASE_YEAR="$(cut -d',' -f1 <<<"$RELEASE_YEAR")"
RELEASE_YEAR="$(cut -d'"' -f1 <<<"$RELEASE_YEAR")"

ANDROID_VERSION=$(grep -m1 versionAndroid package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

#### Pushing tag to git
TAG_VERSION="v$RELEASE_YEAR.$ANDROID_VERSION"

git add .
git commit -m "$TAG_VERSION"
git push -u origin
git tag $TAG_VERSION
git push origin --tags