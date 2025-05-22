import { Select } from 'antd/lib';
import React from 'react'
import API from '@/api'

export default function SelectRenderer(params) {
    const [values, setValues] = React.useState([])
    const ColumnIdHash = params.colDef.related_column_id_hash


    const handleClick = async (value) => {
        API.Services.getDynamicValue({ ColumnIdHash }).then((res) => {
            const items = res.data.items
            // remove items whic it has not value
            const filteredItems = items.filter((item) => item.value !== null && item.value !== undefined)
            // set values to state
            setValues(filteredItems)
        }
        )
    }

    const handleChange = (value) => {
        // onchange set label to params.setValue
        const selectedItem = values.find((item) => item.id_hash === value)
        if (selectedItem) {
            params.setValue(selectedItem.value)
        }
        else {
            params.setValue('')
        }
    }

    return (
        <Select
            className='w-full'
            variant='borderless'
            value={params.value}
            onChange={handleChange}
            options={values?.map((item) => ({
                label: item.value,
                value: item.id_hash,
            }))}
            onClick={handleClick}
        />
    )
}
