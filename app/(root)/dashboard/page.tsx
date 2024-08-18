import axios from "axios";
const Dashboard =  async () => {

  const { data } = await axios.get('https://cronitor.io/api/monitors/YnJGeQ?env=production&format=api&sort=-created&time=24h', {
      auth: {
        password: '',
        username: 'd58be4b77cb54e2abd02e5940d030016'
      }
    })
  console.log(data)


  return (
    <main className="w-full h-full text-[#B6B6B6] font-[500] text-[20px] flex justify-center items-center whitespace-pre-wrap">
      <div dangerouslySetInnerHTML={{
        __html: data
      }}></div>
    </main>
  );
};

export default Dashboard;
