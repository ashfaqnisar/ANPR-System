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
