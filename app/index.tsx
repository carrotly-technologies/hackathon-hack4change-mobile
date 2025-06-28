import {useEffect} from "react";
import {router} from "expo-router";

const ind = () => {

    useEffect(() => {
        router.replace('/home')
    }, []);

    return <></>
}

export default ind;