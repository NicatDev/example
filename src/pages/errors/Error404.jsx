import { Button, Result } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Error404() {
    const { t } = useTranslation()

    const handleRedirect = React.useCallback(() => {
        window.location.assign('/')
    }, [])

    return (
        <div className="content-center w-full h-screen">
            <Result
                status="404"
                title="404"
                subTitle={t('error.subTitle404')}
                extra={
                    <Button type="primary" onClick={handleRedirect}>
                        {t('error.submit404')}
                    </Button>
                }
            />
        </div>
    )
}