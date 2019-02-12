import React from "react";
import { Header } from 'react-native-elements'
import { Image, View, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  SwitchNavigator,
  DrawerNavigator,
  SafeAreaView
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "../screens/Home";
import Wallet from "../screens/Customers/Wallet";
import MyJobs from "../screens/Customers/MyJobs";
import Messages from "../screens/Customers/Messages";
import Chats from "../screens/Customers/Messages/Chats";
import Profile from "../screens/Customers/Profile";
import EditProfile from "../screens/Customers/EditProfile";
import ProProfile from "../screens/Customers/ProProfile";
import ProRatingsReviews from "../screens/Customers/ProProfile/RatingsReviews";
import AddReview from "../screens/Customers/ProProfile/RatingsReviews/AddReview";
import ProTestimony from "../screens/Customers/ProProfile/Testimony";
import AboutMe from "../screens/Customers/ProProfile/AboutMe";
import Accomplishments from "../screens/Customers/ProProfile/Accomplishments";
import ChangePassword from "../screens/Customers/ChangePassword";
import MyAlerts from "../screens/Customers/MyAlerts";
import ViewJob from "../screens/Customers/ViewJob";
import VerifiedBadge from "../screens/Customers/VerifiedBadge";
import NewJob from "../screens/Customers/NewJob";
import Career from "../screens/Customers/Career";
import Category from "../screens/Professionals/Category";
import Login from "../screens/Login";
import ForgotPassword from "../screens/Forgot";
import ResetPassword from "../screens/ResetPassword";
import OTPView from "../screens/OTP";
import CustomerRegister from "../screens/CustomerRegister";
import ProfessionalRegister from "../screens/ProfessionalRegister";
import AboutUs from "../screens/Customers/AboutUs";
import ContactUs from "../screens/Customers/ContactUs";
import HelpFaq from "../screens/Customers/HelpFaq";
import HowItWorks from "../screens/HowItWorks";
import VideoPlayer from "../screens/Customers/ProProfile/VideoPlayer";

renderCenterComponent = () => {
  return <Image
    style={{width: 30, height: 20}}
    source={require('../assets/images/aus_flag.png')}
  />
}

const SignedHeaderView = (navigation) => {
    return <SafeAreaView style={{flex: 1}} forceInset={{ bottom: 'never' }}><Header
      outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center'}}
      innerContainerStyles={{alignItems: 'center'}}
      leftComponent={{ icon: 'menu', underlayColor: '#cf2525', color: '#fff', onPress: () => navigation.navigate('DrawerOpen') }}
      centerComponent={{ text: 'QuickJobs4U', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
      rightComponent={this.renderCenterComponent()}
    /></SafeAreaView>
}

const HeaderView = (navigation) => {
  return <Header
    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e1919' }}
    outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center'}}
    innerContainerStyles={{alignItems: 'center'}}
    leftComponent={{ icon: 'menu', underlayColor: '#cf2525', color: '#fff', onPress: () => navigation.navigate('DrawerOpen') }}
    centerComponent={{ text: 'QuickJobs4U', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    rightComponent={{ icon: 'home', underlayColor: '#cf2525', color: '#fff' }}
  />
}
  
const PagesHeaderView = (navigation, title) => {
    return <Header
      outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center'}}
      innerContainerStyles={{alignItems: 'center'}}
      centerComponent={{ text: title, style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    />
}
  
  export const customerHome = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: SignedHeaderView(navigation),
        headerTitle: 'QuickJobs4U',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
        },
        headerLeft: <View style={{marginLeft: 20}}><TouchableOpacity onPress={() => navigation.openDrawer()}><Icon name="menu" color="#fff" size={25} /></TouchableOpacity></View>,
        headerRight: <View style={{marginRight: 20}}>
          <Image
            style={{width: 30, height: 20}}
            source={require('../assets/images/aus_flag.png')}
          />
        </View>
      })
    },
    Career: {
      screen: Career,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Careers',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    NewJob: {
      screen: NewJob,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Create a Job',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    AboutUs: {
      screen: AboutUs,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ContactUs: {
      screen: ContactUs,
      navigationOptions: ({ navigation }) => ({
        title: 'Contact Us',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    HelpFaq: {
      screen: HelpFaq,
      navigationOptions: ({ navigation }) => ({
        title: 'Help & FAQ',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    HowItWorks: {
      screen: HowItWorks,
      navigationOptions: ({ navigation }) => ({
        title: 'How It Works',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    SignIn: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    OTP: {
      screen: OTPView,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    CustomerSignUp: {
      screen: CustomerRegister,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ProSignUp: {
      screen: ProfessionalRegister,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
})

export const customerWallet = createStackNavigator({
    Wallet: {
      screen: Wallet,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Wallet'),
        headerTitle: 'Wallet',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525'
        }
      })
    }
})

export const customerJobs = createStackNavigator({
    MyJobs: {
      screen: MyJobs,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'My Jobs'),
        headerTitle: 'My Jobs',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525'
        }
      })
    },
    ViewJob: {
      screen: ViewJob,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'View Job',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    Chats: {
      screen: Chats,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ProProfile: {
      screen: ProProfile,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    VideoPlayer: {
      screen: VideoPlayer,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerTitle: 'Video Player',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ProRatingsReviews: {
      screen: ProRatingsReviews,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Review & Rating',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    AddReview: {
      screen: AddReview,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Add Your Review',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ProTestimony: {
      screen: ProTestimony,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Testimonies',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    AboutMe: {
      screen: AboutMe,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'About Me',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    Accomplishments: {
      screen: Accomplishments,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'My Accomplishments',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }
})
  
export const customerMessages = createStackNavigator({
    Messages: {
      screen: Messages,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Messages'),
        headerTitle: 'Messages',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525'
        }
      })
    },
    Chats: {
      screen: Chats,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }
})

export const CategoryTabs = createBottomTabNavigator({
    Category: {
      screen: Category,
      navigationOptions: {
        tabBarLabel: "Category"
      }
    },
    VerifiedBadge: {
      screen: VerifiedBadge,
      navigationOptions: {
        tabBarLabel: "Verified Badge"
      }
    }
  },
  { 
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#f7f7f7',
      tabStyle: {
        backgroundColor: '#cf2525'
      },
      indicatorStyle: {
        backgroundColor: '#fff'
      },
      style: {
        backgroundColor: '#cf2525',
      }
    }
  })

export const customerProfile = createStackNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Profile'),
        headerTitle: 'Profile',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525'
        }
      })
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Edit Profile',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    MyAlerts: {
      screen: MyAlerts,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'My Alerts',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Change Password',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    CategoryDocs: {
      screen: CategoryTabs,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Category and Documents'),
        headerTitle: 'Category and Documents',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }
  })




  /*



export const SignedOut = createStackNavigator({
  CustomerSignUp: {
    screen: CustomerRegister,
    navigationOptions: ({ navigation }) => ({
      title: "Sign Up",
      headerTitle: HeaderView(navigation)
    })
  },
  ProSignUp: {
    screen: ProfessionalRegister,
    navigationOptions: ({ navigation }) => ({
      title: "Sign Up",
      headerTitle: HeaderView(navigation)
    })
  },
  SignIn: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: "Sign In",
      headerTitle: HeaderView(navigation)
    })
  }
}, {
  headerMode: 'none'
});

*/