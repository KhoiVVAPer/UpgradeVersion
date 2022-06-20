chmod +x android/app/build.gradle

sed -i.bak 's/  keyAlias System.getenv("BITRISEIO_ANDROID_KEYSTORE_ALIAS")/\/\/ keyAlias System.getenv("BITRISEIO_ANDROID_KEYSTORE_ALIAS")/g' android/app/build.gradle
sed -i.bak 's/  keyPassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD")/\/\/ keyPassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD")/g' android/app/build.gradle
sed -i.bak 's/  storeFile file(System.getenv("HOME") + "\/keystores\/AK_DCA.keystore")/\/\/ storeFile file(System.getenv("HOME") + "\/keystores\/AK_DCA.keystore")/g' android/app/build.gradle
sed -i.bak 's/  storePassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PASSWORD")/\/\/ storePassword System.getenv("BITRISEIO_ANDROID_KEYSTORE_PASSWORD")/g' android/app/build.gradle

sed -i.bak 's/  \/\/ storeFile file(project.env.get("ANDROID_KEYSTORE_FILE"))/  storeFile file(project.env.get("ANDROID_KEYSTORE_FILE"))/g' android/app/build.gradle
sed -i.bak 's/  \/\/ storePassword project.env.get("ANDROID_KEYSTORE_PASSWORD")/  storePassword project.env.get("ANDROID_KEYSTORE_PASSWORD")/g' android/app/build.gradle
sed -i.bak 's/  \/\/ keyAlias project.env.get("ANDROID_KEYSTORE_ALIAS")/  keyAlias project.env.get("ANDROID_KEYSTORE_ALIAS")/g' android/app/build.gradle
sed -i.bak 's/  \/\/ keyPassword project.env.get("ANDROID_KEYSTORE_ALIAS_PASSWORD")/  keyPassword project.env.get("ANDROID_KEYSTORE_ALIAS_PASSWORD")/g' android/app/build.gradle
rm android/app/build.gradle.bak
