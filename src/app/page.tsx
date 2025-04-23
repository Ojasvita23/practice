import Link from "next/link";
import UsersList from "../components/UsersList";

export default function Home() {
  return (
    <>
      <Link href="/implementLazyLoading">Implement lazy loading</Link>
      <UsersList />
    </>
  );
}

