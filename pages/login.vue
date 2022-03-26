<template>
    <div>
        <h1>
            Login
        </h1>
        <select name="Language" id="language" placeholder="Select language">
            <option>
                Lithuanian
            </option>
            <option>
                English
            </option>
            <option>
                Danish
            </option>
        </select>
        <input type="text" placeholder="Username">
        <!-- <input type="password" placeholder="Password"> -->
        <select name="Language" id="language">
            <option>
                Add locations programaticaly
            </option>
        </select>
    </div>
    
</template>

<script>
import index from './index.vue'


export default {
  components: { index },
    
}
</script>

<style>

</style>