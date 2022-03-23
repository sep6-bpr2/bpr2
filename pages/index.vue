<template>
	<div>
    Welcome to Konfair
  </div>
</template>

<script>
import Joke from "../components/Joke";
export default {
  components: {Joke},
  head(){
		return {
			title: "About my app",
			meta: [
				{
					hid: "description",

				}
			]
		}
	}
}
</script>
