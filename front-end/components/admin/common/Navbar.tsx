import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="px-4 pt-4 border-r">
      <div className="pb-4">
        <Link href="admin/inquiries">Inquiries</Link>
      </div>
    </div>
  );
};
