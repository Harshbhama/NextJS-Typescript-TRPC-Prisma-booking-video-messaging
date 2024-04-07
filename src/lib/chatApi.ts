import axios from "axios";
export const createChatTransaction = (params: any) => {
  return new Promise(async (resolve, reject) => {
        axios('http://localhost:4000/chat/createChatTransactionServer', {
          method: 'POST',
          data:  {},
          headers: {
            userid: params?.chatuserid,
            friendsid: params?.currentuserid
          },
        }).then(res => {
            console.log("res",res)
            resolve(res);
        }).catch(err => {
            reject(true);
        })
  });
};
export const addChatMsgToDb = (params: any) => {
  return new Promise(async (resolve, reject) => {
        axios('http://localhost:4000/chat/addChatMsgService', {
          method: 'POST',
          data:  {
            tableTransactionId: params?.tableTransactionId,
            message: params?.message
          },
          headers: {
            userid: params?.userId
          },
        }).then(res => {
            console.log("res",res)
            resolve(res);
        }).catch(err => {
            reject(true);
        })
  });
};
