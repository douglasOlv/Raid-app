import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import InputCommun from '~/components/commun/InputCommun';
import { withFormik } from 'formik';
import api from '~/service/api';
import appStyles from '~/styles';
import image from '~assets/images.png';

const forgotPasswd = props => (
  <KeyboardAvoidingView behavior='padding' style={style.container}>
    <View style={style.imageWrapper}>
      <Image source={image} style={style.image} />
      <Text>Redefinir Senha</Text>
    </View>
    <View style={style.wrapper}>
      <Text>Por favor informe o e-mail usado no cadastro.</Text>
      <Text>Vamos mandar um e-mail de redefinição de senha.</Text>

      <InputCommun
        placeholder={'E-mail'}
        secureTextEntry={false}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={props.values.email}
        onChangeText={text => {
          props.setFieldValue('email', text);
        }}
      />
      <TouchableOpacity style={style.button} onPress={props.handleSubmit}>
        {props.isSubmitting && <ActivityIndicator />}
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
);

export default withFormik({
  mapPropsToValues: () => ({ email: '' }),

  handleSubmit: values => {
    api.post();
  }
})(forgotPasswd);

style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.colors.primaryColor,
    paddingTop: appStyles.metrics.getHeightFromDP('10'),
    justifyContent: 'space-between'
  },
  wrapper: {
    width: appStyles.metrics.getWidthFromDP('90'),
    marginHorizontal: appStyles.metrics.getWidthFromDP('5'),
    marginBottom: appStyles.metrics.getHeightFromDP('30')
  },
  button: {
    height: appStyles.metrics.getHeightFromDP('7%'),
    marginTop: appStyles.metrics.getHeightFromDP('0'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appStyles.colors.yellow,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  },
  imageWrapper: {
    marginVertical: appStyles.metrics.getHeightFromDP('5'),
    alignItems: 'center'
  },
  image: {
    height: 100,
    resizeMode: 'contain'
  }
});
