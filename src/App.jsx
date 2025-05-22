import './assets/style/App.css'
import './assets/style/Tailwind.css'

import Routes from './routes/index'
import { App as AntdApp, ConfigProvider } from 'antd';
import { themeToken, components, getCustomLocale } from "@/config/Antd/index";
import { setNotificationApi } from './components/utils/notification';

function App() {
  localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiQXV0aGVudGljYXRpb25UeXBlIjoiMSIsIlVzZXJJZEhhc2giOiI3Qk9lbnVsOEJReEQ3Z2RNOHI0WDVRPT0iLCJFbWFpbCI6ImFkbWluQGVycC1pbnRlbC5heiIsIlVzZXJuYW1lIjoiYWRtaW4iLCJGdWxsTmFtZSI6IkFkbWluIEFkbWlub3YiLCJQb3NpdGlvbk5hbWUiOiJBZG1pbnN0cmF0b3IiLCJEZXZpY2VJc01vYmlsZSI6IkZhbHNlIiwiQWRtaW4iOiJUcnVlIiwibmJmIjoxNzQzOTY0Njk1LCJleHAiOjE3NzU1MjI0MTUsImlhdCI6MTc0Mzk2NDgxNSwiaXNzIjoiTVRURS1BUEktSXN1IiwiYXVkIjoiTVRURS1BUEktQXVkIn0.fkss2iZPDbRSIzyjIZxWsCQXOb1oVp-xBdyaqmn-ccY');
  localStorage.setItem('module_id_hash', 'GcXmwDGGaO3XSXd_6vxFBw==');
  return (
    <ConfigProvider
    theme={{
      components: components,
      token: themeToken,
    }}
    locale={getCustomLocale()}
  >
    <AntdApp>
      <Initializer />
      <Routes />
    </AntdApp>
  </ConfigProvider>
  )
}

const Initializer = () => {
  const { notification } = AntdApp.useApp();
  setNotificationApi(notification);
  return null;
};

export default App
