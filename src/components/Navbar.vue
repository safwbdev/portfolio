<template>
    <nav>
        <div class="nav-wrapper blue">
            <div class="container">
                <router-link to="/" class="brand-logo">My Stats</router-link>
                <ul v-for="nav in navLinks.slice().reverse()" v-bind:key="nav.id" id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <router-link v-bind:to="nav.uri">
                            {{nav.label}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
export default {
    data() {
        return{
            navLinks: [
                {label:'Home', uri: '/'},
                {label:'Dashboard', uri: '/dashboard'},
                // {label:'Education', uri: 'education'},
                // {label:'Work Experience', uri: 'experience'},
            ]
        }
    }
}
</script>