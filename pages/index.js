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
        paddingTop: '56.2225%',
        paddingBottom: '0', 
        boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
        marginTop: '1.6em', 
        marginBottom: '0.9em', 
        overflow: 'hidden',
        borderRadius: '0',  // Set to '0' for square corners
        border: 'none',  // No border
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
      <a href="https://www.canva.com/design/DAFpTo33F0s/view?utm_content=DAFpTo33F0s&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">AI SECRET AGENT DEMO</a> by Shawn Mason
    </>
  );
}
