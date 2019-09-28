<template>
    <div class="section">
        <h4>Portfolio</h4>
        <h5>Client Projects</h5>
        <div class="row">
            <div 
                v-for="edu in clientProjects" 
                v-bind:key="edu.id" 
                class="project row col xl6 l6 m12 s12">
                <h6>{{edu.project_name}}</h6>
                <p class="desc">{{edu.project_desc}}</p>
                <div class="tools">{{edu.project_tools}}</div>
                <div class="links">
                    <span v-if="edu.githubUrl != null">
                        <a v-bind:href="edu.githubUrl">
                            <fa-icon :icon="['fab', 'github']" /> Github Link
                        </a>
                    </span>
                    <span v-if="edu.githubUrl != null && edu.demoUrl != null"> | </span>
                    <span v-if="edu.demoUrl != null">
                        <a v-bind:href="edu.demoUrl">
                            <fa-icon :icon="['fas', 'globe']" /> Demo Link
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
        <h5>Personal Projects</h5>
        </div>
        <div class="row">
            <div 
                v-for="edu in personalProjects" 
                v-bind:key="edu.id" 
                class="project row col xl6 l6 m12 s12">
                <h6>{{edu.project_name}}</h6>
                <p class="desc">{{edu.project_desc}}</p>
                <div class="tools">{{edu.project_tools}}</div>
                <div class="links">
                    <span v-if="edu.githubUrl != null">
                        <a v-bind:href="edu.githubUrl">
                            <fa-icon :icon="['fab', 'github']" /> Github Link
                        </a>
                    </span>
                    <span v-if="edu.githubUrl != null && edu.demoUrl != null"> | </span>
                    <span v-if="edu.demoUrl != null">
                        <a v-bind:href="edu.demoUrl">
                            <fa-icon :icon="['fas', 'globe']" /> Demo Link
                        </a>
                    </span>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.section{
    padding: 0;
    /* border:1px solid red; */
    text-align: center;
}
.section h4{
    padding: 0;
}
.section h6{
    padding: 20px 0 10px 0;
}
.chip svg{
font-size: 1.2em;
}

.project{
    text-align: left;
    margin-bottom: 30px;
    /* border: 1px solid red; */
}
.project h6{
    padding: 0;
    margin: 0;
    font-weight: bold;
}
.project .desc{
    color:red;
}
</style>
<script>
    import db from './../firebase/firebaseInit'
    export default {
        props:{
            title: String
        },
        data() {
            return {
                clientProjects: [],
                personalProjects: [],
            }
        },
        created () {
            var getCollection = db.collection('projects');
            var clientQuery = getCollection.where("project_type", "==", "Client");
            var personalQuery = getCollection.where("project_type", "==", "Personal");
            // .orderBy('project_id', 'asc')
            // getCollection.get()
            clientQuery.get()
            .then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'project_id' : doc.data().project_id,
                        'project_name' : doc.data().project_name,
                        'project_desc' : doc.data().project_desc,
                        'project_field' : doc.data().project_field,
                        'project_type' : doc.data().project_type,
                        'githubUrl' : doc.data().githubUrl,
                        'demoUrl' : doc.data().demoUrl,
                        'project_tools' : doc.data().project_tools,
                    }
                    this.clientProjects.push(data)
                })
            });
            personalQuery.get()
            .then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'project_id' : doc.data().project_id,
                        'project_name' : doc.data().project_name,
                        'project_desc' : doc.data().project_desc,
                        'project_field' : doc.data().project_field,
                        'project_type' : doc.data().project_type,
                        'githubUrl' : doc.data().githubUrl,
                        'demoUrl' : doc.data().demoUrl,
                        'project_tools' : doc.data().project_tools,
                    }
                    this.personalProjects.push(data)
                })
            })
        }
    }
</script>