<template>
    <div id="view-education">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{project_name}}</h4></li>
            <li class="collection-item">ID#: {{project_id}}</li>
            <li class="collection-item">Tools: {{project_tools}}</li>
            <li class="collection-item">Description: {{project_desc}}</li>
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
        name: 'view-project',
        data() {
            return {
                project_id: null,
                project_name: null,
                project_field: null,
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('projects').where('project_id',
            '==', to.params.project_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.project_id = doc.data().project_id
                        vm.project_name = doc.data().project_name
                        vm.project_desc = doc.data().project_desc
                        vm.project_tools = doc.data().project_tools
                        vm.demoUrl = doc.data().demoUrl
                        vm.githubUrl = doc.data().githubUrl
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
