<template>
    <div id="new-project">
        <h3>New Project</h3>
        <div class="row">
            <form @submit.prevent="saveEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="project_id" required hidden>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="project_name" required>
                        <label>Project Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="project_desc" required>
                        <label>Description</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="project_tools" required>
                        <label>Project Tools</label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" v-model="githubUrl" required>
                        <label>Github Link</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="demoUrl" required>
                        <label>Demo Link</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/dashboard" class="btn">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './../firebase/firebaseInit'
    export default {
        name: 'new-project',
        
        data() {
            return {
                project_id: null,
                project_name: null,
                project_desc: null,
                project_tools: null,
                githubUrl: null,
                demoUrl: null,
            }
        },
        beforeRouteEnter (to,from,next) {
            db.collection('projects').orderBy('project_id', 'desc').limit(1).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.project_id = (parseInt(doc.data().project_id) + 1)
                    })
                })
            })
        },
        methods: {
            saveEmployee() {
                db.collection('projects').add({
                    project_id: this.project_id,
                    project_name: this.project_name,
                    project_desc: this.project_desc,
                    project_tools: this.project_tools,
                    githubUrl: this.githubUrl,
                    demoUrl: this.demoUrl,
                })
                .then(docRef => this.$router.push('/'))
                .catch(error => console.log(err))
            }
        }
    }
</script>
