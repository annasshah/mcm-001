'use client'

import UserManagementComponents from "@/components/UserManagementComponents";
import { ConfigProvider } from "antd";


const UserManagement = () => {


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <ConfigProvider
                theme={{
                    components: {
                        Switch: {
                            colorPrimary: "green",
                            colorPrimaryHover: "#05cd05",
                        },
                    },
                }}
            >
                <UserManagementComponents />
            </ConfigProvider>
        </div>
    )
}


export default UserManagement;