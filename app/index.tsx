import {useEffect} from "react";
import {router} from "expo-router";

const ind = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        router.replace('/home')
    }, []);

    return <></>
}

export default ind;