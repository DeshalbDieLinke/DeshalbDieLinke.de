import React, { useRef } from 'react';

import Select from 'react-select';
import { API_DOMAIN } from '../../config.ts';

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
        })
    }

    return <Select
    isMulti
    name="Themen"
    options={ topics.map((topic, index) => {return {value: index, label: topic}})}
    className="basic-multi-select"
    classNamePrefix="select"
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