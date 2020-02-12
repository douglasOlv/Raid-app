import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Onboarding_Intro from '~/components/screen/onboarding-intro';
import LoginStack from '~/components/screen/login/routes';
import MainStack from './mainStack';

const initialStack = createSwitchNavigator({
  Onboarding_Intro,
  LoginStack,
  MainStack
});

export default createAppContainer(initialStack);
