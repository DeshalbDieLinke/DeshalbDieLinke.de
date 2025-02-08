/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';
import React, { useEffect } from 'react';
import { TOPICS } from '../../config';

export default function Topics(props: {SelectedTopicsCallback: (topics: string[]) => void, selectedTopics?: string[]}) {
    
    const topics = TOPICS;

    const selectRef = React.useRef<any>(null);

    useEffect(() => { 
        if (props.selectedTopics && selectRef.current) {
            try {
            selectRef.current.setValue(props.selectedTopics.map((topic) => ({
                value: topics.indexOf(topic),
                label: topic,
                id: `${topic} ` + topics.indexOf(topic).toString()
            }))); }
            catch {
                console.log("Error in setting value")
            }
        }
    }, [])


    return <Select
    ref={selectRef}
    isMulti
    name="Themen"
    options={ topics.map((topic, index) => {return {value: index, label: topic, id: `${topic} ` + index.toString()}}) }
    className="basic-multi-select w-4/5"
    classNamePrefix="select"
    instanceId={"select_in"}
    placeholder=<div key="test-key" id="select_in">Themen auswählen</div>
    onChange={(selectedOption) => {
        if (selectedOption) {
            props.SelectedTopicsCallback(selectedOption.map((option: any) => topics[option.value]))
        } else {
            props.SelectedTopicsCallback([])
        }
    }}
    />;
}