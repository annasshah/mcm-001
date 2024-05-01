import { createClient } from "@/utils/supabase/client";

const Dashboard = async  () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  console.log(data, error)
  return (
    <main className="w-full h-full text-[#B6B6B6] font-[500] text-[20px] flex justify-center items-center">
      nothing to show here now
    </main>
  );
};

export default Dashboard;
