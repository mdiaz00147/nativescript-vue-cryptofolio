<template>
  <Page actionBarHidden="true" class="container">
    <FlexboxLayout>
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/ui-logo.png"></Image>
        <Label
          text="Log in to your account"
          class="h2 text-center text-white"
          @tap="forgotPassword()"
        ></Label>
        <FlexboxLayout class="content m-t-25">
          <TextField
            class="input"
            hint="Email"
            :isEnabled="!loading"
            keyboardType="email"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.username"
            returnKeyType="next"
            @returnPress="focusPassword"
          ></TextField>

          <TextField
            class="input"
            ref="password"
            :isEnabled="!loading"
            hint="Password"
            secure="true"
            v-model="user.password"
            :returnKeyType="isLoggingIn ? 'done' : 'next'"
            @returnPress="focusConfirmPassword"
          ></TextField>

          <TextField
            class="input"
            ref="confirmPassword"
            :isEnabled="!loading"
            hint="Confirm password"
            secure="true"
            v-model="user.confirmPassword"
            returnKeyType="done"
          ></TextField>

          <Button
            :text="isLoggingIn ? 'Log In' : 'Sign Up'"
            :isEnabled="!loading"
            @tap="submit"
            class="m-t-20 -rounded-sm btn-login"
          ></Button>

          <ActivityIndicator rowspan="3" :busy="loading"></ActivityIndicator>
        </FlexboxLayout>
        <Label
          *v-show="isLoggingIn"
          text="Forgot your password?"
          class="text-center text-red label-sign m-t-30"
          @tap="forgotPassword()"
        ></Label>

        <Label class="text-center text-red label-sign m-t-30" @tap="toggleForm">
          <FormattedString>
            <Span
              class="text-white label-sign"
              :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"
            ></Span>
            <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
          </FormattedString>
        </Label>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from "./Register";
import { ToastMixin } from "@/src/mixins/";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      isLoggingIn: true,
      loading: false,
      user: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    submit() {
      this.$http({
        method: "POST",
        url: "/api/v1/client/sessions",
        data: this.user
      })
        .then((response) => {
          this.$store.commit("setCurrentUser", response.data.user);
          this.$navigateTo(Home);
        })
        .catch((e) => {
          this.toasted(e.response.data.error);
        });
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        this.loading = false;
        return;
      }

      this.$backendService
        .register(this.user)
        .then(() => {
          this.loading = false;
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.loading = false;
          this.alert("Unfortunately we were unable to create your account.");
        });
    },
    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.$backendService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style scoped>
.label-sign {
  font-size: 20;
}
.container {
  background: rgba(20, 18, 21, 1);
}
.content {
  background-color: rgba(29, 28, 33, 1);
  padding: 30 5 5 5;
  border-radius: 10;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.btn-login {
  background-color: rgba(239, 178, 0, 1);
  color: white;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.logo {
  margin-bottom: 12;
  height: 90;
  width: 150;
}
.input {
  font-size: 15;
  background: #ffffff;
  border-radius: 10;
  color: rgba(29, 28, 33, 1);
  padding: 15;
  border-bottom: #ffffff;
  margin-bottom: 15;
}
</style>
