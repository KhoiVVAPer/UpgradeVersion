sh ./buildScripts/supportScripts/buildVersionUpdate.sh $1 ios

sh ./buildScripts/supportScripts/version-ios.sh
sh ./buildScripts/supportScripts/staticJsUpdate.sh

npm cache clean --force
rm -rf node_modules
npm i
cd ios
pod deintegrate
rm Podfile.lock
pod install
cd ..

sh ./buildScripts/supportScripts/rnnFileUpdate.sh

sh ./buildScripts/supportScripts/gitTagPush.sh