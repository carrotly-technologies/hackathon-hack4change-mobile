import React, {useEffect, useState} from "react";
import DropDownPicker, {ValueType} from "react-native-dropdown-picker";
import {StyleSheet, Text, View} from "react-native";

const ActivityDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<ValueType | null>(null);
    const [items, setItems] = useState([
        {label: 'Sprzątanie', value: 'cleaning'},
        {label: 'Bieganie', value: 'running'}
    ]);

    useEffect(() => {
        setValue(items[0].value);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Typ aktywności</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownList}
                placeholderStyle={styles.placeholderStyle}
                selectedItemLabelStyle={styles.selectedItemLabel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 1,
    },
    label: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
        fontWeight: '500',
    },
    dropdownContainer: {
        width: "100%",
    },
    dropdown: {
        borderColor: '#e9ecef',
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    dropdownList: {
        borderColor: '#e9ecef',
        backgroundColor: '#fff',
    },
    placeholderStyle: {
        color: '#6c757d',
    },
    selectedItemLabel: {
        color: '#6f42c1',
        fontWeight: 'bold',
    }
});

export default ActivityDropdown;
