import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Modal,
  Alert,
  FlatList,
  Dimensions
} from 'react-native'
import styles from '../../../styles'
import pageStyle from './styles'
import { TextField, Button, ModalPopup, Check } from '../../../components'
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFormData, postFormData } from '../../../config/formHandler'
import StateManager from '../../StateManager';
const { width, height } = Dimensions.get('window');

export default class Category extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: 1,
      loading: true,
      user: false,
      documents: false,
      refreshing: false,
      extraData: false,
      categories: [],
      popupVisible: false,
      user: false,
      popUpCategories: [],
      activeCategories: false,
      selectedCategories: {
        categoryId: [],
        subCatId: [],
        subsubcatId: []
      },
      saveCategoryLoading: false
    }
  }

  popupCategories(category, subcategory, index, subIndex){
    const { categories } = this.state
    categories[index].JobSubCategories[subIndex].visible = categories[index].JobSubCategories[subIndex].visible ? false : true
    this.setState({
      categories
    })
  }

  closePopup(){
    this.setState({
      popupVisible: false
    })
  }

  componentWillMount(){
    StateManager.getInstance().setReceiver(this);
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      }, () => {
        this.getDocuments()
      })
    })
  }

  deleteAccreditations(id){
    Alert.alert(
      'Delete Document',
      'Do you want to delete this document?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {
          let data = {
            id,
            user_id: this.state.user.id
          }
          postFormData(data, 'deleteAccreditations', (response) => {
            this.getDocuments();
          })
        }},
      ],
      { cancelable: false }
    )
  }

  accreditationsData(item){
    return <View style={pageStyle.docListItem}>
      <View style={pageStyle.testimonyDetails}>
        <Text style={pageStyle.testimonyTitle}>{item.accreditation_id == "other" ? item.other : item.Accreditations.name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.provider_name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.ticket_name}</Text>
        <Text style={pageStyle.testimonyDetailsText}>{item.expiry_date}</Text>
      </View>
      <View style={pageStyle.actionView}>
        <TouchableOpacity onPress={() => this.deleteAccreditations(item.id)}>
          <Image source={require('../../../assets/images/testimony_delete.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('VerifiedBadge', {document: {
          id: item.id,
          accreditation: item.accreditation_id == "other" ? "other" : item.Accreditations.id,
          other_value: item.accreditation_id == "other" ? item.other : false,
          provider_name: item.provider_name,
          ticket_name: item.ticket_name,
          expiry_date: item.expiry_date,
          image: item.document ? this.state.extraData.img_Url+item.document : false
        }})}>
          <Image source={require('../../../assets/images/testimony_edit.png')} style={pageStyle.testimonyIcon} />
        </TouchableOpacity>
      </View>
    </View>
  }

  receiveData(data){
    console.log(data)
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getDocuments();
    })
  }

  getDocuments(){
    let data = {
      user_id: this.state.user.id
    }
    postFormData(data, 'UserAccreditations', (response) => {
      console.log(response)
      if(response){
        this.setState({
          loading: false,
          documents: response.data,
          refreshing: false,
          extraData: response
        })
      }else {
        this.setState({
          loading: false,
          refreshing: false
        })
      }
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('user', (err, result) => {
      result = JSON.parse(result)
      this.setState({
        user: result
      }, () => {
        this.getCategories()
      })
    })
  }

  getCategories(){
    let data = {
      user_id: this.state.user.id
    }
    getFormData('getCategories', (response) => {
      if(response){
        this.setState({
          categories: response
        })
      }else {
        this.setState({
          loading: false
        })
      }
    })
    postFormData(data, 'professionalCategoryInfo', (response) => {
      if(response){
        this.setState({
          activeCategories: response
        })
        for(var k in this.state.activeCategories.myCategory){
          this.state.selectedCategories.categoryId.push(this.state.activeCategories.myCategory[k])
        }
        for(var k in this.state.activeCategories.mySubCategory){
          this.state.selectedCategories.subCatId.push(this.state.activeCategories.mySubCategory[k])
        }
        for(var k in this.state.activeCategories.mySubSubCategory){
          this.state.selectedCategories.subsubcatId.push(this.state.activeCategories.mySubSubCategory[k])
        }
        this.setState({
          loading: false,
          selectedCategories: this.state.selectedCategories
        })
        console.log(this.state.selectedCategories)
        console.log(this.state.activeCategories)
      }
    })
  }

  selectCategory(level, id){
    const { selectedCategories } = this.state;
    if(selectedCategories[level].includes(id)){
      let index = selectedCategories[level].indexOf(id);
      if (index > -1) {
        selectedCategories[level].splice(index, 1);
      }
    }else {
      selectedCategories[level].push(id)
    }
    this.setState(
      selectedCategories
    )
  }

  saveCategories(){
    let data = {
      user_id: this.state.user.id,
      categoryId: this.state.selectedCategories.categoryId,
      subCatId: this.state.selectedCategories.subCatId,
      subsubcatId: this.state.selectedCategories.subsubcatId
    }
    console.log(data)
    this.setState({
      saveCategoryLoading: true
    })
    postFormData(data, 'professionalCategory', (response) => {
      if(response){
        this.setState({
          saveCategoryLoading: false
        })
      }else {
        this.setState({
          saveCategoryLoading: false
        })
      }
    })
  }

  changeTab(index){
    this.setState({
      activeTab: index
    })
  }

  render() {
    const { categories, popupVisible, popUpCategories, selectedCategories } = this.state;
    if(this.state.loading){
      return <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={styles.scrollViewContainer}>
        <View style={pageStyle.tabView}>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(1)}>
            <View style={[pageStyle.tab, this.state.activeTab == 1 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>CATEGORY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={pageStyle.tab} onPress={() => this.changeTab(2)}>
            <View style={[pageStyle.tab, this.state.activeTab == 2 ? pageStyle.activeTab : {}]}>
              <Text style={pageStyle.tabText}>DOCUMENTS LIST</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.activeTab == 1 && <View style={styles.container}>
          {categories.length > 0 && <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <View style={pageStyle.listing}>
              {categories.map((category, index) => {
              return <View style={pageStyle.listItem}>
                  <View style={pageStyle.mainCatView}>
                    <Check checked={selectedCategories['categoryId'].length > 0 ? selectedCategories['categoryId'].includes(category.id) ? true : false : false} style={pageStyle.mainCatText} checkedColor="#fb8519" text={category.category_name} onPress={() => this.selectCategory('categoryId', category.id)} />
                    <Icon name="keyboard-arrow-down" size={20} color="#000" />
                  </View>
                  <View style={pageStyle.subCatView}>
                    {category.JobSubCategories.map((subCategory, subIndex) => {
                      return <TouchableOpacity onPress={() => this.popupCategories(category, subCategory, index, subIndex)}>
                        <View style={pageStyle.subCatlistItem}>
                          <Check checked={selectedCategories['subCatId'].length > 0 ? selectedCategories['subCatId'].includes(subCategory.id) ? true : false : false} checkedColor="#fb8519" text={subCategory.sub_category_name} onPress={() => this.selectCategory('subCatId', subCategory.id)} />
                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={subCategory.visible ? true : false}>
                            <View style={pageStyle.popUpMainView}>
                              <View style={pageStyle.popUpContentView}>
                                <TouchableOpacity style={pageStyle.closeIconView} onPress={() => this.popupCategories(category, subCategory, index, subIndex)}>
                                  <View style={pageStyle.closeIconView}>
                                    <Icon name="clear" size={15} color="#cf2525" />
                                  </View>
                                </TouchableOpacity>
                                <ScrollView style={pageStyle.popupView} behavior="height">
                                  <Text style={pageStyle.popupHeading}>{subCategory.sub_category_name}</Text>
                                  <View style={pageStyle.popupListing}>
                                    {subCategory.JobSubSubCategories.map((subsubCategory, index) => {
                                      return <View style={pageStyle.popupListItem}>
                                        <Check checked={selectedCategories['subsubcatId'].length > 0 ? selectedCategories['subsubcatId'].includes(subsubCategory.id) ? true : false : false} checkedColor="#fb8519" round text={subsubCategory.sub_sub_name} onPress={() => this.selectCategory('subsubcatId', subsubCategory.id)} />
                                      </View>
                                    })}
                                  </View>
                                </ScrollView>
                              </View>
                            </View>
                          </Modal>
                        </View>
                      </TouchableOpacity>
                    })}
                  </View>
                </View>
              })}
            </View>
          </ScrollView>}
        </View>}
        {this.state.activeTab == 2 && <View style={[styles.container, {padding: 20, width}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.documents}
            renderItem={({item}) => 
              this.accreditationsData(item)
            }
            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
          <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} text="Add More" onPress={() => this.props.navigation.push('VerifiedBadge')} />
        </View>}
        {this.state.activeTab == 1 && <Button containerStyle={pageStyle.submitButton} style={{backgroundColor: '#fb8519', paddingVertical: 10}} loading={this.state.saveCategoryLoading} text="SAVE" onPress={() => this.saveCategories()} />}
      </View>
    );
  }
}