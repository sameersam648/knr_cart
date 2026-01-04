import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';
import { useState } from 'react';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    containerClassName?: string;
}

export function Input({
    className,
    label,
    error,
    icon,
    containerClassName,
    onFocus,
    onBlur,
    style: customStyle,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                error && styles.inputWrapperError,
                props.editable === false && styles.inputWrapperDisabled
            ]}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <TextInput
                    style={[styles.input, customStyle]}
                    placeholderTextColor="rgba(148, 163, 184, 0.5)"
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    {...props}
                />
            </View>
            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(15, 23, 42, 0.8)',
        marginLeft: 4,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 14,
    },
    inputWrapperFocused: {
        borderColor: '#FF6B35',
        borderWidth: 2,
    },
    inputWrapperError: {
        borderColor: '#EF4444',
    },
    inputWrapperDisabled: {
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        opacity: 0.75,
    },
    iconContainer: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#0F172A',
        padding: 0,
        includeFontPadding: false,
    },
    errorText: {
        fontSize: 12,
        color: '#EF4444',
        fontWeight: '500',
        marginLeft: 4,
        marginTop: 4,
    },
});
