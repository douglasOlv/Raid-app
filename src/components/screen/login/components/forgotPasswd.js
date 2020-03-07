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
import * as Yup from 'yup';

import api from '~/service/api';
import appStyles from '~/styles';
import image from '~assets/images.png';

const forgotPasswd = props => (
  <KeyboardAvoidingView behavior='padding' style={style.container}>
    <View style={style.imageWrapper}>
      <Image source={image} style={style.image} />
      <Text style={style.textTitle}>Redefinir Senha</Text>
    </View>
    <View style={style.wrapper}>
      <View>
        <Text style={style.text}>
          Por favor informe o e-mail usado no cadastro. Enviaremos um link para
          redefinição de senha.
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        {props.errors.message && (
          <Text style={style.notification}>{props.errors.message}</Text>
        )}

        <InputCommun
          label={props.errors.email ? props.errors.email : 'E-mail'}
          secureTextEntry={false}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={props.values.email}
          setValue={text => {
            props.setFieldValue('email', text);
          }}
        />
        <TouchableOpacity style={style.button} onPress={props.handleSubmit}>
          {props.isSubmitting && <ActivityIndicator />}
          {!props.isSubmitting && <Text>Entrar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
);

export default withFormik({
  mapPropsToValues: () => ({ email: '', message: '' }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Digite um e-mail')
      .email('Digite um e-mail valido')
  }),
  validateOnChange: false,

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    const { email } = values;
    api
      .post('password/email', { email })
      .then(response => {
        setSubmitting(false);
        alert('verifique seu email');
      })
      .catch(erro => {
        console.log(erro);
        setSubmitting(false);
        setErrors({ message: 'E-mail não cadastrado' });
      });
  }
})(forgotPasswd);

style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.colors.primaryColor,
    paddingTop: appStyles.metrics.getHeightFromDP('5'),
    justifyContent: 'center'
  },
  wrapper: {
    width: appStyles.metrics.getWidthFromDP('90'),
    marginHorizontal: appStyles.metrics.getWidthFromDP('5'),
    height: appStyles.metrics.getHeightFromDP('35'),
    justifyContent: 'center'
  },
  button: {
    height: appStyles.metrics.getHeightFromDP('7%'),
    marginTop: appStyles.metrics.getHeightFromDP('3'),
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
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    textAlign: 'justify'
  },
  textTitle: {
    marginVertical: 5,
    fontFamily: 'CircularStd-Black',
    fontSize: 20,
    textAlign: 'justify'
  },
  notification: {
    color: appStyles.colors.red,
    fontFamily: 'Montserrat-Regular'
  }
});
