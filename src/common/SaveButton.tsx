import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import * as Colors from "../styles/Colors";
import { useTypedDispatch, useTypedSelector } from "../store";
import { newDraft, selectAllDrafts, addDraft, emptyDraft } from "../store/modules/Drafts";

export default function SaveButton() {
  const navigation = useNavigation();
  const dispatch = useTypedDispatch();
  const pendingDraft = useTypedSelector((state) => state.drafts.pendingDraft);

  return (
    <View>
      <Icon name="save" onPress={() => {
        if (!pendingDraft) return;
        dispatch(addDraft(pendingDraft));
        dispatch(emptyDraft(1))
        navigation.navigate("DraftGallery");
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
});