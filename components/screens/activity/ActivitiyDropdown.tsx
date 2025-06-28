import React, {useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";

const ActivityDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);


    return <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{width: "90%", margin: "auto", marginVertical: 14, borderBottomColor: "black", borderBottomWidth: 1}}
    />
};

export default ActivityDropdown;