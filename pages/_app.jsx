import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import Head from "next/head";

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>React辞書</title>
                <link rel="icon" type="image/x-icon" href="/favico.ico"/>
                <link rel="icon" type="image/png" href="/favico.png"/>
                <link rel="apple-touch-icon" href="/favico-apple.png"/>
                <link rel="apple-touch-startup-image" href="/launch.png"/>
                <meta name="apple-mobile-web-app-title" content="React辞書"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout></>
);
};

export default MyApp;
