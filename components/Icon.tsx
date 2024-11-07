import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

function Icon({
    style,
    ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
    return <Ionicons style={style} {...rest} />;
}

export default Icon;
