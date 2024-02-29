import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/inquiry">Inquiry</Link>
    </div>
  );
};

export default Home;
