import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = ({
    accurate = false,
    updateInterval = 1000,
}: {
    accurate?: boolean;
    updateInterval?: number;
}) => {
    const [permissionStatus, setPermissionStatus] = useState<boolean>(false);
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null,
    );

    useEffect(() => {
        Location.requestForegroundPermissionsAsync().then((res) =>
            setPermissionStatus(res.status === "granted"),
        );

        const fetch = () => {
            if (!permissionStatus) return;

            getLocation(accurate).then(setLocation);
        };

        const interval = setInterval(fetch, updateInterval);

        return () => clearInterval(interval);
    }, []);

    return location;
};

export const getLocation = async (accurate: boolean = false) => {
    let location;

    if (accurate) {
        location = await Location.getLastKnownPositionAsync({});
    } else {
        location = await Location.getCurrentPositionAsync({});
    }

    return location;
};

export default useLocation;
