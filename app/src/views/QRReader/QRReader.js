
import * as Camera from "nativescript-camera";

const BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
var barcodescanner = new BarcodeScanner();

export default {
  data() {
    return {
      mainContentText: "",
      scanText: null
    };
  },
  mounted(){
    console.warn("mountedQR")
  },
  methods: {
    scanQrCode() {
      Camera.requestCameraPermissions()
        .then(() => {
          barcodescanner
            .scan({
              formats: "QR_CODE",
              cancelLabel: "Close",
              cancelLabelBackgroundColor: "#FFFFFF",
              message: "Use the volume buttons for extra light",
              showFlipCameraButton: false,
              preferFrontCamera: false,
              showTorchButton: true,
              beepOnScan: true,
              torchOn: false,
              closeCallback: function() {
                console.log("Scanner closed"); 
              },
              resultDisplayDuration: 500,
              orientation: "portrait",
              openSettingsIfPermissionWasPreviouslyDenied: true
            })
            .then(
              result => {
                console.log("Scan format : " + result.format);
                console.log("Scan text :   " + result.text);

                this.scanText = result.text;
              },
              error => {
                console.log("No scan: " + error);
              }
            );
        })
        .catch(e => {
          console.log("Error requesting permission");
        });
    }
  }
};