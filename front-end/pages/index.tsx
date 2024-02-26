import { NextPage } from "next";
import { useRouter } from "next/router";

enum UserType {
  admin = "Admin",
  client = "Client",
}

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router);
  const user: UserType = UserType.admin;
  if (user === UserType.admin) {
    router.push("/admin");
  } else {
    router.push("/home");
  }
  return null;
};

export default Home;
