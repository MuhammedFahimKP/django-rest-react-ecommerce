import axios from "axios";

function getPlaceByPinCode(pinCode: string) {
  try {
    const res = axios.get("https://api.postalpincode.in/pincode/${}");
  } catch (err) {}
}
