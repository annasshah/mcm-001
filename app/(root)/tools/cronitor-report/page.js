'use client'
import moment from "moment";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Spinner } from "flowbite-react";

// const data = {
//   "monitors": [
//     {
//       "attributes": {
//         "group_name": null,
//         "site": {
//           "ssl": {
//             "issued_to": "new.clinicsanmiguel.com",
//             "issued_by": "R3",
//             "issued_at": "2024-06-04T00:28:45Z",
//             "expires_at": "2024-09-02T00:28:44Z"
//           },
//           "dns": {
//             "name": "CLINICSANMIGUEL.COM",
//             "expires_at": "2025-11-01T03:52:13Z",
//             "registrar": "GoDaddy.com, LLC",
//             "name_servers": [
//               "NS75.DOMAINCONTROL.COM",
//               "NS76.DOMAINCONTROL.COM"
//             ]
//           }
//         },
//         "key": "YnJGeQ",
//         "code": "YnJGeQ"
//       },
//       "assertions": [],
//       "created": "2024-05-25T15:58:55+00:00",
//       "disabled": false,
//       "failure_tolerance": null,
//       "grace_seconds": 0,
//       "consecutive_alert_threshold": 10,
//       "group": null,
//       "initialized": true,
//       "key": "YnJGeQ",
//       "latest_event": {
//         "stamp": 1718130196.68,
//         "msg": "",
//         "event": "req-ok",
//         "metrics": {
//           "duration": 1.716
//         },
//         "client": null,
//         "host": "us-east-1",
//         "ip": ""
//       },
//       "latest_events": null,
//       "latest_issue": null,
//       "latest_invocations": null,
//       "public_badge_url": "https://cronitor.io/badges/YnJGeQ/production/l6f36-66KxKxAAA2zSrrK-d_TFs.svg",
//       "metadata": null,
//       "name": "clinca check1",
//       "next_expected_at": null,
//       "note": null,
//       "notify": [
//         "default"
//       ],
//       "passing": true,
//       "paused": false,
//       "platform": "http",
//       "realert_interval": "every 8 hours",
//       "request": {
//         "url": "https://new.clinicsanmiguel.com/",
//         "headers": {},
//         "cookies": {},
//         "body": "",
//         "method": "GET",
//         "timeout_seconds": 10,
//         "regions": [
//           "eu-central-1",
//           "us-east-1",
//           "eu-west-1",
//           "us-west-1"
//         ],
//         "follow_redirects": true,
//         "verify_ssl": true
//       },
//       "running": false,
//       "schedule": "every 5 minutes",
//       "schedule_tolerance": null,
//       "tags": [],
//       "timezone": null,
//       "type": "check",
//       "environments": [
//         "production"
//       ],
//       "statuspages": [],
//       "site": null
//     }
//   ],
//   "page_size": 50,
//   "page": 1,
//   "total_monitor_count": 1,
//   "version": "2020-10-01"
// }



const render_arr = [
  {
    label: 'status'
  },
  {
    label: 'uptime'
  },
  {
    label: 'checks'
  },
  {
    label: 'Alerts'
  },
]



const Render_Data = ({ data }) => {

  const { attributes: { site: { ssl, dns } }, request, platform, schedule } = data.monitors[0]
  return (
    <div className="mt-24 text-slate-700 ">


      <div className="grid grid-cols-6 gap-4">

        <div className="col-span-4 space-y-4">
          {/* <div className="grid grid-cols-4 gap-4">

            {
              render_arr.map(({label}) =>

                <div className="bg-gray-100/75 py-2 px-3 rounded-md">
                  <h1 className="text-sm text-gray-600" >
                    {label}
                  </h1>
                  <h1 className="text-green-500 font-bold">
                    Healthy
                  </h1>
                  <h1 className="text-sm text-gray-600">
                    Just Now
                  </h1>
                </div>)
            }

          </div> */}


          <div className="bg-gray-100/75 py-2 px-3 rounded-md">
            <h1 className="mb-3  text-2xl">
              SSL
            </h1>

            <div className="grid grid-cols-4 gap-4">

              <dl>
                <dt className="font-bold">
                  Issued to
                </dt>
                <dd>{ssl.issued_to}</dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Issued By
                </dt>
                <dd>{ssl.issued_by}</dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Issued at
                </dt>
                <dd>{moment(ssl.issued_at).format('DD/MM/YYYY, h:mm A')}</dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Expires at
                </dt>
                <dd>{moment(ssl.expires_at).format('DD/MM/YYYY, h:mm A')}</dd>
              </dl>

            </div>
          </div>


          <div className="bg-gray-100/75 py-2 px-3 rounded-md">
            <h1 className="mb-3  text-2xl">
              DNS
            </h1>

            <div className="grid grid-cols-4 gap-4">

              <dl>
                <dt className="font-bold">
                  Name
                </dt>
                <dd>{dns.name}</dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Expires at
                </dt>
                <dd>{moment(dns.expires_at).format('DD/MM/YYYY, h:mm A')}</dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Registrar
                </dt>
                <dd>{dns.registrar}</dd>
              </dl>
              <dl className="col-span-4">
                <dt className="font-bold">
                  Server Name
                </dt>
                <dd>{dns.name_servers}</dd>
              </dl>

            </div>
          </div>
        </div>





        <div className="col-span-2 bg-gray-100/75 rounded-lg px-3 py-5">

          <h1 className="mb-3  text-2xl">
            Monitor Details
          </h1>

          <div className="space-y-6">
            <dl>
              <dt className="font-bold">
                Request
              </dt>
              <dd> <span className="rounded-md bg-slate-700 px-3 py-1 text-white text-xs ">GET</span> <span>{request.url}</span></dd>
            </dl>

            <div className="grid grid-cols-2 gap-4">

              <dl>
                <dt className="font-bold">
                  Interval
                </dt>
                <dd> <span>{schedule}</span></dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Protocol
                </dt>
                <dd> <span>{platform}</span></dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Request Timeout
                </dt>
                <dd> <span>{request.timeout_seconds} seconds</span></dd>
              </dl>
              <dl>
                <dt className="font-bold">
                  Headers
                </dt>
                <dd> <span>{Object.keys(request.headers).length || 'none'}</span></dd>
              </dl>


              <dl className="col-span-2">
                <dt className="font-bold">
                  Locations
                </dt>

                <div className="flex items-center space-x-3 flex-wrap">
                  {
                    request.regions.map(region,index => <dd key={index}> <span className="rounded-md bg-slate-700 px-3 py-1 text-white text-sm ">{region}</span></dd>)
                  }
                </div>

              </dl>

            </div>
          </div>

        </div>

      </div>



    </div>
  );
}

const Page = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const username = '65d66aa7947049a4895ca7385db9d943';
    const password = ''; // Leave this empty if there's no password
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    

    axios.get('https://cronitor.io/api/monitors', {
      // proxy: {
      //   host: "https://new.clinicsanmiguel.com/",
      //   port: 8001
      // },
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
        
      },
      withCredentials: true,
      
    }).then((response) => {
      setData(response.data)
      setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
    })

  }, [])


  return <>

    {loading ? <div className="grid place-items-center h-screen w-full"><Spinner color="info" aria-label="Info spinner example" size='lg' /> </div> : data ? <Render_Data data={data} /> : <div className="grid place-items-center h-screen w-full">
      <h1 className="text-red-500 text-xl">
        Somethig Went wrong!
      </h1>
      </div>}

  </>
};

export default Page;
