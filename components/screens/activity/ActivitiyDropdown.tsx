import React, {useEffect, useState} from "react";
import DropDownPicker, {ValueType} from "react-native-dropdown-picker";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ActivityType, useActivityTypesQuery} from "@/api/__generated__/graphql";
import {FontAwesome5} from '@expo/vector-icons';
import {useActivityStore} from "@/store/activity.store";


const AssocMap: Array<Record<string, { label: string, icon: string }>> = [
    {BIKING: {label: "Jazda na rowerze", icon: "biking"}},
    {OTHER: {label: "Inne", icon: "question"}},
    {RUNNING: {label: "Bieganie", icon: "running"}},
    {WALKING: {label: "Spacer", icon: "walking"}},
    {TREKKING: {label: "Trekking", icon: "hiking"}}
];

const ActivityDropdown = ({defaultValue}: { defaultValue?: ValueType }) => {

    const {data, loading, error} = useActivityTypesQuery()
    const {setActivityType} = useActivityStore();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<ActivityType | null>(null);
    const [items, setItems] = useState<{ label: string; value: ActivityType; icon: () => React.ReactElement }[]>([]);

    useEffect(() => {
        if (value && setActivityType) {
            setActivityType(defaultValue ? defaultValue as ActivityType : value);
        }
    }, [setActivityType, value]);

    useEffect(() => {
        if (data) {
            setItems([...new Map(data.activities.data.map(item => {
                const activityInfo = AssocMap.find(mappedItem => mappedItem[item.activityType])?.[item.activityType];
                const activityLabel = activityInfo?.label || item.activityType;
                const activityIcon = activityInfo?.icon || "question";
                return [item.activityType, {
                    label: activityLabel,
                    value: item.activityType,
                    icon: () => <FontAwesome5 name={activityIcon} size={18} color="black"/>
                }];
            })).values()]);

            setValue(items[0]?.value || null);
        }
    }, [data]);

    if (loading) {
        return <ActivityIndicator/>
    }

    return (
        <View style={styles.container}>
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
        zIndex: 20,
        marginTop: 1,
        borderRadius: 16,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
