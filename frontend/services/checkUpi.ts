import { api } from "./api";

export async function checkUpi(
  userId: string,
  upiId: string,
  amount: number
) {
  const res = await api.post("/check-upi", {
    userId,
    upiId,
    amount,
  });

  return res.data;
}
