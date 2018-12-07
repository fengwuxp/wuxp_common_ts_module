@Echo on

"%JAVA_HOME%/bin/keytool" -genkey -alias oak_android  -keypass oak666 -keystore oak.keystore -storepass oak666

pause

keytool -genkey -alias oak_android -keyalg RSA -validity 36500 -keypass oak666 -keystore oak.keystore -storepass oak666