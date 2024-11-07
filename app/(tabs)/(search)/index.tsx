import StopCard from "@/components/StopCard";
import TextField from "@/components/TextField";
import useStops from "@/hooks/api/useStops";
import useLocation from "@/hooks/useLocation";
import { useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function SearchScreen() {
    const [query, setQuery] = useState<string>("");

    const location = useLocation({
        updateInterval: 500,
    });

    const stops = useStops({
        name: query,
        search: true,
        location: location,
        detailed: false,
        limit: 10,
    });

    return (
        <SafeAreaView>
            <TextField
                placeholder={"Search..."}
                onChange={setQuery}
                style={styles.searchBar}
            />
            {stops.map((s) => (
                <StopCard key={s.id} stop={s} />
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    searchBar: {
        marginVertical: 16,
    },
});
