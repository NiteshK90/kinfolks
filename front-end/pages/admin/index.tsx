import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  return null;
};

export default Admin;
