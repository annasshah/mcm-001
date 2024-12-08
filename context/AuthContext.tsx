"use client";

import axios from "axios";
// context code
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [checkingAuth, setCheckingAuth] = useState(true)
    const [userProfile, setUserProfile] = useState(null)
    const [allowedLocations, setAllowedLocations] = useState<number[]>([])
    const [userRole, setUserRole] = useState('admin')
    const [permissions, setPermissions] = useState([])
    const [initialAuthCheckError, setInitialAuthCheckError] = useState<string | null>(null); // Error state


    const setLocationsHandle = (data: number[]) => {
        setAllowedLocations(data)
    }

    const setUserRoleHandle = (role: string) => {
        setUserRole(role)
    }

    const setPermissionsHandle = (permissions: any) => {
        setPermissions(permissions)
    }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user');
                const {role,  permissions, locations, profile} = response.data.data;

                // console.log(resData)
                setUserProfile(profile)
                setUserRoleHandle(role)
                setPermissionsHandle(permissions);
                setPermissionsHandle(permissions);
                setLocationsHandle(locations);
                setCheckingAuth(false);
                setInitialAuthCheckError(null);
            } catch (error) {
                setCheckingAuth(false);
                let errorMessage = "Failed to fetch user data. Please try again."
                if (axios.isAxiosError(error)) {
                    errorMessage = error.response?.data || error.message
                } else {
                    console.error('Unexpected error:', error);
                }
                setInitialAuthCheckError(errorMessage);
            }
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{
            allowedLocations,
            setLocationsHandle,

            userRole,
            setUserRoleHandle,

            permissions,
            setPermissionsHandle,

            userProfile,

            checkingAuth,

            initialAuthCheckError
        }}>
            {children}
        </AuthContext.Provider>
    );
};
