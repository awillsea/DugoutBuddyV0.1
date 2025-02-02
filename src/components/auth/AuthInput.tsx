import { TextInput, TextInputProps } from 'react-native';

export function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      className="border border-gray-300 rounded-lg p-3 mb-4"
      autoCapitalize="none"
      {...props}
    />
  );
}
