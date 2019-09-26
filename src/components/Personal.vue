<template>
    <div class="section">
        <div class="row">
            <div class="col xl3 l3 m3 s12" >
                <img v-bind:src="img" alt="" style="width:100%;">
            </div>
            <div class="col xl9 l9 m9 s12" style="border:1px solid red;">
            <div class="col s12" style="border:1px solid blue;">
                <h1>{{fName}} {{lName}}</h1>
            </div>
            <div class="col s12" style="border:1px solid blue;">
                <div v-for="option in contact" v-bind:value="option.value" v-bind:key="option.key" class="col xl3 l3 m6 s12">
                    <a v-bind:href="option.link">          
                        <fa-icon :icon="[option.icon1 , option.icon2]" /> {{ option.text }}
                    </a>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<!--style>

img{
    border-radius: 50%;
}
</style-->
<script>
// "fab::node"
import db from './firebase/firebaseInit'
export default {
    props:{
        title: String
    },
    data() {
        return {
            fName: null,
            lName: null,
            address: null,
            dob: null,
            email: null,
            fName: null,
            lName: null,
            tel: null,
            img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',

            contact: [
                { icon1: 'fab', icon2: 'github', link: 'https://github.com/safwbdev?tab=repositories', text: 'Github' },
                { icon1: 'fab', icon2: 'linkedin', link: 'https://www.linkedin.com/in/safwbdev/', text: 'Linkedin' },
                { icon1: 'fas', icon2: 'envelope', link: 'mailto:safwbdev@gmail.com', text: null },
                { icon1: 'fas', icon2: 'phone', link: null, text: null },
                ],
        }
    },
    created () {
        db.collection('personal').get().then(querysnapshot => {
            querysnapshot.forEach(doc => {
                 this.address = doc.data().address
                 this.dob = doc.data().dob
                 this.contact[2].text = doc.data().email
                 this.fName = doc.data().fName
                 this.lName = doc.data().lName
                 this.contact[2].text = doc.data().tel
                 this.address = doc.data().address
            })
        })
    }
}
</script>