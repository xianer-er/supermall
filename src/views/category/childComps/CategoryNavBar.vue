<template>
    <div class="category">
        <nav-bar>
            <div class="navbar" slot="center">{{title}}</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar"
export default {
    name:'CategoryNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            title:'分类'
        }
    }
}
</script>

<style scoped>

</style>