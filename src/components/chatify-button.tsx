import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

interface ButtonProps {
  onPress?: () => void;
  name?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: number;
  edit?: boolean;
  label?: string;
  thumbColor?: boolean;
  onValueChange?: () => void;
  value?: boolean;
  className?: string;
  disabled?: boolean;
}

export const ButtonToTop = ({onPress}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: '#FF0000',
          borderRadius: 999, // Large value to make it a circle
          padding: 8,
        }}></View>
    </TouchableOpacity>
  );
};

export const SubmitButton = ({
  onPress,
  name,
  color,
  borderColor,
  borderRadius,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={`w-full rounded-lg py-4 ${
        disabled ? 'bg-[#BFD7ED]' : 'bg-[#60A3D9]'
      }`}
      onPress={onPress}>
      <Text className="text-center text-white font-bold">{name}</Text>
    </TouchableOpacity>
  );
};
