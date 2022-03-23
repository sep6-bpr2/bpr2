<template>
    <v-content>

      <v-card width="500" class="mx-auto mt-9">
        <v-select :items="items" v-model="defaultLanguage" prepend-icon="mdi-account-voice" class="px-4">
          <template slot="selection" slot-scope="data">
            {{ data.item.name}}
            <flag :iso="data.item.flag" class="ml-1"/>
          </template>
          <template slot="item" slot-scope="data">
            {{ data.item.name}}
            <flag :iso="data.item.flag" class="ml-1"/>
          </template>
        </v-select>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field label="username" prepend-icon="mdi-account-circle"/>
          <v-select :items="items" label="choose location" prepend-icon="mdi-office-building">

          </v-select>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color=cols.KonfairPrimary style="float: right">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
import colors from "../styles/colors";
import FlagIcon from 'vue-flag-icon'
import Vue from "vue";
Vue.use(FlagIcon);

export default {
  name: "LogIn",
  data : function(){
    return{
      cols: colors,
      defaultLanguage:{name:"ENG",flag:"gb"},
      items: [{name:"ENG",flag:"gb"},{name:"DKK",flag:"dk"},{name:"LITH",flag:"lt"}]
    }
  }
}
</script>

<style scoped>

</style>
