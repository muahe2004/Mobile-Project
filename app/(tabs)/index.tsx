import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '@/components/Header/Header';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import HomePage from '../modules/home';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
      <Header title={'D'} username={'D'}></Header>

      <ParallaxScrollView>
        <HomePage></HomePage>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
