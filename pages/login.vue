<template>
  <v-app>
    <v-app-bar app :color=cols.KonfairPrimary >
      <v-toolbar-title>KONFAIR</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select rounded :v-model=defaultLanguage :items="items" style="max-width: 130px"></v-select>
    </v-app-bar>

    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-text>
          <v-text-field label="username" prepend-icon="mdi-account-circle"/>
          <v-select :items="items" label="choose location" prepend-icon="mdi-office-building"></v-select>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color=cols.KonfairPrimary style="float: right">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import colors from "../theme/colors";

export default {
  name: "LogIn",
  data : function(){
    return{
      cols: colors,
      defaultLanguage:"eng",
      items: ["eng","dkk","lith"]
    }
  }
}
</script>

<style scoped>

</style>
