<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <div class="container">
                    <!-- <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li class="brand-logo">Hello there!</li>
                    </ul>                              -->
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li v-for="nav in navLinks.slice()" v-bind:key="nav.id">
                            <router-link v-bind:to="nav.uri">
                                {{nav.label}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<!--
<style>
nav{
    background-color: transparent !important;
    display: initial !important;
}
nav .nav-wrapper{
    background-color: transparent;
}

@media only screen and (max-width: 768px) {
    nav{
        display: none !important;
    }
}
</style>
-->
<script>
export default {
    data() {
        return{
            navLinks: [
                {label:'Home', uri: '/'},
                {label:'Dashboard', uri: '/dashboard'},
            ],

            scrollLinks: [
                {label:'About Me', uri: '#intro'},
                {label:'Portfolio', uri: '#portfolio'},
                {label:'Skills', uri: '#skills'},
                {label:'Experience', uri: '#experience'},
                {label:'Education', uri: '#education'},
            ]
        }
    }
}
</script>