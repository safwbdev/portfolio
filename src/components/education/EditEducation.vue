<template>
    <div id="edit-education">
        <h3>Edit Education</h3>
        <div class="row">
            <form @submit.prevent="updateSkill" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="edu_id" required hidden>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="edu_name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="edu_field" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="edu_start" required>
                    </div>
                    <div class="input-field col s6">
                        <input type="text" v-model="edu_end" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="edu_location" required>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <!-- <router-link to="/" class="btn">Cancel</router-link> -->
                <router-link class="btn" v-bind:to="{name: 'view-education'}">
                    Cancel
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'edit-education',
        data() {
            return {
                edu_id: null,
                edu_name: null,
                edu_field: null,
                edu_start: null,
                edu_end: null,
                edu_location: null,
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('education').where('edu_id',
            '==', to.params.edu_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.edu_id = doc.data().edu_id
                        vm.edu_name = doc.data().edu_name
                        vm.edu_field = doc.data().edu_field
                        vm.edu_start = doc.data().edu_start
                        vm.edu_end = doc.data().edu_end
                        vm.edu_location = doc.data().edu_location
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                db.collection('education').where
                ('edu_id', '==', this.$route.params.edu_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.edu_id = doc.data().edu_id
                        this.edu_name = doc.data().edu_name
                        this.edu_field = doc.data().edu_field
                        this.edu_start = doc.data().edu_start
                        this.edu_end = doc.data().edu_end
                        this.edu_location = doc.data().edu_location
                    })
                })
            },
            updateSkill () {
                db.collection('education').where
                ('edu_id', '==', this.$route.params.edu_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            edu_id: this.edu_id,
                            edu_name: this.edu_name,
                            edu_field: this.edu_field,
                            edu_start: this.edu_start,
                            edu_end: this.edu_end,
                            edu_location: this.edu_location,
                        })
                        .then(() => {
                            this.$router.push({
                                name: 'view-education', 
                                params: {edu_id: this.edu_id}})
                        })
                    })
                })
            }
        }
    }
</script>
