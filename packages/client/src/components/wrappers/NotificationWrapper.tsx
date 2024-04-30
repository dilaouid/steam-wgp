import { useEffect, useState } from "react";

export const NotificationWrapper: React.FC = () => {
    const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
    
    const requestPermission = () => {
        Notification.requestPermission().then((permission) => {
            setPermission(permission);
        });
    };

    useEffect(() => {
        if (permission === "default")
            requestPermission();
        return () => setPermission(Notification.permission);
    }, [permission]);

    return <></>
}