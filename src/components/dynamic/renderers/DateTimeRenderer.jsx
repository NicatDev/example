import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import React from 'react'

export default function DateTimeRenderer(params) {
    const dateFormat = 'YYYY/MM/DD:HH:mm:ss';

    const handleChange = (value) => {
        params.setValue(value.format(dateFormat))
    }

    return (
        <DatePicker
            // border none
            variant='borderless'
            className='border-none'
            defaultValue={params.value ? dayjs(params.value, dateFormat) : null}
            format={dateFormat}
            onChange={handleChange}
            showTime
        />

    )
}
