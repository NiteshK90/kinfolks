import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="px-4 pt-4 border-r">
      <div className="pb-4">
        <Link href="visitors">Visitors</Link>
      </div>
      <div className="pb-4">
        <Link href="users">Users</Link>
      </div>
      <div className="pb-4">
        <Link href="locations">Locations</Link>
      </div>
      <div className="pb-4">
        <Link href="settings">Settings</Link>
      </div>
    </div>
  );
};
