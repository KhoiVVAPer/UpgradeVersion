# sh ./buildScripts/supportScripts/buildVersionUpdate.sh minor ios
# sh ./buildScripts/supportScripts/buildVersionUpdate.sh minor android
sh ./buildScripts/supportScripts/switchToProd.sh
sh ./buildScripts/supportScripts/version-ios.sh
# sh ./buildScripts/supportScripts/rnnFileUpdate.sh
sh ./buildScripts/supportScripts/staticJsUpdate.sh
sh ./buildScripts/supportScripts/createENVProd.sh
sh ./buildScripts/supportScripts/androidCameraVersion.sh
sh ./buildScripts/supportScripts/iosUIWebView.sh

# sh ./buildScripts/supportScripts/gitTagPush.sh