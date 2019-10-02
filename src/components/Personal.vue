<template>
    <div class="section personal">
        <div class="container">
            <div class="row">
                <div class="col xl3 l3 m12 s12 profile-pic" >
                    <img v-bind:src="img" alt="" >
                </div>
                <div class="col xl9 l9 m12 s12">
                <div class="col s12">
                    <h1>{{fullName}}</h1>
                    <h3>{{designation}}</h3>
                </div>
                <div class="col s12 contact-details">
                    <div v-for="option in contact" v-bind:value="option.value" v-bind:key="option.key" >
                        <div class="col xl6 l6 m6 s6" v-if="option.type === 'phone'">
                            <a v-bind:href="option.link" target="_blank" >          
                                <fa-icon :icon="[option.icon1 , option.icon2]" /> <span class="hide-on-small-only">{{ option.text }}</span><span class="hide-on-med-and-up">Call me</span>
                            </a>
                        </div>
                        <div class="col xl6 l6 m6 s6" v-else-if="option.type === 'email'">
                            <a v-bind:href="option.link" target="_blank" >          
                                <fa-icon :icon="[option.icon1 , option.icon2]" /> <span class="hide-on-small-only">{{ option.text }}</span><span class="hide-on-med-and-up">Email me</span>
                            </a>
                        </div>
                        <div class="col xl12 l12 m12 s12 address" v-else-if="option.type === 'address'">
                            <a>          
                                <fa-icon :icon="[option.icon1 , option.icon2]" /> <span>{{ option.text }}</span>
                            </a>
                        </div>
                        <div class="col xl6 l6 m6 s6" v-else>
                        <a v-bind:href="option.link" target="_blank" >
                            <fa-icon :icon="[option.icon1 , option.icon2]" /> <span>{{ option.text }}</span>
                        </a>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="about-me">
            <div class="container">
            <p>{{abouttext}}</p>
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
            img: 'https://previews.123rf.com/images/eugenesergeev/eugenesergeev1605/eugenesergeev160500180/56871195-bearded-man-smoking-cigar-outdoor-square-portrait-with-selective-focus.jpg',
            abouttext:"This is your world. Didn't you know you had that much power? You can move mountains. You can do anything. It's almost like something out of a fairytale book. Clouds are free. They just float around the sky all day and have fun. We spend so much of our life looking - but never seeing. Fluff it up a little and hypnotize it.",
            contact: [
                { type:'github', icon1: 'fab', icon2: 'github', link: null, text: 'Github' },
                { type:'linkedin', icon1: 'fab', icon2: 'linkedin', link: null, text: 'Linkedin' },
                { type:'email', icon1: 'fas', icon2: 'envelope', link: null, text: null },
                { type:'phone', icon1: 'fas', icon2: 'phone', link: null, text: null },
                { type:'address', icon1: 'fas', icon2: 'map-marker-alt', link: null, text: null },
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
    background-image: linear-gradient(to top, #4facfe 0%, #00f2fe 100%);
    /* background-image: linear-gradient(to bottom, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%); */
    padding: 0;
}
.section.personal h1{
    margin-bottom: 5px;
}
.section.personal h3{
    font-style: italic;
    margin: 0;;
}
.section.personal .profile-pic img{
    border-radius: 50%;
    margin: 2.8rem 0 1.68rem 0;
    width: 100%;
}
.section.personal .contact-details{
    /* border: 1px solid red; */
    margin: 20px 0 0 0;
}
.section.personal .contact-details .col{
    margin-bottom: 20px;
}
.section.personal .contact-details .col a{
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: left
}
.section.personal .contact-details .col a svg{
    margin-right: 8px;
    font-size: 28px;
}
.section.personal .contact-details .col a span{
    font-size: 20px;
}
.section.personal .about-me {
    background: rgb(255, 255, 255, 0.6);
    padding: 20px 0;
    text-align: center;
}
.section.personal .about-me p{
    /* color: red; */
    font-size: 18px;
}
@media only screen and (max-width: 768px) {
    .section.personal .profile-pic{
        text-align:center;
    }
    .section.personal .profile-pic img{
        margin: 30px 0 0 0;
        width: 80% !important;
    }
    .section.personal h1{
        font-size: 3.0em;
        text-align: center;
        margin: 10px 0;
    }
    .section.personal h3{
        text-align: center;
        font-size: 2.0em;
        margin: 0 0 26px 0;
    }
    .section.personal .contact-details{
        padding: 0;
        }
    .section.personal .contact-details .col{
        margin: 0 0 10px 0;
        padding: 0 5px;
    }
    .section.personal .contact-details .col a{
        width: 100%;
        order: none;
        border-radius: 5px;
        justify-content: center;
        text-align: center;
        line-height: 36px;
        padding: 10px 16px;
        vertical-align: middle;
        -webkit-tap-highlight-color: transparent;
        background: #ffffff;
    }
    
}
@media only screen and (max-width: 999px) {

.section.personal .profile-pic{
    text-align: center;
}
.section.personal .profile-pic img{
    width: 40%;
}
.section.personal h1{
    text-align: center;
}
.section.personal h3{
    text-align: center;
}
}
</style>