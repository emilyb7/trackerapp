import React from "react";
import Quagga from "quagga";

class BarcodeReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: null };
  }
  componentDidMount = () => {
    this.init();
  };
  componentDidUpdate = () => console.log(this.state);

  init = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#target") // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader"]
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
    Quagga.onDetected(this.onDetected);
  };

  onDetected = data => {
    console.log(data);
    this.setState({ result: data.codeResult.code });
  };

  stop = () => {
    Quagga.stop();
  };

  render = () =>
    <div style={{ position: "relative" }}>
      <span id="target">Read me</span>
      <span
        onClick={this.stop}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        stop
      </span>
    </div>;
}

export default BarcodeReader;
