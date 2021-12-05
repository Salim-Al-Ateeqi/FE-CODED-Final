import React, { useState } from "react";
import IntlPhoneInput from "react-native-intl-phone-input";
import { Container, View } from "native-base";
import styles from "../styles";

const Signup = () => {
  const [number, setNumber] = useState();
  return (
    <View style={styles.background}>
      <Container style={styles.signupContainer}>
        <IntlPhoneInput
          flagStyle={{ fontSize: 15 }}
          containerStyle={{
            height: 50,
            marginTop: 100,
            borderRadius: 10,
            borderBottomColor: "#D1D3D4",
          }}
          phoneInputStyle={{
            lineHeight: 18,
            //   textAlign: i18nStore.language === "en" ? "left" : "right",
          }}
          // onChangeText={phoneChange}
          defaultCountry="KW"
          //   modalCountryItemCountryNameStyle={{ fontFamily: "Cairo" }}
        />
      </Container>
    </View>
  );
};

export default Signup;
