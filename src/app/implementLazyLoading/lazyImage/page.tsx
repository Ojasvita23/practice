import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const showData = Array.from({ length: 100 }).map((_, index) => (
    <p key={index}>some dummy data</p>
  ));

  return (
    <>
      <Link href="/implementLazyLoading">Implement lazy loading in image</Link>

      <div>{showData}</div>
      
      <Image
        src="/userImage.png"
        alt="A cute cat"
        width={60}
        height={40}
        // priority
        // loading="lazy"
      />
      </>
  );
}
