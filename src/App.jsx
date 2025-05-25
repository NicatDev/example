import './assets/style/App.css'
import './assets/style/Tailwind.css'

import Routes from './routes/index'
import { App as AntdApp, ConfigProvider } from 'antd';
import { themeToken, components, getCustomLocale } from "@/config/Antd/index";
import { setNotificationApi } from './components/utils/notification';

function App() {

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
