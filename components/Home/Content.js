import { Button, Grid, CircularProgress } from "@material-ui/core";
import Dropzone from "react-dropzone";
import React, { useState } from "react";
import axios from "axios";
import get from "lodash.get";

let base64File = null;

const Content = () => {
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleOnDrop = (files) => {
    setUploadedImage(files[0]);
  };
  const handleTheUpload = (setDetails, setError) => {
    if (uploadedImage) {
      setProcessing(true);
      const formData = new FormData();
      formData.append("file", uploadedImage);
      axios({
        method: "POST",
        url: "https://api-anpr.herokuapp.com/processImage",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setProcessing(false);
          setDetails(res.data);
        })
        .catch((e) => {
          setProcessing(false);
          setError("Error: " + e.message);
        });
    } else {
      alert("please provide an image");
    }
  };
  const [uploadedImage, setUploadedImage] = useState({});

  return (
    <>
      <h1 className="title" style={{ marginBottom: "30px" }}>
        Virtual Traffic <span className="blue">Police</span>
      </h1>
      
      <img src={"data:image/png;base64,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"}/>

      {!details ? (
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          direction={"column"}
          spacing={2}
        >
          <Grid item>
            <Dropzone
              onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    style={{
                      height: "200px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px dashed black",
                      padding: "30px",
                    }}
                  >
                    <input {...getInputProps()} />
                    <h3
                      style={{
                        cursor: "pointer",
                        verticalAlign: "middle",
                        padding: "15px 0px",
                      }}
                    >
                      Drag and Drop Images here
                    </h3>
                  </div>
                </section>
              )}
            </Dropzone>
          </Grid>
          <Grid item>
            {uploadedImage ? <p>{uploadedImage.name} </p> : <></>}
          </Grid>
          <Grid item>
            {error ? <p style={{ color: "#ed1c24" }}>{error}</p> : <></>}
          </Grid>
          {processing && <CircularProgress color="primary" />}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#0070f3" }}
              onClick={() => handleTheUpload(setDetails, setError)}
            >
              Upload Image
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          direction="column"
          spacing={3}
        >
          <Grid
            item
            container
            justify={"center"}
            alignItems={"center"}
            direction="column"
            spacing={2}
          >
            <Grid item>
              <h3>Vehicle Details</h3>
            </Grid>
            <Grid item container direction={"row"} justify={"space-between"}>
              <Grid item>
                <p>Number Plate: {details.results[0].plate.toUpperCase()}</p>
                <p>Region: {details.results[0].region.code.toUpperCase()}</p>
              </Grid>
              <Grid item>
                <p>
                  Type of vehicle:{" "}
                  {details.results[0].vehicle.type.toUpperCase()}
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            justify={"center"}
            alignItems={"center"}
            direction="column"
            spacing={2}
          >
            <Grid item>
              <h3>Prediction Details</h3>
            </Grid>
            <Grid item container direction={"row"} justify={"space-between"}>
              <Grid item>
                <p>
                  Plate Detection Accuracy: {details.results[0].score * 100}%
                </p>
                <p>Processing Time: {details.processing_time}</p>
              </Grid>
              <Grid item>
                <p>
                  Type of Vehicle Accuracy:{" "}
                  {details.results[0].vehicle.score * 100}%
                </p>
                <p>
                  Region Accuracy:{" "}
                  {(details.results[0].region.score * 100).toFixed(2)}%
                </p>
              </Grid>
            </Grid>
          </Grid>

          {details.user ? (
            <Grid
              item
              container
              justify={"center"}
              alignItems={"center"}
              direction="column"
              spacing={2}
            >
              <Grid item>
                <h3>Owner Details</h3>
              </Grid>
              <Grid item container direction={"row"} justify={"space-between"}>
                <Grid item>
                  <p>Name: {details.user.name}</p>
                  <p>Phone Number: {details.user.number}</p>
                </Grid>
                <Grid item>
                  <p>Address: {details.user.address}</p>
                  <p>Email: {details.user.email}</p>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item>
              No, user present in the database with{" "}
              {get(details, "results.0.plate")}
            </Grid>
          )}
          <Grid item>
            <Button variant={"outlined"} onClick={() => setDetails(null)}>
              Go Back
            </Button>
          </Grid>
        </Grid>
      )}
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a,
        .title span {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};
export default Content;
