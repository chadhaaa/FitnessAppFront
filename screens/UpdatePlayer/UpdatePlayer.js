import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  Button,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import DropDownPicker from "react-native-dropdown-picker";

import { connect } from "react-redux";

const UpdatePlayer = ({ ...props }) => {
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionNumbers, setSessionNumbers] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [tel, setTel] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");
  const [scholar, setScholar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  // Operations on Competences
  const [comp, setComp] = useState([]);
  const [everyComp, setEveryComp] = useState([]);

  // Operations on Statistics
  const [stats, setStats] = useState([]);
  const [everyStat, setEveryStat] = useState([]);

  const { user } = props;

  const chooseCom = (value) => {
    setComp(value);
  };

  const chooseStat = (value) => {
    setStats(value);
  };

  const updateProfile = () => {
    const formdata = {
      sessionPrice: sessionPrice,
      sessionNumbers: sessionNumbers,
      firstname: firstname,
      lastname: lastname,
      tel: tel,
      height: height,
      weight: weight,
      country: country,
      scholar: scholar,
      // email: email,
      password: password,
      stats: stats,
      comp: comp,
      active: active,
    };

    axios.put(
      `http://192.168.1.197:8000/api/playerUpdate/${user._id}`,
      formdata
    );
  };

  // Getting All Competences
  useEffect(() => {
    if (loading2) {
      axios
        .get("http://192.168.1.197:8000/api/competences")
        .then((response) => {
          const newArray = response.data.map((item) => {
            return { key: item._id, value: item.name };
          });

          setEveryComp(newArray);
          setLoading2(false);
        });
    }
  }, [loading2]);

  // Getting All Statistics
  useEffect(() => {
    if (loading3) {
      axios
        .get(`http://192.168.1.197:8000/api/statistics/${user._id}`)
        .then((response) => {
          const newArray1 = response.data.map((item) => {
            return { key: item._id, value: item.title };
          });
          setEveryStat(newArray1);
          setLoading3(false);
        });
    }
  }, [loading3]);

  // Setting New Changes
  useEffect(() => {
    if (loading) {
      axios
        .get(`http://localhost:8000/api/viewProfile/${user._id}`)
        .then((res) => {
          console.log({ response: { ...res } });
          setSessionPrice(res.data.player.sessionPrice);
          setSessionNumbers(res.data.player.sessionNumbers);
          setFirstname(res.data.player.firstname);
          setLastname(res.data.player.lastname);
          setTel(res.data.player.tel);
          setHeight(res.data.player.height);
          setWeight(res.data.player.weight);
          setCountry(res.data.player.country);
          setScholar(res.data.player.scholar);
          // setEmail(res.data.player.email);
          setPassword(res.data.player.password);
          setActive(res.data.player.active);
          setComp(res.data.comp);
          setStats(res.data.stats);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [loading]);

  // Toggle Activity By Coach To Mark Player As Active Or Not
  const changeActivityPlayer = () => {
    setActive(!active);
  };

  return (
    <ScrollView>
      <View>
        <Text>Update Player Infos</Text>
        <TextInput
          value={firstname}
          placeholder="Firstname"
          onChangeText={(firstname) => setFirstname(firstname)}
        />
        <TextInput
          value={lastname}
          placeholder="Lastname"
          onChangeText={(lastname) => setLastname(lastname)}
        />
        {/* <TextInput
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        /> */}
        <TextInput
          value={tel}
          placeholder="Telephone Number"
          onChangeText={(tel) => setTel(tel)}
        />
        <TextInput
          value={height}
          placeholder="Height"
          onChangeText={(height) => setHeight(height)}
        />
        <TextInput
          value={weight}
          placeholder="Weight"
          onChangeText={(weight) => setWeight(weight)}
        />
        <TextInput
          value={scholar}
          placeholder="Scholar"
          onChangeText={(scholar) => setScholar(scholar)}
        />
        <TextInput
          value={country}
          placeholder="Country"
          onChangeText={(country) => setCountry(country)}
        />
        <TextInput
          value={sessionNumbers}
          placeholder="Number of Sessions"
          onChangeText={(sessionNumbers) => setSessionNumbers(sessionNumbers)}
        />
        <TextInput
          value={sessionPrice}
          placeholder="Price of Session"
          onChangeText={(sessionPrice) => setSessionPrice(sessionPrice)}
        />
        <View>
          <Text>Is this player active ?</Text>
          <Switch
            value={active}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={changeActivityPlayer}
          />
        </View>
        <Text>Choose Competence :</Text>
        <MultipleSelectList
          setSelected={chooseCom}
          data={everyComp}
          save="key"
          label="Categories"
        />
        <Text>Choose Statistic :</Text>
        <MultipleSelectList
          setSelected={chooseStat}
          data={everyStat}
          save="key"
          label="Categories"
        />

        <Button title="UpdatePlayer" onPress={updateProfile} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlayer);
