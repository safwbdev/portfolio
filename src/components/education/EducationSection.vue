<template>
    <div class="section">
        <h5>Education</h5>
        <div class="row">
            <div 
                v-for="edu in education" 
                v-bind:key="edu.id" 
                class="row col xl12 l12 m12 s12">
                <!-- <h6>{{edu.edu_name}}</h6>
                <span class="bold">{{edu.edu_field}}</span>
                <div>{{edu.edu_start}} - {{edu.edu_end}}</div>
                <div>{{edu.edu_desc}}</div> -->
                <div>{{edu.edu_end}} | {{edu.edu_field}}</div>
                <div>{{edu.edu_name}} | {{edu.edu_desc}}</div>
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
                education: [],
            }
        },
        created () {
            db.collection('education').orderBy('edu_end', 'desc').get().then(querysnapshot => {
                querysnapshot.forEach(doc => {
                    // console.log(doc.id);
                    const data = {
                        'id': doc.id,
                        'edu_id' : doc.data().edu_id,
                        'edu_name' : doc.data().edu_name,
                        'edu_field' : doc.data().edu_field,
                        'edu_start' : doc.data().edu_start,
                        'edu_end' : doc.data().edu_end,
                        'edu_desc' : doc.data().edu_desc,
                    }
                    this.education.push(data)
                })
            })
        }
    }
</script>