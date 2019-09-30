<template>
    <div id="edit-education">
        <h3>Edit Project</h3>
        <div class="row">
            <form @submit.prevent="updateSkill" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="project_id" required hidden>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="project_name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="project_desc" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" v-model="project_tools" required>
                    </div>
                    <div class="input-field col s6">
                        <input type="text" v-model="project_type" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="githubUrl">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="demoUrl">
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
        name: 'edit-project',
        data() {
            return {
                project_id: null,
                project_name: null,
                project_desc: null,
                project_tools: null,
                project_type: null,
                githubUrl: null,
                demoUrl: null,
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
                        vm.githubUrl = doc.data().githubUrl
                        vm.demoUrl = doc.data().demoUrl
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
                        this.project_type = doc.data().project_type
                        this.githubUrl = doc.data().githubUrl
                        this.demoUrl = doc.data().demoUrl
                    })
                })
            },
            updateSkill () {
                db.collection('projects').where
                ('project_id', '==', this.$route.params.project_id).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            project_id: this.project_id,
                            project_name: this.project_name,
                            project_desc: this.project_desc,
                            project_tools: this.project_tools,
                            project_type: this.project_type,
                            githubUrl: ((this.githubUrl == null || this.githubUrl == "") ? null : this.githubUrl),
                            demoUrl: ((this.demoUrl == null) ? null : this.demoUrl),
                        })
                        .then(() => {
                            this.$router.push({
                                name: 'view-project', 
                                params: {edu_id: this.edu_id}})
                        })
                    })
                })
            }
        }
    }
</script>
