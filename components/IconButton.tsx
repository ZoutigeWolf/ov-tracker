import { Colors } from "@/constants/Colors";
import { StyleSheet, Pressable } from "react-native";
import Icon from "./Icon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
const IconButton = ({
    style,
    name,
    onPress,
    ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            <Icon name={name} style={styles.icon} {...rest} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.dark.background,
    },
    icon: {
        color: Colors.dark.text,
    },
});

export default IconButton;
