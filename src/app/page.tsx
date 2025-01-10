import Image from "next/image";
import Header from './components/Header'
import MainText from './components/MainText'


export default function Home() {
  return (
    <div className="">
      <main className="">
        <Image
          className=""
          src="/demopic.jpg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} 
        />
        <Header />
        <MainText/>
      </main>
    </div>
  );
}
