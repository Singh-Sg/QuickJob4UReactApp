import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput
} from 'react-native'
import styles from './styles'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export class TextFieldAddress extends Component {
  render() {
    const { style, inputStyle, label, onPress, value, required } = this.props
    return (
      <View style={[styles.inputView, style]}>
        {label && <Text style={styles.label}>{label} {required &&<Text style={{color: '#cf2525'}}>*</Text>}</Text>}
        <GooglePlacesAutocomplete
          minLength={2}
          //text={value}
          placeholder={value}
          placeholderTextColor="#000"
          autoFocus={false}
          returnKeyType={'search'}
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={onPress}
          getDefaultValue={() => ''}
          listViewDisplayed='false'
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            //key: 'AIzaSyCosysxYqg1GUdjYlyFGup59xNW9WhSdw4',
            key: 'AIzaSyDsOkfAQs7NOihFKhPBxEzjNFmpltXo8G4',
            language: 'en',
            components: 'country:aus',
            //types: '(cities)' // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: '#fff',
              borderTopWidth: 0,
              height: 36
            },
            textInput: {
              paddingLeft: 0,
              marginLeft: 0,
              paddingVertical: 2,
              marginVertical: 2,
              marginTop: 0,
              marginRight: 0,
              fontSize: 14,
              height: 36
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation={false}
          //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        />
      </View>
    );
  }
}