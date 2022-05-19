export const authorizeUser = {
    created() {
        if (process.client) {
            let currentLink = this.$nuxt.$route.path.split("/");
            currentLink = "/" + currentLink[1];
            this.$store.dispatch("mainState/saveRoute", currentLink)
            this.$store.dispatch("mainState/checkUser")
        }
    }
}
