<template>
    <div class="section">
        <h5>Portfolio</h5>
        <h6>Client Projects</h6>
        <div class="row">
            <div 
                v-for="edu in clientProjects" 
                v-bind:key="edu.id" 
                class="row col xl6 l6 m12 s12">
                <div>{{edu.project_name}}</div>
                <div>{{edu.project_desc}}</div>
                <div>{{edu.project_tools}}</div>
                <div>{{edu.project_type}}</div>
                <div>
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
        <h6>Personal Projects</h6>
        </div>
        <div class="row">
            <div 
                v-for="edu in personalProjects" 
                v-bind:key="edu.id" 
                class="row col xl6 l6 m12 s12">
                <div>{{edu.project_name}}</div>
                <div>{{edu.project_desc}}</div>
                <div>{{edu.project_tools}}</div>
                <div>{{edu.project_type}}</div>
                <div v-if="edu.githubUrl != null">
                    <a v-bind:href="edu.githubUrl">
                        <fa-icon :icon="['fab', 'github']" /> Github Link
                    </a>
                </div>
                <div v-if="edu.demoUrl != null">
                    <a v-bind:href="edu.demoUrl">
                        <fa-icon :icon="['fas', 'globe']" /> Demo Link
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

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
            })
        }
    }
</script>