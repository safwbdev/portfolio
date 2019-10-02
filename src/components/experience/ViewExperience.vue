<template>
    <div class="container">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{work_name}}</h4></li>
            <li class="collection-item">Skill ID#: {{work_id}}</li>
            <li class="collection-item">Position: {{work_position}}</li>
            <li class="collection-item">Duration: {{work_start}} - {{work_end}}</li>
            <li class="collection-item">Description: {{work_desc}}</li>
            <li class="collection-item">Location: {{work_location}}</li>
        </ul>
        <router-link to="/dashboard" class="btn grey">Back</router-link>
        <Button @click="deleteEmployee" to="/" class="btn red">Delete</Button>
        <div class="fixed-action-btn">
            <router-link 
                v-bind:to="{
                    name: 'edit-experience', 
                    params:{work_id: work_id}
                }" 
                class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'view-experience',
        data() {
            return {
                work_id: null,
                work_name: null,
                work_type: null,
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('experience').where('work_id',
            '==', to.params.work_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.work_id = doc.data().work_id
                        vm.work_name = doc.data().work_name
                        vm.work_desc = doc.data().work_desc
                        vm.work_start = doc.data().work_start
                        vm.work_end = doc.data().work_end
                        vm.work_position = doc.data().work_position
                        vm.work_location = doc.data().work_location
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                db.collection('experience').where
                ('work_id', '==', this.$route.params.work_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.work_id = doc.data().work_id
                        this.work_name = doc.data().work_name
                        this.work_position = doc.data().work_position
                        this.work_desc = doc.data().work_desc
                        this.work_start = doc.data().work_start
                        this.work_end = doc.data().work_end
                    })
                })
            },
            deleteEmployee () {
                if(confirm('Are you sure?')) {
                    db.collection('experience').where
                ('work_id', '==', this.$route.params.work_id).get()
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
