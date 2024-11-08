import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerTitle: "Map",
                }}
            />
            <Stack.Screen
                name="trip"
                options={{
                    headerTitle: "Trip",
                }}
            />
        </Stack>
    );
}
