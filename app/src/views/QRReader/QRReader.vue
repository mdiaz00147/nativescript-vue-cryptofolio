<template>
  <AbsoluteLayout width="100%" height="100%" >


    <ScrollView>
      <StackLayout ~mainContent>
        <StackLayout class="home-panel">
          <Button class="btn btn-outline" text="Scan QR code" @tap="scanQrCode" />
          <Label class="h4 text-center m-t-15" :text="'Scan Result Text: ' + scanText" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </AbsoluteLayout>
</template>
