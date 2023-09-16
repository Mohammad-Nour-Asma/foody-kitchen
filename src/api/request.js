import axios from "axios";

const client = axios.create({
  baseURL: "https://api.foody.gomaplus.tech/api",
});
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer 4|8kgfWj3y3hNXVmmFnLj13E4gLo5D6xjbsXvt58Rtbcaae2d8`;
  client.defaults.timeout = 6000;
  const onSuccess = (res) => {
    return res;
  };
  const onError = (err) => {
    return err;
  };
  return client(options).then((res) => res);
};
