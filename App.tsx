import React, {FC, useCallback, useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {images} from './src/assets';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
interface AppProps {}
const App: FC<AppProps> = ({}) => {
  const [isFBLogin, setIsFBLogin] = useState<boolean>(false);
  const [isGGLogin, setIsGGLogin] = useState<boolean>(false);

  const [imgUrl, setImgUrl] = useState<string>();

  //Đăng xuất
  const fbLogout = useCallback(() => {
    LoginManager.logOut();
    setIsFBLogin(false);
    setImgUrl(undefined);
  }, []);
  const getInfoFromToken = useCallback((token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name, email, picture',
      },
    };
    // Lấy thông tin tài khoản
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('Login Info has an error:', error);
        } else {
          console.log('result:', result);
          setImgUrl(result.picture.data.url);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }, []);

  //Đăng nhập
  const fbLogin = useCallback(() => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('login canceled');
        } else {
          setIsFBLogin(true);
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data?.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('login fail with error: ' + console.error(error));
      },
    );
  }, [getInfoFromToken]);

  //Đăng nhập google
  const ggLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Info', userInfo);
      setIsGGLogin(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }, []);

  //Đăng xuất google
  const ggLogout = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      setIsGGLogin(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  //Đăng nhập Apple
  const appleLogin = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      // fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      //   updateCredentialStateForUser(`Error: ${error.code}`),
      // );

      // if (identityToken) {
      //   // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      //   console.log(nonce, identityToken);
      // } else {
      //   // no token - failed sign-in?
      // }

      // if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
      //   console.log("I'm a real person!");
      // }

      // console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        defaultSource={images.emptyAvatar}
        source={imgUrl ? {uri: imgUrl} : images.emptyAvatar}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.Btn}
        onPress={isFBLogin ? fbLogout : fbLogin}>
        <Image defaultSource={images.facebook} source={images.facebook} />
        <Text style={styles.contentBtn}>
          {isFBLogin ? 'Đăng xuất' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={isGGLogin ? ggLogout : ggLogin}>
        <Image defaultSource={images.google} source={images.google} />
        <Text style={styles.contentBtn}>
          {' '}
          {isGGLogin ? 'Đăng xuất' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={appleLogin}
        />
      )}
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  avatar: {
    height: 120,
    width: 120,
  },
  Btn: {
    width: 120,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  contentBtn: {
    marginHorizontal: 5,
  },
});
