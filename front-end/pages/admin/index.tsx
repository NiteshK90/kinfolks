import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("adminuser");
    if (user) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  return null;
};

export default Admin;
