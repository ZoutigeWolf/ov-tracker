import { Tabs } from "expo-router";
import React from "react";

import Icon from "@/components/Icon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                            size={28}
                            style={{ marginBottom: -3 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(search)"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name={focused ? "search" : "search-outline"}
                            color={color}
                            size={28}
                            style={{ marginBottom: -3 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(map)"
                options={{
                    title: "Map",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name={focused ? "map" : "map-outline"}
                            color={color}
                            size={28}
                            style={{ marginBottom: -3 }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            name={focused ? "settings" : "settings-outline"}
                            color={color}
                            size={28}
                            style={{ marginBottom: -3 }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
