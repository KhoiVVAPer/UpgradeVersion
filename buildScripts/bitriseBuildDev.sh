# sh ./buildScripts/supportScripts/buildVersionUpdate.sh minor ios
# sh ./buildScripts/supportScripts/buildVersionUpdate.sh minor android
sh ./buildScripts/supportScripts/switchToStage.sh
sh ./buildScripts/supportScripts/version-ios.sh
# sh ./buildScripts/supportScripts/rnnFileUpdate.sh
sh ./buildScripts/supportScripts/staticJsUpdate.sh
sh ./buildScripts/supportScripts/createENVDev.sh
sh ./buildScripts/supportScripts/androidCameraVersion.sh
sh ./buildScripts/supportScripts/iosUIWebView.sh

# sh ./buildScripts/supportScripts/gitTagPush.sh