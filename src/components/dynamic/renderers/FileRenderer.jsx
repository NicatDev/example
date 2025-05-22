import { Button, Image, Modal, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import API from '@/api'

export default function FileRenderer(params) {

    const [imageUrl, setImageUrl] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const getInit = async () => {
        if (!params.value) {
            return
        }
        const response = await API.Services.getImageBlob(params.value);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    }

    const handleUpload = async (options) => {
        const formData = new FormData();
        formData.append('file', options.file);
        const response = await API.Services.uploadFile(formData);
        if (response.status === 200) {
            params.setValue(response.data.file_name)
            setImageUrl(URL.createObjectURL(options.file));
            options.onSuccess(response.data, options.file);
        } else {
            options.onError(new Error('Upload failed'));
        }
    }

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            alert('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    }

    const handleDeleteFile = async () => {
        const response = await API.Services.deleteFile(params.value);
        if (response.status === 200) {
            params.setValue(null)
            setImageUrl(null);
        }
    }

    useEffect(() => {
        getInit()
    }, [params.value])
    return (
        <>
            <div
                onClick={() => setOpenModal(true)}
                className='w-full h-full' >
                <Image
                    src={imageUrl}
                    preview={false}
                    className='border-none w-full h-full'
                />
            </div>
            <Modal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                // width={450}
                centered
            // closeIcon={false}
            >
                <div className="flex flex-col w-full h-full mt-7" >
                    <Image
                        src={imageUrl}
                        // width={400}
                        // preview={false}
                        className='border-none w-full h-full'
                    />
                    <div className='flex justify-between items-center mt-5'>

                        <Upload
                            // prevent default
                            showUploadList={false}
                            accept='image/*'
                            customRequest={handleUpload}
                            onRemove={(file) => {
                                params.setValue(null)
                                setImageUrl(null);
                            }}
                            maxCount={1}
                            className='w-full'
                            beforeUpload={handleBeforeUpload}
                        >
                            <Button type='primary'> Fayl əlavə et</Button>
                        </Upload>
                        <Button
                            onClick={handleDeleteFile}
                            danger>
                            Sil
                        </Button>


                    </div>

                </div>


            </Modal>
        </>
    )
}
