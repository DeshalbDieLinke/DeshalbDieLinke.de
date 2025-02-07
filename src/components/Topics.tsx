/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Select from 'react-select';
import { API_DOMAIN } from '../../config.ts';
import React from 'react';

export default function Topics(props: {SelectedTopicsCallback: (topics: string[]) => void}) {

    const [topics, setTopics] = React.useState<string[]>([])

    React.useEffect(() => {
        getTopics();
    }, [])

    const getTopics = () => {
        fetch(`${API_DOMAIN}/topics`).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    console.log(json)
                    setTopics(json.topics)
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

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