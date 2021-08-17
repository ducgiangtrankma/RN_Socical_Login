# Facebook login:
## Using : https://www.npmjs.com/package/react-native-fbsdk-next
### Install : yarn add react-native-fbsdk-next
### Config flow document  https://www.npmjs.com/package/react-native-fbsdk-next
### Error IOS :
 - Undefined symbols for architecture x86_64 : Fix -> Add File.Swift in the main project folder and answer "yes" when Xcode asks you if you want to "Create Bridging Header"
 - AppID: go to root app -> import {Settings} from 'react-native-fbsdk-next' -> Settings.initializeSDK();
 - "Hiện không dùng được tính năng này: Facebook Login is currently unavailable for this app, since we are updating additional details for this app. Please try again later." ->
 Go to facebook developer -> select Advanced Access (Quyền và tính năng) -> in 'public_profile' and 'email' in tab action (Hành động) -> Nhận quyền
 - Get info fields in https://developers.facebook.com/docs/graph-api/reference/user/?locale=vi_VN
 ### Error Android:
 - URL : add platform in facebook developer
