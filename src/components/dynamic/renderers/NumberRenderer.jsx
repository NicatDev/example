import { Select } from 'antd/lib';
import React from 'react'
import API from '@/api'
import { InputNumber } from 'antd';

export default function NumberRenderer(params) {

   
    return (
        <InputNumber
            style={{ width: '100%',height: '100%' }}
            variant='borderless'
            value={params.value}
            onChange={(value) => {
                params.setValue(value.toString())
            }}
            // min={0}
            // max={100}
            // step={1}

        />
    )
}
