import { trpc } from "@/app/_trpc/client";
import { makeUsersTableData } from "@/lib/utils";
import { userType } from "@/lib/types";
import WebSocketClient from "./WebSocketClient";
import ChatWrapper from "./Chat";
import Link from "next/link";
import { UserContext } from "@/app/ContextWrapper";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import { tableHead } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Requests",
      value: "requests",
    },
    {
      label: "Friends",
      value: "friends",
    },
    // {
    //   label: "Unmonitored",
    //   value: "unmonitored",
    // },
  ];
  
  const TABLE_HEAD = ["Member", "Status", ""];
   
  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];
  
  export function SortableTable({user}: any) {
    const [tabValue, setTabValue] = useState("all");
    const {data: allData, isLoading: allLoading} = trpc.getAllUsers.useQuery();
    // @ts-ignore
    let formattedData: tableHead [] | null  = allData ? makeUsersTableData(allData): null;
    const { data: friendRequests } = trpc.getFriendRequest.useQuery()
    const { data: currentFriends} = trpc.getFriends.useQuery()
    const userContext = useContext(UserContext);

    // @ts-ignore
    let formattedRequestsData = friendRequests ? makeUsersTableData(friendRequests): null; 
    // @ts-ignore
    let formattedFriends = currentFriends ? makeUsersTableData(currentFriends) : null;
    formattedData = tabValue === "all" ? formattedData : tabValue === "requests" ? formattedRequestsData : formattedFriends
    
    const utils = trpc.useContext()
    const {mutate: addFriendRequest} = trpc.sendFriendRequest.useMutation({
      onSuccess: (data) => {
        if(data?.error){
          console.log(data?.status)
        }else{
          console.log("Request sent successfully")
        }
      },
      onError: (data) => {
        console.log("In Error handler", data);
      }
    })
    const {mutate: acceptRequestMutation} = trpc.acceptRequests.useMutation({
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (data) => {
        console.log("In Error handler", data);
      }
    })
    useEffect(() => {
      userContext.dispatch({
        type: 'UPDATE_FRIENDS',
        allFriends: currentFriends
      })
    },[currentFriends])
    return (
      // <WebSocketClient />
      // <ChatWrapper/ >
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              {<Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setTabValue(value)}>
                    &nbsp;&nbsp;<span>{label}</span>&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                crossOrigin={'input'}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formattedData && formattedData.map(
                ({ img, name, email, online, friendsId }, index) => {
                  const isLast = index === formattedData!.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50" ;
                  // const checkForFriendRequest = friendRequests![0]?.FriendRequests?.find(x => x.friendsRequestId === friendsId)
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                     
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                     {tabValue === "all" ? <td className={classes + " flex gap-10"}>
                        <Button className="bg-[#0000ffa6]">Send Meeting requests</Button>
                        <Button className="bg-[#008048b3]" onClick={() => addFriendRequest({friendsId:friendsId})}>Add Friend</Button>
                      </td> : tabValue === "requests" ?
                       <td className={classes + " flex gap-10"}>
                        <Button className="bg-[#0000ffa6]" >Send Meeting requests</Button>
                        <Button className="bg-[#008048b3]" onClick={() => acceptRequestMutation(
                          {friendsId:friendsId}
                          )}>Accept Request</Button>
                      </td> : <td className={classes + " flex gap-10"}>
                        <Button className="bg-[#0000ffa6]" >Send Meeting requests</Button>
                        <Button className="bg-[#008048b3]" ><Link href={`/chat-user/${user?.id}/${friendsId}`}>Chat</Link></Button>
                      </td>

                      }
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }