<template>
    <div class="section">
        <h4>Education</h4>
        <div class="row">
            <div 
                v-for="edu in education" 
                v-bind:key="edu.id" 
                class="school row col xl12 l12 m12 s12">
                <!-- <h6>{{edu.edu_name}}</h6>
                <span class="bold">{{edu.edu_field}}</span>
                <div>{{edu.edu_start}} - {{edu.edu_end}}</div>
                <div>{{edu.edu_desc}}</div> -->
                <div><span class="grad-year">{{edu.edu_end}}</span> | <span class="field">{{edu.edu_field}}</span></div>
                <div><span class="name">{{edu.edu_name}}</span> | <span class="location">{{edu.edu_location}}</span></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.school{
    /* border: 1px solid red; */
    line-height: 1.8em;
}
.school .grad-year{
    font-weight: bold;
    font-size: 16px;
}
.school .field{
    font-size: 16px;

}
.school .name{
    font-weight: bold;
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
                        'edu_location' : doc.data().edu_location,
                    }
                    this.education.push(data)
                })
            })
        }
    }
</script>