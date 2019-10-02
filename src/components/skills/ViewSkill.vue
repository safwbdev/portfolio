<template>
    <div class="container">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{skill_name}}</h4></li>
            <li class="collection-item">Skill ID#: {{skill_id}}</li>
            <li class="collection-item">type: {{skill_type}}</li>
        </ul>
        <router-link to="/dashboard" class="btn grey">Back</router-link>
        <Button @click="deleteEmployee" to="/" class="btn red">Delete</Button>
        <div class="fixed-action-btn">
            <router-link 
                v-bind:to="{
                    name: 'edit-skill', 
                    params:{skill_id: skill_id}}" 
                class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'view-skill',
        data() {
            return {
                skill_id: null,
                skill_name: null,
                skill_type: null,
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
            deleteEmployee () {
                if(confirm('Are you sure?')) {
                    db.collection('skills').where
                ('skill_id', '==', this.$route.params.skill_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                        this.$router.push('/')
                    })
                })
                }
            }
        }
    }
</script>
