import { useMemo } from "react";
import { TOTP } from "otpauth";

export default function useOTP(secret: string, timestamp: number) {
  const token = useMemo(() => {
    const totp = new TOTP({ secret });
    return totp.generate({ timestamp });
  }, [secret, timestamp]);

  return token;
}
