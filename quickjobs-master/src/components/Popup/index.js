import React, { Component } from 'react';
import { Modal, View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import styles from './styles'
import Icon from "react-native-vector-icons/MaterialIcons";

const {width, height} = Dimensions.get('window')

export class ModalPopup extends Component {
  render() {
    let { close, overlayStyle, visible, innerStyle } = this.props;
    return <Modal
    animationType={'fade'}
    transparent={true}
    visible={visible}>
      <View style={[styles.overlay, overlayStyle]}>
        <View style={[styles.innerContent, innerStyle]}>
          {close && <TouchableOpacity style={styles.closeIconView} onPress={close}>
            <View style={styles.closeIconView}>
              <Icon name="clear" size={15} color="#cf2525" />
            </View>
          </TouchableOpacity>}
          {this.props.content()}
        </View>
      </View>
    </Modal>;
  }
}