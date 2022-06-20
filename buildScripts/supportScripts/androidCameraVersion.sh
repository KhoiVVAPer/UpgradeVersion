chmod +x node_modules/react-native-camera/android/gradle/wrapper/gradle-wrapper.properties

sed -i.bak 's/services.gradle.org\/distributions\/gradle-5.6.2-all.zip/services.gradle.org\/distributions\/gradle-6.2-bin.zip/g' node_modules/react-native-camera/android/gradle/wrapper/gradle-wrapper.properties

sed -i.bak '/minSdkVersion rootProject.ext.minSdkVersion/s/.*/&\
multiDexEnabled true/' node_modules/react-native-html-to-pdf/android/build.gradle

sed -i.bak 's/mWebView.loadData(mHtmlString, "text\/HTML; charset=utf-8", null);/mWebView.loadDataWithBaseURL("", mHtmlString, "text\/HTML", "utf-8", null);/g' node_modules/react-native-html-to-pdf/android/src/main/java/android/print/PdfConverter.java