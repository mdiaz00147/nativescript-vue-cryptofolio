import * as Toast from "nativescript-toasts";

export const ToastMixin = {
  methods: {
    toasted(text = "string") {
      let toastOptions = (Toast.ToastOptions = {
        text: text,
        dutation: Toast.DURATION.SHORT
      });
      Toast.show(toastOptions);
    }
  }
}