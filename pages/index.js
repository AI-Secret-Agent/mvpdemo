import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Your Website Title</title>
      </Head>
      <iframe 
        src="https://aisademo.my.canva.site/" 
        style={{position:"absolute", top:"0", left:"0", bottom:"0", right:"0", width:"100%", height:"100%", border:"none", margin:"0", padding:"0", overflow:"hidden", zIndex:"999999"}}
        allowFullScreen>
      </iframe>
    </div>
  );
}