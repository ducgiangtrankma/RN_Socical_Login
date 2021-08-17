import React, {FC, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {images} from './src/assets';
interface AppProps {}
const App: FC<AppProps> = ({}) => {
  const fbLogin = useCallback(() => {
    console.log('Fb');
  }, []);
  const ggLogin = useCallback(() => {
    console.log('Fb');
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Test</Text>
      <Image
        defaultSource={images.emptyAvatar}
        source={images.emptyAvatar}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.Btn} onPress={fbLogin}>
        <Image defaultSource={images.facebook} source={images.facebook} />
        <Text style={styles.contentBtn}>Facebook login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Btn} onPress={ggLogin}>
        <Image defaultSource={images.google} source={images.google} />
        <Text style={styles.contentBtn}>Google login</Text>
      </TouchableOpacity>
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
