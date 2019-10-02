<template>
    <div class="container">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{project_name}}</h4></li>
            <li class="collection-item">ID#: {{project_id}}</li>
            <li v-if="project_type != null" class="collection-item">Type:: {{project_type}}</li>
            <li class="collection-item">Tools: {{project_tools}}</li>
            <li class="collection-item">Description: {{project_desc}}</li>
            <li class="collection-item" v-if="githubUrl != null"> <fa-icon :icon="['fab', 'github']" /> Github : {{githubUrl}}</li>
            <li class="collection-item" v-if="demoUrl != null"><fa-icon :icon="['fas', 'globe']" /> Demo Link: {{demoUrl}}</li>
        </ul>
        <router-link to="/dashboard" class="btn grey">Back</router-link>
        <Button @click="deleteEmployee" to="/" class="btn red">Delete</Button>
        <div class="fixed-action-btn">
            <router-link 
                v-bind:to="{
                    name: 'edit-project', 
                    params:{project_id: project_id}}" 
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
                project_type: null,
                demoUrl: null,
                githubUrl: null,
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
                        vm.project_type = doc.data().project_type
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
                db.collection('projects').where
                ('project_id', '==', this.$route.params.project_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.project_id = doc.data().project_id
                        this.project_name = doc.data().project_name
                        this.project_desc = doc.data().project_desc
                        this.project_tools = doc.data().project_tools
                        this.demoUrl = doc.data().demoUrl
                        this.githubUrl = doc.data().githubUrl
                    })
                })
            },
            deleteEmployee () {
                if(confirm('Are you sure?')) {
                    db.collection('projects').where
                ('project_id', '==', this.$route.params.project_id).get()
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
