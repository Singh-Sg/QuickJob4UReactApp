import React from "react";
import { Header } from 'react-native-elements'
import { Image, TouchableOpacity, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createMaterialTopTabNavigator,
  SwitchNavigator,
  DrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";

import ProHome from "../screens/ProHome";
import WalletPro from "../screens/Professionals/Wallet";
import MyJobsPro from "../screens/Professionals/MyJobs";
import MessagesPro from "../screens/Professionals/Messages";
import ChatsPro from "../screens/Professionals/Messages/Chats";
import ProfilePro from "../screens/Professionals/Profile";
import EditProfilePro from "../screens/Professionals/EditProfile";
import ProProfile from "../screens/Customers/ProProfile";
import GiveQuote from "../screens/Professionals/GiveQuote";
import AboutMe from "../screens/Customers/ProProfile/AboutMe";
import ChangePassword from "../screens/Customers/ChangePassword";
import MyAlertsPro from "../screens/Professionals/MyAlerts";
import ViewJobPro from "../screens/Professionals/ViewJob";
import Directions from "../screens/Professionals/Directions";
import VerifiedBadge from "../screens/Professionals/VerifiedBadge";
import DocumentsList from "../screens/Professionals/DocumentsList";
import Testimony from "../screens/Professionals/Testimony";
import AddTestimony from "../screens/Professionals/AddTestimony";
import RatingsReviews from "../screens/Professionals/RatingsReviews";
import JobCalendar from "../screens/Professionals/JobCalendar";
import AddAppointment from "../screens/Professionals/AddAppointment";
import MyPlans from "../screens/Professionals/MyPlans";
import PlanHistory from "../screens/Professionals/MyPlans/PlanHistory";
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

renderCenterComponent = () => {
  return <Image
    style={{width: 30, height: 20}}
    source={require('../assets/images/aus_flag.png')}
  />
}

const SignedHeaderView = (navigation) => {
    return <Header
      outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center'}}
      innerContainerStyles={{alignItems: 'center'}}
      leftComponent={{ icon: 'menu', underlayColor: '#fb8519', color: '#fff', onPress: () => navigation.navigate('DrawerOpen') }}
      centerComponent={{ text: 'QuickJobs4U', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
      rightComponent={this.renderCenterComponent()}
    />
}

const HeaderView = (navigation) => {
  return <Header
    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e1919' }}
    outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center'}}
    innerContainerStyles={{alignItems: 'center'}}
    leftComponent={{ icon: 'menu', underlayColor: '#fb8519', color: '#fff', onPress: () => navigation.navigate('DrawerOpen') }}
    centerComponent={{ text: 'QuickJobs4U', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    rightComponent={{ icon: 'home', underlayColor: '#fb8519', color: '#fff' }}
  />
}
  
const PagesHeaderView = (navigation, title) => {
    return <Header
      outerContainerStyles={{width: '100%', backgroundColor: '#fb8519', justifyContent: 'center'}}
      innerContainerStyles={{alignItems: 'center'}}
      centerComponent={{ text: title, style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    />
}
  
  export const professionalHome = createStackNavigator({
    Home: {
      screen: ProHome,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: SignedHeaderView(navigation),
        headerTitle: 'QuickJobs4U',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519'
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
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    HelpFaq: {
      screen: HelpFaq,
      navigationOptions: ({ navigation }) => ({
        title: 'Help & Faq',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    /* HowItWorks: {
      screen: HowItWorks,
      navigationOptions: ({ navigation }) => ({
        title: 'How It Works',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }, */
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

export const professionalWallet = createStackNavigator({
  WalletPro: {
      screen: WalletPro,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Wallet'),
        headerTitle: 'Wallet',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519'
        }
      })
    }
})

export const professionalJobs = createStackNavigator({
    MyJobs: {
      screen: MyJobsPro,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'My Jobs'),
        headerTitle: 'My Jobs',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519'
        }
      })
    },
    ViewJobPro: {
      screen: ViewJobPro,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'View Job',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    Directions: {
      screen: Directions,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Direction',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    GiveQuote: {
      screen: GiveQuote,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Give Quote',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    ChatsPro: {
      screen: ChatsPro,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }
})
  
export const professionalMessages = createStackNavigator({
  MessagesPro: {
    screen: MessagesPro,
    navigationOptions: ({ navigation }) => ({
      //headerTitle: PagesHeaderView(navigation, 'Messages'),
        headerTitle: 'Messages',
        headerTitleStyle: {
          color: '#fff',
        },
      headerStyle: {
        elevation: 0,
        backgroundColor: '#fb8519'
      }
    })
  },
  ChatsPro: {
    screen: ChatsPro,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        elevation: 0,
        backgroundColor: '#fb8519',
        color: '#fff'
      },
      headerTintColor: "#fff"
    })
  }
})
export const CategoryTabs = createTabNavigator({
    Category: {
      screen: Category,
      navigationOptions: {
        tabBarLabel: "Category"
      }
    },
    DocumentsList: {
      screen: DocumentsList,
      navigationOptions: {
        tabBarLabel: "Documents List"
      }
    }
  },
  { 
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#f7f7f7',
      tabStyle: {
        backgroundColor: '#fb8519'
      },
      indicatorStyle: {
        backgroundColor: '#fa0000'
      },
      style: {
        backgroundColor: '#fb8519',
      }
    }
  })

export const professionalProfile = createStackNavigator({
  ProfilePro: {
      screen: ProfilePro,
      navigationOptions: ({ navigation }) => ({
        //headerTitle: PagesHeaderView(navigation, 'Profile'),
        headerTitle: 'Profile',
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519'
        }
      })
    },
    EditProfilePro: {
      screen: EditProfilePro,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Edit Profile',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    MyAlertsPro: {
      screen: MyAlertsPro,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'My Alerts',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
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
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    CategoryDocs: {
      screen: CategoryTabs,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Category and Documents',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    RatingsReviews: {
      screen: RatingsReviews,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Ratings And Reviews',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    Testimony: {
      screen: Testimony,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Testimony',
        headerRight: <TouchableOpacity onPress={() => navigation.push('AddTestimony')}>
          <View style={{marginRight: 10}}>
            <Icon name="add" size={30} color="#fff" />
          </View>
        </TouchableOpacity>,
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    AddTestimony: {
      screen: AddTestimony,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    JobCalendar: {
      screen: JobCalendar,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Job Calendar',
        headerRight: <TouchableOpacity onPress={() => navigation.push('AddAppointment')}>
          <View style={{marginRight: 10}}>
            <Icon name="add" size={30} color="#fff" />
          </View>
        </TouchableOpacity>,
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    AddAppointment: {
      screen: AddAppointment,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    MyPlans: {
      screen: MyPlans,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'My Plans',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    PlanHistory: {
      screen: PlanHistory,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Plan History',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    },
    VerifiedBadge: {
      screen: VerifiedBadge,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Verified Badge',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
      })
    }
  })