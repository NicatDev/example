import { Form, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../../api";
import FormRenderer from "../formRenderer/index";
import { notify } from "../../../components/utils/notification";
import FormDrawer from "../../../components/ui/FormDrawer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dateFormat } from "../../../components/utils/dateFormat";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Index({ isOpen, close, itemId, setIsRefresh }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const getFormData = () => {
    API.UserRegistration.getSingle({ id: itemId })
      .then((response) => {
        const { data } = response;
        data.birthday = data?.birthday ? dayjs(data.receipt_result_date) : null;
        form.setFieldsValue(data);
      })
      .catch((error) => {
        console.error("Error fetching table data", error);
      });
  };

  useEffect(() => {
    if (itemId) getFormData();
  }, [itemId]);

  const closePage = () => {
    close();
  };

  const onFinish = async () => {
    try {
      const values = form.getFieldValue();
      const birthday = dateFormat(values?.birthday);
      await API.MiningGeoSamples.update(
        {
          ...values,
          birthday: birthday,
        },
        itemId
      );
      form.resetFields();
      setIsRefresh(true);
      notify.success({ message: t("CommonContent.successUpdate") });
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
