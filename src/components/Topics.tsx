/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select';
import React from 'react';
import { TOPICS } from '../../config';

export default function Topics(props: {SelectedTopicsCallback: (topics: string[]) => void}) {

    const topics = TOPICS;


    return <Select
    isMulti
    name="Themen"
    options={ topics.map((topic, index) => {return {value: index, label: topic, id: `${topic} ` + index.toString()}}) }
    className="basic-multi-select w-4/5"
    classNamePrefix="select"
    instanceId={"select_in"}
    placeholder=<div key="test-key" id="select_in">Themen auswählen</div>
    onChange={(selectedOption) => {
        if (selectedOption) {
            console.log(selectedOption)
            props.SelectedTopicsCallback(selectedOption.map((option: any) => topics[option.value]))
        } else {
            props.SelectedTopicsCallback([])
        }
    }}
    />
}