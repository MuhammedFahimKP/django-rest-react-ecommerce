import axios from "axios";

const BASE_URL = import.meta.env.VITE_POST_BASE_URL;

interface PostOffice {
  Name: string;
  Description: null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}
interface PostResponse {
  Message: string;
  Status: string;
  PostOffice: null | PostOffice[];
}

async function fetchStateByPincode(pinCode: string): Promise<any> {
  try {
    const res = await axios.get<PostResponse[]>(
      `${BASE_URL}pincode/${pinCode}`
    );
    const data = res.data[0];
    if (data === null) {
      return "Not Found";
    }

    if (data.PostOffice === null) {
      return "Not Found";
    }
    if (data?.PostOffice?.length === 0) {
      return "Not Found";
    }
    return data.PostOffice[0].State;
  } catch (err) {
    return "Not Found";
  }
}

export { fetchStateByPincode };
