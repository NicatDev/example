import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, QRCode } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function QRCodeRenderer(params) {
  const { t } = useTranslation();
  const qrCode = params.data[params.colDef.related_column_id_hash] || "";
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center">
        {qrCode && (
          <QRCode
            onClick={() => setShowModal(true)}
            value={qrCode}
            size={43}
            iconSize={43}
          />
        )}
      </div>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={250}
        centered
        closeIcon={false}
      >
        <QRCode value={qrCode} size={200} />
        <Button className="flex w-full" onClick={() => setShowModal(false)}>
          {t("CommonContent.close")}
        </Button>
      </Modal>
    </>
  );
}
