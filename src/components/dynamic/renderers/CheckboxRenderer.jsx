import { Checkbox } from 'antd';
import React from 'react'

export default function CheckboxRenderer(params) {
    

    const handleChange = (e) => {
        if (e.target.checked) {
            params.setValue('1')
        }
        else {
            params.setValue('0')
        }
    }

    return (
        <Checkbox
            onChange={handleChange}
            checked={params.value == 1 ? true : false}
        />
    )
}