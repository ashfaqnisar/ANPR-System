import React from 'react'
import Head from "next/head";

const DetailContent = (props) => {
    return(
        <div className="container">
            <Head>
                <title>Virtual Traffic Police</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <h1 className="title" style={{marginBottom: '30px'}}>
                Virtual Traffic <span className="blue">Police</span>
            </h1>

            <p>Number plate: </p>



            <footer>
                <p
                    className={"description"}
                >
                    Developed with ❤ by Team
                </p>
            </footer>
        </div>
    )
}
export default DetailContent