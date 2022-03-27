<template>
    <v-content>
        <v-card width="500" class="mx-auto mt-9">
            <v-select
                :items="allLanguages"
                v-model="language"
                prepend-icon="mdi-account-voice"
                class="px-4"
            >
                <template slot="selection" slot-scope="data">
                    {{ data.item.name }}
                    <flag :iso="data.item.flag" class="ml-1" />
                </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.name }}
                    <flag :iso="data.item.flag" class="ml-1" />
                </template>
            </v-select>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                    v-model="username"
                    label="username"
                    prepend-icon="mdi-account-circle"
                />
                <v-select
                    :items="allLanguages"
                    label="choose location"
                    prepend-icon="mdi-office-building"
                >
                </v-select>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn
                    v-on:click="hanldeLogin"
                    :color="cols.KonfairPrimary"
                    style="float: right"
                >Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-content>
</template>

<script>
import colors from "../styles/colors";
import FlagIcon from "vue-flag-icon";
import Vue from "vue";

Vue.use(FlagIcon);

export default {
    name: "LogIn",
    data: function () {
        return {
            cols: colors,
            username: "",
        };
    },
    computed: {
        allLanguages() {
            return this.$store.state.login.allLanguages
        },
        language: {
            get() {
                return this.$store.state.login.chosenLanguage
            },
            set(newLanguage) {
                this.$store.commit("login/setLanguage", newLanguage)
            },
        },
    },
    methods: {
        hanldeLogin() {
            if(this.username != ""){
                return this.$store.dispatch("login/loginUser", { username: this.username }).then(result => {
                    if(result){
                        console.log("REDIRECT")
                        this.$router.push('/jokes')
                    }
                })
            }
        },
    },
};
</script>

<style scoped>
</style>
