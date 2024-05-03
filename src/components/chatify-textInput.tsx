import React from 'react';
import {TextInput, TextInputProps, StyleSheet, ViewStyle} from 'react-native';

interface DynamicTextInputProps extends TextInputProps {
  inputStyle?: ViewStyle;
}

const DynamicTextInput: React.FC<DynamicTextInputProps> = ({
  inputStyle,
  ...props
}) => {
  return <TextInput {...props} style={[styles.input, inputStyle]} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default DynamicTextInput;
