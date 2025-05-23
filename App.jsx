import React, { useEffect } from 'react';
import { View, Text, Platform, Button, Image } from 'react-native';
import { Link, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CodePush from 'react-native-code-push';

const Header = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={require('./src/assets/logo.jpg')} style={{height: 50, width: 50}}/>
        <View style={{flexDirection: 'row', gap: 10}}>
           <Link screen={DashboardScreen}>Dashboard</Link>
           <Link screen={FinancialScreen}>Financials</Link>
           <Link screen={HelpScreen}>Help</Link>
        </View>
    </View>
  )
}

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1 }}>
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight: '700', marginBottom: 20, fontSize: 40}}>Welcome to Draft App</Text>
        <Text style={{fontWeight: '700', marginBottom: 20}}>This is to test CodePush Implementation. Lets go ❤️❤️❤️</Text>
        <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </View>
  );
}

function HelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HelpScreen</Text>
      {/* <Text>Home Screen - {Platform.OS}</Text> */}
      {/* <Text>This is to test CodePush</Text>*/}
      <Button title="Go to Error" onPress={() => navigation.navigate('Error')} />
    </View>
  );
}

function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
        <Header />
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboard Screen</Text>
        <Text style={{fontWeight: '700'}}>This is to show you all about Draft 📉📊</Text>
        <Button title="Go to Financials" onPress={() => navigation.navigate('Financials')} />
      </View>
    </View>
  );
}

function FinancialScreen() {
  return (
  <View style={{ flex: 1 }}>
      <Header />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>FinancialScreen - 💸 💶 💷 💴</Text>
        <Text>This screen will give info about financials</Text>
      </View>
  </View>
  );
}

function ErrorScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{marginBottom: 10}}>
        <Text style={{color: "red"}}>Sidebar</Text>
      </View>
      <Text>ErrorScreen</Text>
      <Text>This should be a fallback to screen</Text>
      <Text>Oops! check your url</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {


CodePush.notifyAppReady();

CodePush.sync(
  {
    deploymentKey: "b9hzpL3kuwVpAfLCHn4tJ4cgtCDSN1gCDLN-fl",
    installMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: true,
  },
  status => {
    console.log('[CodePush] Sync status:', status);
  },
  progress => {
    console.log(`[CodePush] Download progress: ${progress.receivedBytes} of ${progress.totalBytes}`);
  }
);

CodePush.checkForUpdate("b9hzpL3kuwVpAfLCHn4tJ4cgtCDSN1gCDLN-fl")
  .then((update) => {
    if (update) {
      console.log('[CodePush] Update available:', update);
    } else {
      console.log('[CodePush] No updates found.');
    }
  })
  .catch((err) => {
    console.log('[CodePush] Error checking for update:', err);
  });


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Financials" component={FinancialScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: "a new update is available!"
}
};

export default CodePush(codePushOptions)(App);
 