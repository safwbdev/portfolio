<template>
    <div class="container">
        <h3>Edit Skill</h3>
        <div class="row">
            <form @submit.prevent="updateSkill" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="skill_id" required hidden>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="skill_name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="skill_type" required>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link class="btn" v-bind:to="{name: 'view-skill'}">
                    Cancel
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'edit-skill',
        data() {
            return {
                skill_id: null,
                name: null,
                dept: null,
                position: null
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('skills').where('skill_id',
            '==', to.params.skill_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.skill_id = doc.data().skill_id
                        vm.skill_name = doc.data().skill_name
                        vm.skill_type = doc.data().skill_type
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                db.collection('skills').where
                ('skill_id', '==', this.$route.params.skill_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.skill_id = doc.data().skill_id
                        this.skill_name = doc.data().skill_name
                        this.skill_type = doc.data().skill_type
                    })
                })
            },
            updateSkill () {
                db.collection('skills').where
                ('skill_id', '==', this.$route.params.skill_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            skill_id: this.skill_id,
                            skill_name: this.skill_name,
                            skill_type: this.skill_type,
                            position: this.position
                        })
                        .then(() => {
                            this.$router.push({
                                name: 'view-skill', 
                                params: {skill_id: this.skill_id}})
                        })
                    })
                })
            }
        }
    }
</script>
