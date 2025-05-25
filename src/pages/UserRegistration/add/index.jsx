import { Form, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import FormDrawer from "@/components/ui/FormDrawer.jsx";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
import { notify } from "../../../components/utils/notification";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "../../../components/utils/dateFormat";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Index({ isOpen, close, setIsRefresh }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const closePage = () => {
    close();
    //beforeClosingDrawer
  };

  const onFinish = async () => {
    try {
      const values = form.getFieldValue();
      const birthday = dateFormat(values?.birthday);
      await API.UserRegistration.create({
        ...values,
        birthday: birthday,
      });
      form.resetFields();
      setIsRefresh(true);
      notify.success({ message: t("CommonContent.successCreate") });
      return true;
    } catch (error) {
      console.error("Error fetching table data", error);
      return false;
    }
  };

  return (
    <FormDrawer
      title={t("UserRegistration.headerContent.addTitle")}
      close={closePage}
      isOpen={isOpen}
      width={830}
      handleSave={onFinish}
    >
      <FormRenderer form={form} />
    </FormDrawer>
  );
}
