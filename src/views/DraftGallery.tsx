import React from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Keyboard} from "react-native";
import { Icon} from "react-native-elements";
import CardCarousel from "../common/CardCarousel";
import * as Colors from "../styles/Colors";
import * as Spacing from "../styles/Spacing";
import { useTypedSelector, useTypedDispatch} from "../store";
import { selectAllDrafts, newDraft, addDraft } from "../store/modules/Drafts";
import { Draft, Props } from "../types";

const Styles = StyleSheet.create({
  singleButton: {
    margin: 40,
    backgroundColor: 'transparent',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
    position: "absolute",
    right: -10,
    bottom: 0,
    width: 50,
    height: 50,
  },
});

export default function DraftGalleryScreen({ route, navigation }: Props) {
  const allDrafts = useTypedSelector((state) => selectAllDrafts(state.drafts));

  return (
    <>
      <View style={{paddingTop: 50}}>
        <CardCarousel drafts={allDrafts} />
      </View>
      <TouchableOpacity
        style={[Styles.singleButton, { backgroundColor: Colors.DARK_RED}]}
        onPress={() => {
          Keyboard.dismiss();
          navigation.navigate("Draft");
        }}
        activeOpacity={0.85}
      >
        <View style={{ width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}} >
          <Icon
            name="add"
            size={40}
            color={Colors.WHITE}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};