import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Keyboard, ImageSourcePropType} from "react-native";
import { Header, Image, Button, Icon, Card } from "react-native-elements";
import * as Colors from "../styles/Colors";
import * as Spacing from "../styles/Spacing";
import { Props } from "../types";
import { useTypedDispatch, useTypedSelector } from "../store";
import { addDraft, newDraft, selectAllDrafts, editDraft } from "../store/modules/Drafts";
import { useEffect } from "react";

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  bigImage: {
    width: 300,
    height: 300,
    borderTopLeftRadius: 300/16,
    borderTopRightRadius: 300/16,
  },
  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 90/16,
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    paddingHorizontal: 175,
  },
  bigCardContainer:{
    padding: -10,
    borderTopEndRadius: 300/16,
    borderTopStartRadius: 300/16,
    shadowColor: Colors.GRAY,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  smallCardContainer:{
    padding: -10,
    borderRadius: 90/16,
    shadowColor: Colors.GRAY,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginHorizontal: 7,
  },
  titleText:{
    ...Spacing.paddingVertical,
    fontSize: 24,
    fontWeight: "500",
  },
  bigCardWrapper: {
    marginRight: -1,
    marginBottom: -1,
  },
  smallCardWrapper: {
    marginRight: -1,
    marginBottom: -1,
  },
  informationText: {
    ...Spacing.paddingVertical,
    ...Spacing.largePaddingHorizontal,
    fontSize: 24,
    fontWeight: "500",
  },
  textInput: {
    ...Spacing.largePaddingHorizontal,
    fontSize: 18,
    backgroundColor: "white",
  },
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
    left: 20,
    top: 20,
    width: 40,
    height: 40,
  },
});

export default function DraftScreen({ route, navigation }: Props) {
  const [gallery, setGallery] = useState([["default", "default"]]);
  const exampleImages = [["https://avatars.githubusercontent.com/u/55298934?v=4", "https://avatars.githubusercontent.com/u/26285351?v=4"], ["https://avatars.githubusercontent.com/u/55298934?v=4", "https://avatars.githubusercontent.com/u/26285351?v=4", "https://avatars.githubusercontent.com/u/26285351?v=4"]]
  
  const dispatch = useTypedDispatch();
  const pendingDraft = useTypedSelector((state) => state.drafts.pendingDraft);
  const draftError = useTypedSelector((state) => state.drafts.error);
  const allDrafts = useTypedSelector((state) => selectAllDrafts(state.drafts));

  if (pendingDraft === undefined) {
    if (allDrafts[0] === undefined) {
      dispatch(newDraft(0))
    }
    else {
      dispatch(newDraft(allDrafts[allDrafts.length - 1].id + 1))
    }
  }

  useEffect(() => {
    if (draftError) {
      alert(draftError.message);
    }
  }, [draftError]);

  return (
    <>
      <ScrollView style={Styles.background}>
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Card containerStyle={Styles.bigCardContainer} wrapperStyle={Styles.bigCardWrapper}> 
            <Card.Image source={pendingDraft?.thumbnail || {uri: "default"}} style={Styles.bigImage}>
            </Card.Image>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <Text style={Styles.titleText}>{pendingDraft?.name || ""}</Text>
            </View>
          </Card>
        </View>
        {gallery.map((uris:String[], i:any) => 
          <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}} key={i}>
            {i == 0 && (
              <Card containerStyle={Styles.smallCardContainer} wrapperStyle={Styles.smallCardWrapper} key={0}> 
                <Card.Image source={{uri: "default"}} style={Styles.smallImage} />
                <TouchableOpacity
                  style={[Styles.singleButton, { backgroundColor: Colors.DARK_RED}]}
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate("Camera");
                  }}
                  activeOpacity={0.85}
                >
                  <View style={{ width: 30, height: 30, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}} >
                    <Icon
                      name="add"
                      size={30}
                      color={Colors.WHITE}
                    />
                  </View>
                </TouchableOpacity>
              </Card>
            )}
            {uris.map((uri: String, x:any) => 
              <Card containerStyle={Styles.smallCardContainer} wrapperStyle={Styles.smallCardWrapper} key={x}> 
                <Card.Image source={{uri: String(uri)}} style={Styles.smallImage} />
                {uri === "default" && (
                  <TouchableOpacity
                    style={[Styles.singleButton, { backgroundColor: Colors.DARK_RED}]}
                    onPress={() => {
                      Keyboard.dismiss();
                      navigation.navigate("Camera");
                    }}
                    activeOpacity={0.85}
                  >
                    <View style={{ width: 30, height: 30, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}} >
                      <Icon
                        name="add"
                        size={30}
                        color={Colors.WHITE}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                  <TouchableOpacity
                    style={[Styles.singleButton, { backgroundColor: Colors.WHITE}]}
                    onPress={() => {
                      Keyboard.dismiss();
                      alert("delete");
                    }}
                    activeOpacity={0.85}
                  >
                    <View style={{ width: 30, height: 30, borderRadius: 14, alignItems: 'center', justifyContent: 'center'}} >
                      <Icon
                        name="close"
                        size={30}
                        color={Colors.DARK_RED}
                      />
                    </View>
                  </TouchableOpacity>
              </Card>
            )}
          </View>
        )}
        <View style={{margin: 10}}></View>
        <Text style={Styles.informationText}>CATEGORY</Text>
        <TextInput 
          style={Styles.textInput}
          placeholder="Category" 
          value={pendingDraft?.category || ""}
          onChangeText={text => {
            let changedDraft = {...pendingDraft}
            changedDraft.category = text
            dispatch(editDraft(changedDraft))
          }}
        />
        <Text style={Styles.informationText}>DESCRIPTION</Text>
        <TextInput 
          style={Styles.textInput}
          placeholder="Description" 
          value={pendingDraft?.description || ""}
          onChangeText={text => {
            let changedDraft = {...pendingDraft}
            changedDraft.description = text
            dispatch(editDraft(changedDraft))
          }}
          multiline
        />
      </ScrollView>
    </>
  );
}