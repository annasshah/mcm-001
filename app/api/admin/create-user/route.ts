// pages/api/createUser.ts

import { supabase } from '@/services/supabase';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { parse } from 'path';

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = async (req: Request) => {

    const { email, roleId = 1, locationIds, fullName, password } = await req.json();

    try {
        const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: password || null,
            email_confirm: true,
        });

        if (error) throw error;

        const userId = user.user.id;

        await supabaseAdmin
            .from('profiles')
            .insert({ id: userId, role_id: roleId, full_name: fullName });

        const userLocations = locationIds.map((locationId: number) => ({
            profile_id: userId,
            location_id: locationId,
        }));

        await supabaseAdmin.from('user_locations').insert(userLocations);

        if (!password) {
            await supabaseAdmin.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/set-password',
            });
        }


        return NextResponse.json(
            { success: true, message: 'User created successfully.' },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}

