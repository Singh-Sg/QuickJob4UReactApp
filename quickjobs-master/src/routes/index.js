import React from "react";
import { Platform, StatusBar, View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import SideMenu from '../components/Sidemenu';
import ProSidemenu from '../components/ProSidemenu';
import AboutUs from "../screens/Customers/AboutUs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Header } from 'react-native-elements'
import CalendarView from "../screens/Calendar";
import Login from "../screens/Login";
import CustomerRegister from "../screens/CustomerRegister";
import ProfessionalRegister from "../screens/ProfessionalRegister";
import OTPView from "../screens/OTP";
import ForgotPassword from "../screens/Forgot";
import ResetPassword from "../screens/ResetPassword";
import Home from "../screens/Home";
import WalletPro from "../screens/Professionals/Wallet";
import HowItWorks from "../screens/HowItWorks";
import ProHowItWorks from "../screens/ProHowItWorks";
const { width, height } = Dimensions.get('window');

import { customerHome, customerJobs, customerMessages, customerProfile, customerWallet } from './customer'
import { professionalHome, professionalJobs, professionalMessages, professionalProfile, professionalWallet, CategoryTabs } from './professionals'
import ProHome from "../screens/ProHome";
import MyJobsPro from "../screens/Professionals/MyJobs";
import MessagesPro from "../screens/Professionals/Messages";
import ProfilePro from "../screens/Professionals/Profile";
import EditProfilePro from "../screens/Professionals/EditProfile";
import Career from "../screens/Customers/Career";
import NewJob from "../screens/Customers/NewJob";
import ContactUs from "../screens/Customers/ContactUs";
import HelpFaq from "../screens/Customers/HelpFaq";
import ViewJobPro from "../screens/Professionals/ViewJob";
import Directions from "../screens/Professionals/Directions";
import GiveQuote from "../screens/Professionals/GiveQuote";
import ProProfile from "../screens/Customers/ProProfile";
import AboutMe from "../screens/Customers/ProProfile/AboutMe";
import ChatsPro from "../screens/Professionals/Messages/Chats";
import VerifiedBadge from "../screens/Professionals/VerifiedBadge";
import MyPlans from "../screens/Professionals/MyPlans";
import AddAppointment from "../screens/Professionals/AddAppointment";
import JobCalendar from "../screens/Professionals/JobCalendar";
import AddTestimony from "../screens/Professionals/AddTestimony";
import Testimony from "../screens/Professionals/Testimony";
import RatingsReviews from "../screens/Professionals/RatingsReviews";
import ChangePassword from "../screens/Customers/ChangePassword";
import MyAlertsPro from "../screens/Professionals/MyAlerts";
import PlanHistory from "../screens/Professionals/MyPlans/PlanHistory";
import Accomplishments from "../screens/Customers/ProProfile/Accomplishments";
import ProTestimony from "../screens/Customers/ProProfile/Testimony";
import AddReview from "../screens/Customers/ProProfile/RatingsReviews/AddReview";
import ProRatingsReviews from "../screens/Customers/ProProfile/RatingsReviews";
import VideoPlayer from "../screens/Customers/ProProfile/VideoPlayer";
import Chats from "../screens/Customers/Messages/Chats";
import ViewJob from "../screens/Customers/ViewJob";
import MyAlerts from "../screens/Customers/MyAlerts";
import EditProfile from "../screens/Customers/EditProfile";
import Wallet from "../screens/Customers/Wallet";
import MyJobs from "../screens/Customers/MyJobs";
import Messages from "../screens/Customers/Messages";
import Profile from "../screens/Customers/Profile";
import Category from "../screens/Professionals/Category";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

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

const ContentPageHeaderView = (navigation, title) => {
  return <Header
    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e1919' }}
    outerContainerStyles={{width: '100%', backgroundColor: '#cf2525', justifyContent: 'center'}}
    innerContainerStyles={{alignItems: 'center'}}
    leftComponent={{ icon: 'menu', underlayColor: '#cf2525', color: '#fff', onPress: () => navigation.navigate('DrawerOpen') }}
    centerComponent={{ text: title, style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
  />
}

const SignedHeaderView = (navigation) => {
  return <Header
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

const TabScreen = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={30} color={tintColor} />
          )
        }
      }
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        tabBarLabel: "Wallet",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-balance-wallet" size={30} color={tintColor} />
        )
      }
    },
    MyJobs: {
      screen: MyJobs,
      navigationOptions: {
        tabBarLabel: "My Jobs",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="local-library" size={30} color={tintColor} />
        )
      }
    },
    Message: {
      screen: Messages,
      navigationOptions: {
        tabBarLabel: "Message",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="mail" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      activeTintColor: '#cf2525',
      inactiveTintColor: '#757575',
      tabStyle: {
        backgroundColor: '#fff',
        paddingBottom: 0,
        paddingTop: 0
      },
      labelStyle: {
        fontSize: 8,
        marginTop: 0
      },
      indicatorStyle: {
        height: 0
      },
      iconStyle: {
        marginBottom: 0
      },
      style: {
        backgroundColor: '#fff',
      }
    }
  }
)

const ProfessionalTabScreen = createBottomTabNavigator(
  {
    Home: {
      screen: ProHome,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
        headerLeft: <View style={{marginLeft: 20}}><TouchableOpacity onPress={() => navigation.openDrawer()}><Icon name="menu" color="#fff" size={25} /></TouchableOpacity></View>,
        headerRight: <View style={{marginRight: 20}}>
          <Image
            style={{width: 30, height: 20}}
            source={require('../assets/images/aus_flag.png')}
          />
        </View>
      }
    },
    Wallet: {
      screen: WalletPro,
      navigationOptions: {
        tabBarLabel: "Wallet",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="account-balance-wallet" size={30} color={tintColor} />
        )
      }
    },
    MyJobs: {
      screen: MyJobsPro,
      navigationOptions: {
        tabBarLabel: "My Jobs",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="local-library" size={30} color={tintColor} />
        )
      }
    },
    Message: {
      screen: MessagesPro,
      navigationOptions: {
        tabBarLabel: "Message",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="mail" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfilePro,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      activeTintColor: '#fb8519',
      inactiveTintColor: '#757575',
      tabStyle: {
        backgroundColor: '#fff',
        paddingBottom: 0,
      },
      labelStyle: {
        fontSize: 8,
        marginTop: Platform.OS == 'android' ? 0 : 0
      },
      indicatorStyle: {
        height: 0
      },
      iconStyle: {
        marginBottom: 0
      },
      style: {
        backgroundColor: '#fff',
      }
    }
  }
)

export const SignedInStack = createStackNavigator(
  {
    Home: {
      screen: TabScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
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
        title: 'Forgot Password',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#cf2525',
          color: '#fff'
        },
        headerTintColor: "#fff"
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
    }
  }, {
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: '#cf2525',
        color: '#fff'
      },
      headerTintColor: "#fff"
    }
  }
)

export const SignedIn = createDrawerNavigator(
  {
    Home: {
      screen: SignedInStack
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: 300
  }
)

export const SignedInProStack = createStackNavigator(
  {
    Home: {
      screen: ProfessionalTabScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
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
    ProHowItWorks: {
      screen: ProHowItWorks,
      navigationOptions: ({ navigation }) => ({
        title: 'How It Works',
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
    SignIn: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: ({ navigation }) => ({
        title: 'Forgot Password',
        headerStyle: {
          elevation: 0,
          backgroundColor: '#fb8519',
          color: '#fff'
        },
        headerTintColor: "#fff"
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
      screen: Category,
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
  }, {
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: '#fb8519',
        color: '#fff'
      },
      headerTintColor: "#fff"
    }
  }
)

export const SignedInPro = createDrawerNavigator(
  {
    Home: {
      screen: SignedInProStack
    }
  }, {
    contentComponent: ProSidemenu,
    drawerWidth: 300
  }
)


export const SignedOutStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null
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
    }
  }, {
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        backgroundColor: '#cf2525',
        color: '#fff'
      },
      headerTintColor: "#fff"
    }
  }
)

export const SignedOut = createDrawerNavigator(
  {
    Home: {
      screen: SignedOutStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color={tintColor} />
        )
      }
    }
  }, {
    tabBarVisible: false,
    contentComponent: SideMenu,
    drawerWidth: 260
  }
)

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedInPro: {
        screen: SignedInPro
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn == 'customer' ? "SignedIn" : signedIn == 'professionals' ? "SignedInPro" : "SignedOut"
    }
  );
};