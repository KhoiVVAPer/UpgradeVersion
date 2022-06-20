echo "Start replace"
touch local.m
chmod +x node_modules/react-native-navigation/lib/ios/RNNCommandsHandler.m
cp node_modules/react-native-navigation/lib/ios/RNNCommandsHandler.m local.m
sed 's/_mainWindow.rootViewController = vc;/_mainWindow.rootViewController = vc;\
        [UIApplication sharedApplication].windows.firstObject.hidden=NO;/g' local.m > node_modules/react-native-navigation/lib/ios/RNNCommandsHandler.m

rm local.m
echo "Below line inserted,"
cat node_modules/react-native-navigation/lib/ios/RNNCommandsHandler.m|grep "UIApplication sharedApplication"
echo "Done"
