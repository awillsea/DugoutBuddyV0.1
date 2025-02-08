import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export function AuthInput(props: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300 equivalent
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
