import React, {useEffect, useState} from "react";
import DropDownPicker, {ValueType} from "react-native-dropdown-picker";

const ActivityDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<ValueType | null>(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    useEffect(() => {
        setValue(items[0].value);
    }, []);


    return <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{width: "90%", margin: "auto"}}
        style={{marginVertical: 14, borderBottomColor: "black", borderBottomWidth: 1}}
    />
};

export default ActivityDropdown;