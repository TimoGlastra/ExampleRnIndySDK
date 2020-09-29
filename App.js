/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import indy from 'rn-indy-sdk';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [actionState, setActionState] = useState(
    'Click on one of the buttons to perform an action',
  );

  const [walletHandle, setWalletHandle] = useState(null);

  function createWallet() {
    indy
      .createWallet({id: 'wallet-123'}, {key: 'key'})
      .then((res) => setActionState(`success createWallet: ${res}`))
      .catch((err) => setActionState(`error createWallet: ${err}`));
  }

  function openWallet() {
    indy
      .openWallet({id: 'wallet-123'}, {key: 'key'})
      .then((res) => {
        setActionState(`success openWallet: ${res}`);
        setWalletHandle(res);
      })
      .catch((err) => setActionState(`error openWallet: ${err}`));
  }

  function closeWallet() {
    indy
      .closeWallet(walletHandle)
      .then((res) => setActionState(`success closeWallet: ${res}`))
      .catch((err) => setActionState(`error closeWallet: ${err}`));
  }

  function deleteWallet() {
    indy
      .deleteWallet({id: 'wallet-123'}, {key: 'key'})
      .then((res) => setActionState(`success deleteWallet: ${res}`))
      .catch((err) => setActionState(`error deleteWallet: ${err}`));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.sectionDescription}>{actionState}</Text>
            <Text>
              Wallet Handle: {walletHandle === null ? 'none' : walletHandle}
            </Text>
            <View style={styles.sectionContainer}>
              <Button title="Create wallet" onPress={createWallet} />
            </View>
            <View style={styles.sectionContainer}>
              <Button title="Open wallet" onPress={openWallet} />
            </View>
            <View style={styles.sectionContainer}>
              <Button title="Close wallet" onPress={closeWallet} />
            </View>
            <View style={styles.sectionContainer}>
              <Button title="Delete wallet" onPress={deleteWallet} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});

export default App;
