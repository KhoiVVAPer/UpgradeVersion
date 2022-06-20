if [ $1 != "none" ] && [ $1 != "major" ] && [ $1 != "minor" ] && [ $1 != "patch" ]
then
    echo 'Wrong first command'
    echo 'It should be => major/minor/patch/none'
    exit 0
fi
if [ $2 != "android" ] && [ $2 != "ios" ]
then
    echo 'Wrong second command'
    echo 'It should be => android/ios'
    exit 0
fi

if [[ $3 = "release" ]]
then
    sh buildScripts/supportScripts/buildVersionUpdate.sh $1 $2
    sh buildScripts/supportScripts/staticJsUpdate.sh
fi

### Generating android build
if [ $2 = "android" ] || [ $2 = "ANDROID" ] || [ $2 = "Android" ]
then
    sh buildScripts/androidVariantReset.sh
    cd android
    gradlew clean
    cd ..
    if [[ $3 = "release" ]]
    then
        if [[ $4 = "clean" ]]
        then
            npm cache clean --force
            rm -rf node_modules
            npm i
            cd android
            ./gradlew clean
            cd ..
        fi
        sh buildScripts/supportScripts/androidVariantLocal.sh
        react-native run-android --variant=release
    else
        if [[ $4 = "clean" ]]
        then
            npm cache clean --force
            rm -rf node_modules
            npm i
            cd android
            ./gradlew clean
            cd ..
        fi
        react-native run-android
    fi
fi

if [ $2 = "ios" ] || [ $2 = "IOS" ] || [ $2 = "Ios" ]
then
    if [[ $4 = "clean" ]]
    then
        npm cache clean --force
        rm -rf node_modules
        npm i
        cd ios
        pod deintegrate
        rm Podfile.lock
        pod install
        cd ..
    fi
    react-native run-ios --simulator="iPad Air"
fi

if [ $1 != "none" ] && [ $3 = "release" ]
then
    sh buildScripts/supportScripts/gitTagPush.sh
fi
