import React, { useState } from "react";
import Header from "../header/index";
import Sidebar from "../sidebar/index";
import { Outlet } from "react-router-dom";

export default function Index() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex flex-col w-screen h-screen bg-[#F9F9F8]">
            <Header collapsed={collapsed} setCollapsed={setCollapsed} wrapped={true} />
            <div className="flex h-screen">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-min w-full bg-white" style={{ width: `calc(100vw - ${collapsed ? '55px' : '215px'})` }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
