import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div style={{
        position: 'relative', 
        width: '100%', 
        height: '0', 
        paddingTop: '0',
        paddingBottom: '0', 
        boxShadow: '0', 
        marginTop: '0', 
        marginBottom: '0', 
        overflow: 'hidden',
        borderRadius: '0', 
        willChange: 'transform'
      }}>
        <iframe 
          loading="lazy" 
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            top: '0', 
            left: '0', 
            border: 'none', 
            padding: '0',
            margin: '0'
          }}
          src="https://www.canva.com/design/DAFpTo33F0s/view?embed" 
          allowFullScreen
        >
        </iframe>
      </div>
      <a href="https://www.canva.com/design/DAFpTo33F0s/view?utm_content=DAFpTo33F0s&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Copy of AI SECRET AGENT DEMO</a> by Shawn Mason
    </>
  );
}
