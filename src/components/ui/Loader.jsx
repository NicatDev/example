import { Spin } from "antd";
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
