<template>
  <Page>
    <ActionBar>
      <label text="QR 4 3" />
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
      <!-- <ActionItem ios.systemIcon="2" android.systemIcon="ic_menu_edit" ios.position="right"></ActionItem> -->
    </ActionBar>
    <TabView
      android:tabBackgroundColor="#000000"
      android:tabTextColor="#c4ffdf"
      android:selectedTabTextColor="#ffffff"
      androidSelectedTabHighlightColor="#ffffff"
    >
      <TabViewItem color="orange" selectedColor="green" title="Tab2331">
        <GridLayout columns="*" rows="*">
          <Label class="message" :text="msg" col="0" row="0" />
        </GridLayout>
      </TabViewItem>
      <TabViewItem @tap="navToQR" title="Tab 334">
        <GridLayout columns="*" rows="*">
          <QRCode />
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Tab 3">
        <GridLayout columns="*" rows="*">
          <Label class="message" text="Tab 3 Content" col="0" row="0" />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script >
import QRCode from "@/src/views/QRReader";

export default {
  components: {
    QRCode
  },
  mounted() {
    console.warn("mounted");
  },
  data() {
    return {
      msg: "Hello22  " + this.$store.getters.currentUser.username
    };
  },
  methdos: {
    navToQR() {
      console.warn("nav");
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #000000;
  color: rgb(245, 244, 245);
}
TabView {
  tab-text-color: rgb(127, 127, 127);
  selected-tab-text-color: rgb(239, 178, 1);
  ios-selected-tab-highlight-color: rgb(239, 178, 1);
  tab-background-color: #000000;
  android-selected-tab-highlight-color: rgb(239, 178, 1);
}

TabViewItem {
  font-size: 20;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
