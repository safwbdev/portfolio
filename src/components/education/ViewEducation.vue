<template>
    <div id="view-education">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{edu_name}}</h4></li>
            <li class="collection-item">ID#: {{edu_id}}</li>
            <li class="collection-item">Field: {{edu_field}}</li>
            <li class="collection-item">Duration: {{edu_start}} - {{edu_end}}</li>
            <li class="collection-item">Location: {{edu_location}}</li>
        </ul>
        <router-link to="/dashboard" class="btn grey">Back</router-link>
        <Button @click="deleteEmployee" to="/" class="btn red">Delete</Button>
        <div class="fixed-action-btn">
            <router-link 
                v-bind:to="{
                    name: 'edit-education', 
                    params:{edu_id: edu_id}}" 
                class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>

            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'view-education',
        data() {
            return {
                edu_id: null,
                edu_name: null,
                edu_field: null,
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
                        vm.edu_desc = doc.data().edu_desc
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
                        this.edu_desc = doc.data().edu_desc
                    })
                })
            },
            deleteEmployee () {
                if(confirm('Are you sure?')) {
                    db.collection('education').where
                ('edu_id', '==', this.$route.params.edu_id).get()
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
