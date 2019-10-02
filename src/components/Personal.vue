<template>
    <div class="section personal">
        <div class="container">
            <div class="row">
                <div class="col xl3 l3 m3 s12" >
                    <img v-bind:src="img" alt="" style="width:100%;">
                </div>
                <div class="col xl9 l9 m9 s12">
                <div class="col s12">
                    <h1>{{fullName}}</h1>
                    <h3>{{designation}}</h3>
                </div>
                <div class="col s12" style="border:1px solid blue;">
                    <div v-for="option in contact" v-bind:value="option.value" v-bind:key="option.key" class="col xl4 l4 m6 s12">
                        <a v-bind:href="option.link">          
                            <fa-icon :icon="[option.icon1 , option.icon2]" /> {{ option.text }}
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from './firebase/firebaseInit'
export default {
    props:{
        title: String
    },
    data() {
        return {
            fullName: null,
            designation: null,
            dob: null,
            email: null,
            fName: null,
            lName: null,
            tel: null,
            img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',

            contact: [
                { icon1: 'fab', icon2: 'github', link: null, text: 'Github' },
                { icon1: 'fab', icon2: 'linkedin', link: null, text: 'Linkedin' },
                { icon1: 'fas', icon2: 'envelope', link: null, text: null },
                { icon1: 'fas', icon2: 'phone', link: null, text: null },
                { icon1: 'fas', icon2: 'map-marker-alt', link: null, text: null },
                ],
        }
    },
    created () {
        db.collection('personal').get().then(querysnapshot => {
            querysnapshot.forEach(doc => {
                this.fullName = doc.data().fName + ' ' + doc.data().mName + ' ' +doc.data().lName
                this.dob = doc.data().dob
                this.designation = doc.data().designation
                this.contact[0].link = doc.data().githubUrl
                this.contact[1].link = doc.data().linkedinUrl
                this.contact[2].link = 'mailto:' + doc.data().email
                this.contact[2].text = doc.data().email
                this.contact[3].link = doc.data().tel
                this.contact[3].text = doc.data().tel
                this.contact[4].text  = doc.data().address
            })
        })
    }
}
</script>

<style>
.section.personal{
    background:cyan;
}
</style>