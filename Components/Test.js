// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing } from 'react-native'
import HelloWorld from './HelloWorld'

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          /* speed: 4,
          bounciness: 30 */
          tension: 4,
          friction: 30
        }
      ),
      Animated.timing(
        this.state.topPosition,
        {
          toValue: 0,
          duration: 3000,
          easing: Easing.liner
        })
    ]).start()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <HelloWorld />
        <Animated.View
          style={[styles.subview_container, { top: this.state.topPosition }]}>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'blue'
      },
      android: {
        backgroundColor: 'red'
      }
    }),
    backgroundColor: Platform.os === 'ios' ? 'red' : 'blue',
    width: 100,
    height: 100
  }
})

export default Test
